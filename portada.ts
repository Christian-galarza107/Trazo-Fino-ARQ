/**
 * ============================================================================
 *  IMÁGENES Y VIDEO DE LA PORTADA Y FONDOS EDITORIALES
 *  - Imágenes: archivos en src/assets/media/portada/ (ver docs/CONTENIDOS.md).
 *  - Video: archivos en public/media/video/ (optimizar antes con npm run media:optimize).
 *  `null` = todavía no hay material: el sitio muestra un marcador visual.
 * ============================================================================
 */
import type { Medio, Video } from '../lib/tipos';

export const portada: {
  video: Video | null;
  imagen: Medio | null;
  modular: Medio | null;
  estudio: Medio | null;
  cierre: Medio | null;
} = {
  // Ejemplo: { mp4: '/media/video/portada.mp4', webm: '/media/video/portada.webm', poster: '/media/video/portada-poster.webp', origen: 'render-ia' }
  video: null,
  // Ejemplo: { archivo: 'portada/hero.jpg', alt: { es: '…' }, origen: 'fotografia' }
  imagen: null,
  modular: null,
  estudio: null,
  cierre: null,
};
