#!/usr/bin/env node
/**
 * Optimiza imágenes y videos (fotografías reales o renders de IA: Nano Banana, Google Flow, Higgsfield…) para la web.
 *
 *   npm run media:optimize -- <archivo|carpeta> [más archivos…] [--out media-out]
 *
 * Imágenes → AVIF + WebP en 640/1024/1600/2400 px (sin metadatos).
 * Videos   → MP4 H.264 (compatibilidad) + WebM VP9 (más liviano) + póster WebP,
 *            sin audio, 1920 px de ancho máx. Si el video es vertical genera también 1080 px.
 * Requiere ffmpeg instalado para videos.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = resolve(outIdx >= 0 ? args.splice(outIdx, 2)[1] : 'media-out');
if (!args.length) {
  console.error('Uso: npm run media:optimize -- <archivo|carpeta> [--out media-out]');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic']);
const VID = new Set(['.mp4', '.mov', '.webm', '.mkv', '.m4v']);
const WIDTHS = [640, 1024, 1600, 2400];

const files = args.flatMap((a) => {
  const p = resolve(a);
  return statSync(p).isDirectory() ? readdirSync(p).map((f) => join(p, f)) : [p];
});

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const name = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (IMG.has(ext)) await image(file, name);
  else if (VID.has(ext)) video(file, name);
  else console.log(`· Omitido: ${basename(file)}`);
}
console.log(`\nListo. Archivos en ${outDir}`);

async function image(file, name) {
  const meta = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (meta.width && meta.width < 2400 && !widths.includes(meta.width)) widths.push(meta.width);
  for (const w of widths) {
    const base = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(join(outDir, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 80 }).toFile(join(outDir, `${name}-${w}.webp`));
  }
  console.log(`✓ Imagen ${basename(file)} → ${widths.join(', ')} px (AVIF + WebP)`);
}

function video(file, name) {
  const probe = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file], { encoding: 'utf8' });
  if (probe.error) {
    console.error('✗ ffmpeg/ffprobe no está instalado. Instalalo desde https://ffmpeg.org/');
    return;
  }
  const [w, h] = probe.stdout.trim().split(',').map(Number);
  const vertical = h > w;
  const targets = vertical ? [['', 1080]] : [['', 1920], ['-mobile', 1280]];

  for (const [suffix, width] of targets) {
    const scale = `scale='min(${width},iw)':-2`;
    run(['-i', file, '-an', '-vf', scale, '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(outDir, `${name}${suffix}.mp4`)]);
    run(['-i', file, '-an', '-vf', scale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', join(outDir, `${name}${suffix}.webm`)]);
  }
  run(['-i', file, '-vf', `scale='min(1920,iw)':-2`, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', join(outDir, `${name}-poster.webp`)]);
  console.log(`✓ Video ${basename(file)} → MP4 + WebM + póster${vertical ? ' (vertical)' : ''}`);
}

function run(ffargs) {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...ffargs], { stdio: 'inherit' });
  if (r.status !== 0) console.error(`✗ ffmpeg falló: ${ffargs.at(-1)}`);
}
