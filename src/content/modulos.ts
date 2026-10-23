/**
 * ============================================================================
 *  MÓDULOS — Módulo S y Módulo M
 *
 *  CONFIRMADO por TRAZOFINO: nombre, superficie y categoría.
 *  Todo lo demás está vacío o marcado como pendiente. Para agregar un dato:
 *    - Especificación o material: agregá un objeto con `confirmado: true`.
 *    - Imágenes: copiá el archivo en src/assets/media/modulos/<s|m>/<carpeta>/
 *      y agregalo a `medios` (ver docs/CONTENIDOS.md).
 * ============================================================================
 */
import type { Modulo } from '../lib/tipos';

export const modulos: Modulo[] = [
  {
    slug: 's',
    codigo: 'S',
    nombre: { es: 'Módulo S', en: 'Module S', pt: 'Módulo S' },
    superficie: 24,
    categoria: { es: 'Vivienda modular compacta', en: 'Compact modular home', pt: 'Casa modular compacta' },
    // Textos comerciales: BORRADOR para aprobar.
    resumen: {
      es: 'Veinticuatro metros cuadrados pensados con criterio de arquitectura.',
      en: 'Twenty-four square metres conceived with an architect’s criteria.',
      pt: 'Vinte e quatro metros quadrados pensados com critério de arquitetura.',
    },
    descripcion: {
      es: 'El Módulo S es la vivienda compacta de TRAZOFINO: 24 m² para quienes buscan un espacio propio, proyectado con el mismo cuidado que una obra de arquitectura.\n\nTe acompañamos desde la primera consulta para evaluar tu terreno y tus necesidades antes de avanzar.',
      en: 'Module S is TRAZOFINO’s compact home: 24 m² for those looking for a place of their own, designed with the same care as any architectural work.\n\nWe guide you from the first enquiry, assessing your site and needs before moving forward.',
      pt: 'O Módulo S é a casa compacta da TRAZOFINO: 24 m² para quem busca um espaço próprio, projetado com o mesmo cuidado de uma obra de arquitetura.\n\nAcompanhamos você desde a primeira consulta para avaliar seu terreno e suas necessidades antes de avançar.',
    },
    // Pendiente: medidas, distribución, sistema constructivo, aberturas, instalaciones, plazos.
    especificaciones: [],
    // Pendiente: materiales y terminaciones confirmados.
    materiales: [],
    personalizacion: [
      { nombre: { es: 'Terminaciones interiores', en: 'Interior finishes', pt: 'Acabamentos internos' }, estado: 'pendiente' },
      { nombre: { es: 'Revestimiento exterior', en: 'Exterior cladding', pt: 'Revestimento externo' }, estado: 'pendiente' },
      { nombre: { es: 'Equipamiento', en: 'Fittings', pt: 'Equipamentos' }, estado: 'pendiente' },
    ],
    plano: null,
    medios: { portada: null, exterior: [], interior: [], detalles: [] },
    video: null,
    seo: {
      titulo: { es: 'Módulo S · Vivienda modular de 24 m²', en: 'Module S · 24 m² modular home', pt: 'Módulo S · Casa modular de 24 m²' },
      descripcion: {
        es: 'Módulo S de TRAZOFINO ARQUITECTURA: vivienda modular compacta de 24 m². Solicitá tu cotización.',
        en: 'Module S by TRAZOFINO ARQUITECTURA: a compact 24 m² modular home. Request a quote.',
        pt: 'Módulo S da TRAZOFINO ARQUITECTURA: casa modular compacta de 24 m². Solicite seu orçamento.',
      },
    },
  },
  {
    slug: 'm',
    codigo: 'M',
    nombre: { es: 'Módulo M', en: 'Module M', pt: 'Módulo M' },
    superficie: 48,
    categoria: { es: 'Vivienda modular de mayor superficie', en: 'Larger modular home', pt: 'Casa modular de maior área' },
    resumen: {
      es: 'El doble de superficie, el mismo cuidado en cada decisión.',
      en: 'Twice the floor area, the same care in every decision.',
      pt: 'O dobro da área, o mesmo cuidado em cada decisão.',
    },
    descripcion: {
      es: 'El Módulo M duplica la superficie del Módulo S: 48 m² para habitar con mayor amplitud, proyectados con el mismo criterio arquitectónico.\n\nTe acompañamos desde la primera consulta para evaluar tu terreno y tus necesidades antes de avanzar.',
      en: 'Module M doubles the floor area of Module S: 48 m² for more generous living, designed with the same architectural criteria.\n\nWe guide you from the first enquiry, assessing your site and needs before moving forward.',
      pt: 'O Módulo M dobra a área do Módulo S: 48 m² para viver com mais amplitude, projetados com o mesmo critério arquitetônico.\n\nAcompanhamos você desde a primeira consulta para avaliar seu terreno e suas necessidades antes de avançar.',
    },
    especificaciones: [],
    materiales: [],
    personalizacion: [
      { nombre: { es: 'Terminaciones interiores', en: 'Interior finishes', pt: 'Acabamentos internos' }, estado: 'pendiente' },
      { nombre: { es: 'Revestimiento exterior', en: 'Exterior cladding', pt: 'Revestimento externo' }, estado: 'pendiente' },
      { nombre: { es: 'Equipamiento', en: 'Fittings', pt: 'Equipamentos' }, estado: 'pendiente' },
    ],
    plano: null,
    medios: { portada: null, exterior: [], interior: [], detalles: [] },
    video: null,
    seo: {
      titulo: { es: 'Módulo M · Vivienda modular de 48 m²', en: 'Module M · 48 m² modular home', pt: 'Módulo M · Casa modular de 48 m²' },
      descripcion: {
        es: 'Módulo M de TRAZOFINO ARQUITECTURA: vivienda modular de 48 m². Solicitá tu cotización.',
        en: 'Module M by TRAZOFINO ARQUITECTURA: a 48 m² modular home. Request a quote.',
        pt: 'Módulo M da TRAZOFINO ARQUITECTURA: casa modular de 48 m². Solicite seu orçamento.',
      },
    },
  },
];
