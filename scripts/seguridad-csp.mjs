#!/usr/bin/env node
/**
 * Post-build: genera la Content-Security-Policy real del sitio.
 *
 * 1. Recorre dist/**\/*.html y calcula el hash SHA-256 de cada <script> y <style> en línea
 *    (los que Astro incrusta por rendimiento). Así script-src no necesita 'unsafe-inline'.
 * 2. Reemplaza __CSP__ en dist/_headers (copiado desde public/_headers).
 * 3. Falla el build si encuentra manejadores en línea (onclick=…) o javascript: en enlaces,
 *    que la política bloquearía.
 *
 * Orígenes externos permitidos (solo los que el sitio usa de verdad):
 *  - Cloudflare Turnstile (solo si PUBLIC_TURNSTILE_SITE_KEY está definido en el build).
 *  - Cloudflare Web Analytics (beacon sin cookies, si se activa en el panel de Cloudflare).
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const sha = (s) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`;

const html = [];
(function recorrer(dir) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) recorrer(ruta);
    else if (nombre.endsWith('.html')) html.push(ruta);
  }
})(DIST);

const scripts = new Set();
const estilos = new Set();
const problemas = [];
for (const archivo of html) {
  const s = readFileSync(archivo, 'utf8');
  for (const m of s.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attrs, cuerpo] = m;
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/type\s*=\s*["']?application\/(ld\+)?json/i.test(attrs)) continue; // bloque de datos, no se ejecuta
    scripts.add(sha(cuerpo));
  }
  for (const m of s.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) estilos.add(sha(m[1]));
  if (/\son[a-z]+\s*=\s*["']/i.test(s.replace(/<script[\s\S]*?<\/script>/gi, ''))) problemas.push(`${archivo}: manejador de eventos en línea`);
  if (/href\s*=\s*["']\s*javascript:/i.test(s)) problemas.push(`${archivo}: enlace javascript:`);
}
if (problemas.length) {
  console.error('[csp] La política bloquearía:\n  ' + problemas.join('\n  '));
  process.exit(1);
}

const turnstile = Boolean(process.env.PUBLIC_TURNSTILE_SITE_KEY);
const CF_TURNSTILE = 'https://challenges.cloudflare.com';
const directivas = [
  ["default-src", "'self'"],
  ['script-src', "'self'", ...scripts, ...(turnstile ? [CF_TURNSTILE] : []), 'https://static.cloudflareinsights.com'],
  ['style-src', "'self'", ...estilos],
  // Atributos style="…" (variables de animación y layout). No ejecutan código; el sitio no
  // renderiza HTML de terceros. Se acota a atributos: las etiquetas <style> siguen por hash.
  ['style-src-attr', "'unsafe-inline'"],
  ['img-src', "'self'", 'data:'],
  ['media-src', "'self'"],
  ['font-src', "'self'"],
  ['connect-src', "'self'", 'https://cloudflareinsights.com', ...(turnstile ? [CF_TURNSTILE] : [])],
  ['frame-src', ...(turnstile ? [CF_TURNSTILE] : ["'none'"])],
  ['worker-src', "'none'"],
  ['manifest-src', "'self'"],
  ['object-src', "'none'"],
  ['base-uri', "'self'"],
  ['form-action', "'self'"],
  ['frame-ancestors', "'none'"],
  ['upgrade-insecure-requests'],
];
const csp = directivas.map((d) => d.join(' ')).join('; ');

const rutaHeaders = join(DIST, '_headers');
const plantilla = readFileSync(rutaHeaders, 'utf8');
const MARCADOR = 'Content-Security-Policy: __CSP__';
if (plantilla.split(MARCADOR).length !== 2) {
  console.error(`[csp] dist/_headers debe contener exactamente una línea "${MARCADOR}"`);
  process.exit(1);
}
writeFileSync(rutaHeaders, plantilla.replace(MARCADOR, `Content-Security-Policy: ${csp}`));
console.log(`[csp] ${html.length} páginas · ${scripts.size} scripts y ${estilos.size} estilos en línea con hash · Turnstile: ${turnstile ? 'sí' : 'no'}`);
