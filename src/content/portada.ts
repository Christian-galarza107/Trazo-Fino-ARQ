/**
 * ============================================================================
 *  VIDEO E IMÁGENES DE LA PORTADA Y FONDOS EDITORIALES
 *  - Video: archivos en public/media/video/ (optimizar antes con npm run media:optimize).
 *  - Pósters e imágenes: archivos en src/assets/media/portada/.
 *  `null` = todavía no hay material: el sitio muestra un marcador visual.
 * ============================================================================
 */
import type { Medio, VideoPortada } from '../lib/tipos';

const altPortada = {
  es: 'Vivienda modular con revestimiento negro y madera, galería con deck y jardín, al atardecer',
  en: 'Modular home with black and timber cladding, deck porch and garden at golden hour',
  pt: 'Casa modular com revestimento preto e madeira, varanda com deck e jardim ao entardecer',
};

export const portada: {
  video: VideoPortada | null;
  imagen: Medio | null;
  modular: Medio | null;
  estudio: Medio | null;
  cierre: Medio | null;
} = {
  /**
   * Video generado con Google Flow (render ilustrativo, no es una obra construida).
   * Preparado desde el original de 1280×720: recorte de franjas negras laterales, sin audio,
   * bucle ida y vuelta de 16 s, H.264 + WebM VP9. Escritorio 1072×716 · celular vertical 404×716.
   */
  video: {
    escritorio: '/media/video/portada-escritorio.mp4',
    movil: '/media/video/portada-movil.mp4',
    escritorioWebm: '/media/video/portada-escritorio.webm',
    movilWebm: '/media/video/portada-movil.webm',
    posterEscritorio: { archivo: 'portada/poster-escritorio.jpg', alt: altPortada, origen: 'render-ia' },
    posterMovil: { archivo: 'portada/poster-movil.jpg', alt: altPortada, origen: 'render-ia' },
    origen: 'render-ia',
  },
  // Ejemplo: { archivo: 'portada/hero.jpg', alt: { es: '…' }, origen: 'fotografia' }
  imagen: null,
  modular: null,
  estudio: null,
  cierre: null,
};
