/**
 * ============================================================================
 *  PROYECTOS DEL ESTUDIO (portafolio del socio arquitecto)
 *
 *  `proyectos`: obras REALES. Vacío hasta recibir material.
 *  `demostraciones`: ejemplos SOLO para revisar el diseño. Se muestran únicamente
 *  con PUBLIC_MOSTRAR_DEMOS=true y siempre rotulados como "Demostración".
 *  Nunca se publican como obras realizadas.
 * ============================================================================
 */
import type { Proyecto } from '../lib/tipos';

export const proyectos: Proyecto[] = [
  // Ejemplo de carga (copiar, completar y poner publicado: true):
  // {
  //   slug: 'casa-ejemplo',
  //   demo: false,
  //   publicado: true,
  //   titulo: { es: 'Casa …' },
  //   categoria: { es: 'Vivienda unifamiliar' },
  //   anio: 2025,
  //   ubicacion: 'Localidad, Provincia',
  //   resumen: { es: 'Una línea para el listado y buscadores.' },
  //   descripcion: { es: 'Texto del proyecto.\n\nSegundo párrafo.' },
  //   detalles: [{ etiqueta: { es: 'Superficie' }, valor: { es: '180 m²' }, confirmado: true }],
  //   portada: { archivo: 'proyectos/casa-ejemplo/portada.jpg', alt: { es: '…' }, origen: 'fotografia' },
  //   galeria: [],
  //   planos: [],
  // },
];

const textoDemo = {
  es: 'Este es un proyecto de demostración para evaluar el diseño de la sección. No representa una obra realizada por Trazo Fino.',
  en: 'This is a demonstration project used to review the section design. It does not represent a work built by Trazo Fino.',
  pt: 'Este é um projeto de demonstração para avaliar o design da seção. Não representa uma obra realizada pela Trazo Fino.',
};

export const demostraciones: Proyecto[] = [
  {
    slug: 'demostracion-vivienda',
    demo: true,
    publicado: false,
    titulo: { es: 'Vivienda (demostración)', en: 'House (demonstration)', pt: 'Casa (demonstração)' },
    categoria: { es: 'Vivienda unifamiliar', en: 'Single-family house', pt: 'Casa unifamiliar' },
    anio: null,
    ubicacion: null,
    resumen: textoDemo,
    descripcion: textoDemo,
    detalles: [],
    portada: null,
    galeria: [],
    planos: [],
  },
  {
    slug: 'demostracion-interior',
    demo: true,
    publicado: false,
    titulo: { es: 'Interiorismo (demostración)', en: 'Interior (demonstration)', pt: 'Interiores (demonstração)' },
    categoria: { es: 'Interior', en: 'Interior', pt: 'Interior' },
    anio: null,
    ubicacion: null,
    resumen: textoDemo,
    descripcion: textoDemo,
    detalles: [],
    portada: null,
    galeria: [],
    planos: [],
  },
];
