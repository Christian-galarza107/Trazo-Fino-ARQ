/**
 * Resuelve las rutas de imágenes declaradas en src/content/ contra los archivos de
 * src/assets/media/. Astro genera automáticamente versiones AVIF/WebP en varios tamaños.
 */
import type { ImageMetadata } from 'astro';
import type { Medio } from './tipos';

const archivos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/media/**/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export function imagen(medio: Medio | null | undefined): ImageMetadata | null {
  if (!medio) return null;
  const mod = archivos[`/src/assets/media/${medio.archivo.replace(/^\/+/, '')}`];
  if (!mod && import.meta.env.DEV) console.warn(`[medios] No se encontró src/assets/media/${medio.archivo}`);
  return mod?.default ?? null;
}
