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
import type { Medio, Proyecto } from '../lib/tipos';

const vivienda = { es: 'Vivienda unifamiliar', en: 'Single-family house', pt: 'Casa unifamiliar' };
const foto = (archivo: string, es: string, en: string, pt: string): Medio => ({ archivo, alt: { es, en, pt }, origen: 'fotografia' });

// Obras reales de TRAZOFINO (fotos de Drive "FOTOS PROYECTOS TF CONSTRUCTORA", con consentimiento de los propietarios).
// Títulos y textos: BORRADOR, describen solo lo que se ve en las fotos. Año, ubicación y superficie: pendientes (null).
export const proyectos: Proyecto[] = [
  {
    slug: 'vivienda-01',
    demo: false,
    publicado: true,
    titulo: { es: 'Vivienda 01', en: 'House 01', pt: 'Casa 01' },
    categoria: vivienda,
    anio: null,
    ubicacion: null,
    resumen: {
      es: 'Interiores de alta terminación: piedra, madera y superficies de veta marmolada.',
      en: 'High-end interiors: stone, wood and marble-veined surfaces.',
      pt: 'Interiores de alto padrão: pedra, madeira e superfícies com veios de mármore.',
    },
    descripcion: {
      es: 'Una vivienda donde las terminaciones definen cada ambiente. La cocina combina una mesada de piedra negra con frentes de listones de madera y una vinoteca iluminada.\n\nEn el comedor, un muro de piedra con iluminación rasante enmarca el hogar. El baño principal suma superficies de veta marmolada y grifería dorada.',
      en: 'A house where finishes define every room. The kitchen pairs a black stone countertop with wooden slat fronts and a lit wine cabinet.\n\nIn the dining room, a stone wall with grazing light frames the fireplace. The main bathroom adds marble-veined surfaces and brass fittings.',
      pt: 'Uma casa onde os acabamentos definem cada ambiente. A cozinha combina bancada de pedra preta com frentes de ripas de madeira e uma adega iluminada.\n\nNa sala de jantar, uma parede de pedra com iluminação rasante emoldura a lareira. O banheiro principal soma superfícies com veios de mármore e metais dourados.',
    },
    detalles: [],
    portada: foto('proyectos/casa-5/01-cocina.jpg', 'Cocina con isla de piedra negra, frentes de listones de madera y vinoteca iluminada', 'Kitchen with black stone island, wooden slat fronts and lit wine cabinet', 'Cozinha com ilha de pedra preta, frentes de ripas de madeira e adega iluminada'),
    galeria: [
      foto('proyectos/casa-5/02-comedor.jpg', 'Comedor frente a un muro de piedra con apliques de luz y hogar', 'Dining room facing a stone wall with wall lights and fireplace', 'Sala de jantar diante de parede de pedra com arandelas e lareira'),
      foto('proyectos/casa-5/03-bano.jpg', 'Baño con revestimiento de veta marmolada, bañera de hidromasaje y grifería dorada', 'Bathroom with marble-veined cladding, whirlpool tub and brass fittings', 'Banheiro com revestimento de veios de mármore, banheira de hidromassagem e metais dourados'),
    ],
    planos: [],
  },
  {
    slug: 'vivienda-02',
    demo: false,
    publicado: true,
    titulo: { es: 'Vivienda 02', en: 'House 02', pt: 'Casa 02' },
    categoria: vivienda,
    anio: null,
    ubicacion: null,
    resumen: {
      es: 'Vivienda de dos plantas de estilo clásico, con cubierta de tejas y aberturas de madera.',
      en: 'Classic-style two-storey house with tiled roof and wooden openings.',
      pt: 'Casa de dois pavimentos em estilo clássico, com telhado cerâmico e esquadrias de madeira.',
    },
    descripcion: {
      es: 'Volúmenes blancos de revoque, cubierta de tejas y una galería de acceso con puerta de madera.\n\nEn el interior, un living amplio y luminoso se organiza alrededor del hogar.',
      en: 'White rendered volumes, a tiled roof and an entrance porch with a wooden door.\n\nInside, a large, bright living room is arranged around the fireplace.',
      pt: 'Volumes brancos rebocados, telhado cerâmico e uma varanda de acesso com porta de madeira.\n\nNo interior, uma sala ampla e luminosa se organiza em torno da lareira.',
    },
    detalles: [],
    portada: foto('proyectos/casa-4/01-fachada.jpg', 'Fachada de dos plantas con tejas, revoque blanco y puerta de madera', 'Two-storey facade with roof tiles, white render and wooden door', 'Fachada de dois pavimentos com telhas, reboco branco e porta de madeira'),
    galeria: [
      foto('proyectos/casa-4/02-living.jpg', 'Living con sillón claro, mesa de madera, estanterías y hogar', 'Living room with light sofa, wooden table, shelving and fireplace', 'Sala com sofá claro, mesa de madeira, estantes e lareira'),
    ],
    planos: [],
  },
  {
    slug: 'vivienda-03',
    demo: false,
    publicado: true,
    titulo: { es: 'Vivienda 03', en: 'House 03', pt: 'Casa 03' },
    categoria: vivienda,
    anio: null,
    ubicacion: null,
    resumen: {
      es: 'Vivienda de una planta y techo plano, de la platea a la obra terminada en blanco.',
      en: 'Single-storey flat-roof house, from foundation slab to finished shell.',
      pt: 'Casa térrea de laje plana, da fundação à obra concluída.',
    },
    descripcion: {
      es: 'Volúmenes puros de techo plano, galería de acceso y carpinterías negras de piso a techo que abren la casa a un patio en U con parrilla.\n\nEl registro acompaña la obra desde la platea de fundación.',
      en: 'Pure flat-roofed volumes, an entrance porch and floor-to-ceiling black frames opening the house onto a U-shaped patio with a grill.\n\nThe record follows the build from the foundation slab.',
      pt: 'Volumes puros de laje plana, varanda de acesso e esquadrias pretas do piso ao teto que abrem a casa para um pátio em U com churrasqueira.\n\nO registro acompanha a obra desde a fundação.',
    },
    detalles: [],
    portada: foto('proyectos/casa-2/01-fachada.jpg', 'Fachada blanca de una planta con galería de acceso y carpinterías negras', 'White single-storey facade with entrance porch and black window frames', 'Fachada branca térrea com varanda de acesso e esquadrias pretas'),
    galeria: [
      foto('proyectos/casa-2/02-patio.jpg', 'Patio en U con parrilla y grandes ventanales, en etapa de terminaciones', 'U-shaped patio with grill and large windows, during finishing works', 'Pátio em U com churrasqueira e grandes janelas, na etapa de acabamentos'),
      foto('proyectos/casa-2/03-platea.jpg', 'Platea de fundación y armaduras de acero listas para la estructura', 'Foundation slab and steel reinforcement ready for the structure', 'Fundação em radier e armaduras de aço prontas para a estrutura'),
    ],
    planos: [],
  },
  {
    slug: 'vivienda-04',
    demo: false,
    publicado: true,
    titulo: { es: 'Vivienda 04', en: 'House 04', pt: 'Casa 04' },
    categoria: vivienda,
    anio: null,
    ubicacion: null,
    resumen: {
      es: 'Estructura de hormigón armado: encofrados, losas y el equipo de obra.',
      en: 'Reinforced concrete structure: formwork, slabs and the site team.',
      pt: 'Estrutura de concreto armado: fôrmas, lajes e a equipe de obra.',
    },
    descripcion: {
      es: 'Registro de la ejecución de la estructura de hormigón armado: encofrado y apuntalamiento de losas, columnas y el equipo de obra de TRAZOFINO sobre la losa.\n\nLa vivienda terminada suma interiores con vista abierta al paisaje.',
      en: 'A record of the reinforced concrete structure being built: slab formwork and shoring, columns and the TRAZOFINO site team on the slab.\n\nThe finished house adds interiors with open views of the landscape.',
      pt: 'Registro da execução da estrutura de concreto armado: fôrmas e escoramento das lajes, pilares e a equipe de obra da TRAZOFINO sobre a laje.\n\nA casa concluída soma interiores com vista aberta para a paisagem.',
    },
    detalles: [],
    portada: foto('proyectos/casa-1/01-equipo-losa.jpg', 'Equipo de obra de TRAZOFINO sobre la losa apuntalada, con cielo azul', 'TRAZOFINO site team standing on the shored slab under a blue sky', 'Equipe de obra da TRAZOFINO sobre a laje escorada, com céu azul'),
    galeria: [
      foto('proyectos/casa-1/02-encofrado.jpg', 'Encofrado y apuntalamiento de la losa con columnas de hormigón', 'Slab formwork and shoring with concrete columns', 'Fôrma e escoramento da laje com pilares de concreto'),
      foto('proyectos/casa-1/03-bano.jpg', 'Baño terminado con revestimiento texturado, espejos orgánicos y ventana al parque', 'Finished bathroom with textured tiles, organic mirrors and a window to the garden', 'Banheiro concluído com revestimento texturizado, espelhos orgânicos e janela para o jardim'),
    ],
    planos: [],
  },
];

const textoDemo = {
  es: 'Este es un proyecto de demostración para evaluar el diseño de la sección. No representa una obra realizada por TRAZOFINO.',
  en: 'This is a demonstration project used to review the section design. It does not represent a work built by TRAZOFINO.',
  pt: 'Este é um projeto de demonstração para avaliar o design da seção. Não representa uma obra realizada pela TRAZOFINO.',
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
