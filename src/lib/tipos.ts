import type { Idioma } from '../config/sitio';

/** Texto traducible. `es` es obligatorio; en/pt usan el español si faltan. */
export type T = { es: string; en?: string; pt?: string };

/** Origen de una imagen. Los renders con IA se rotulan como ilustrativos. */
export type OrigenImagen = 'fotografia' | 'render' | 'render-ia';

export interface Medio {
  /** Ruta dentro de src/assets/media/, p. ej. "modulos/s/exterior/01.jpg". */
  archivo: string;
  alt: T;
  origen: OrigenImagen;
  credito?: string;
  /** Encuadre en móvil (object-position), p. ej. "60% 50%". */
  foco?: string;
}

export interface Video {
  /** Rutas dentro de public/, p. ej. "/media/video/portada.mp4". */
  mp4: string;
  webm?: string;
  poster?: string;
  origen: OrigenImagen;
}

/** Video de portada con versión vertical para celulares y pósters optimizados. */
export interface VideoPortada {
  /** Rutas dentro de public/. */
  escritorio: string;
  movil: string | null;
  /** Alternativas WebM (VP9) para navegadores sin H.264. */
  escritorioWebm?: string;
  movilWebm?: string;
  /** Pósters dentro de src/assets/media/ (se optimizan a AVIF/WebP). */
  posterEscritorio: Medio;
  posterMovil: Medio | null;
  origen: OrigenImagen;
  /** Encuadre en pantallas angostas cuando no hay versión móvil (object-position). */
  foco?: string;
}

/** Dato técnico. Solo se muestra si `confirmado` es true. */
export interface Dato {
  etiqueta: T;
  valor: T;
  confirmado: boolean;
}

export interface OpcionPersonalizacion {
  nombre: T;
  estado: 'pendiente' | 'aprobada';
}

export interface Modulo {
  slug: 's' | 'm';
  codigo: string;
  nombre: T;
  superficie: number;
  categoria: T;
  resumen: T;
  descripcion: T;
  especificaciones: Dato[];
  materiales: Dato[];
  personalizacion: OpcionPersonalizacion[];
  plano: Medio | null;
  medios: {
    portada: Medio | null;
    exterior: Medio[];
    interior: Medio[];
    detalles: Medio[];
  };
  video: Video | null;
  seo: { titulo: T; descripcion: T };
}

export interface Proyecto {
  slug: string;
  /** true = demostración de diseño: nunca se publica como obra real. */
  demo: boolean;
  publicado: boolean;
  titulo: T;
  categoria: T;
  anio: number | null;
  ubicacion: string | null;
  resumen: T;
  descripcion: T;
  detalles: Dato[];
  portada: Medio | null;
  galeria: Medio[];
  planos: Medio[];
}

export type { Idioma };
