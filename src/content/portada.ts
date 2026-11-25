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
   * Video animado con Gemini Pro a partir de fotos reales de una vivienda construida por TRAZOFINO
   * (la obra existe; la IA solo generó el movimiento). Origen técnico: render-ia.
   * Fuente: la copia recibida por WhatsApp el 24/11/2026 (848×478, H.264, 1,6 Mbps, 10 s), elegida por el usuario.
   * Respaldo sin tocar: docs/medios-originales/portada-video-gemini-via-whatsapp-2026-11-24.mp4
   * portada.mp4: el MISMO flujo H.264, sin recomprimir (solo sin audio y con faststart).
   * portada.webm: VP9 crf 18, solo para navegadores sin H.264. Sin filtros, sin bucle ida y vuelta.
   * En celulares se usa el mismo archivo (sin recorte propio); el navegador lo encuadra con object-fit.
   */
  video: {
    escritorio: '/media/video/portada.mp4',
    movil: null,
    escritorioWebm: '/media/video/portada.webm',
    posterEscritorio: { archivo: 'portada/poster-escritorio.jpg', alt: altPortada, origen: 'render-ia' },
    posterMovil: null,
    origen: 'render-ia',
  },
  // Ejemplo: { archivo: 'portada/hero.jpg', alt: { es: '…' }, origen: 'fotografia' }
  imagen: null,
  modular: null,
  estudio: null,
  cierre: null,
};
