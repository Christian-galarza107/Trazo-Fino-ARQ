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
  es: 'Vivienda de dos plantas con torre revestida en piedra, fachada gris y blanca, jardín y acceso de adoquines, al atardecer',
  en: 'Two-storey house with a stone-clad tower, grey and white facade, garden and cobblestone driveway at sunset',
  pt: 'Casa de dois pavimentos com torre revestida em pedra, fachada cinza e branca, jardim e acesso de paralelepípedos ao entardecer',
};

export const portada: {
  video: VideoPortada | null;
  imagen: Medio | null;
  modular: Medio | null;
  estudio: Medio | null;
  cierre: Medio | null;
} = {
  /**
   * Video generado con Gemini Pro (render ilustrativo, no es una obra construida), entregado el 24/11/2026 (848×478, 10 s).
   * Preparado sin audio, bucle ida y vuelta de 20 s, H.264 + WebM VP9.
   * Escritorio 848×478 · celular vertical 270×478 (recorte central). Pedir el original en mayor resolución.
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
