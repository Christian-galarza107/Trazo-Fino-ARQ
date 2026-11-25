/**
 * ============================================================================
 *  TEXTOS DE LA HOME (primera experiencia web)
 *  Fuente: docs/TRAZOFINO_DESIGN_SPEC.md §0 (definiciones D1–D6) y §2.
 *  No se publican dormitorios, distribución ni especificaciones técnicas de los
 *  módulos hasta que el arquitecto las apruebe.
 * ============================================================================
 */
import type { T } from '../lib/tipos';

export const home = {
  nav: {
    inicio: { es: 'Inicio', en: 'Home', pt: 'Início' },
    servicios: { es: 'Servicios', en: 'Services', pt: 'Serviços' },
    asesoria: { es: 'Solicitar una asesoría', en: 'Request a consultation', pt: 'Solicitar uma assessoria' },
    asesoriaCorta: { es: 'Asesoría', en: 'Consultation', pt: 'Assessoria' },
    arriba: { es: 'Volver arriba', en: 'Back to top', pt: 'Voltar ao topo' },
  },

  pendiente: { es: 'Imagen pendiente', en: 'Image pending', pt: 'Imagem pendente' },

  hero: {
    etiqueta: { es: 'Arquitectura para', en: 'Architecture for', pt: 'Arquitetura para' },
    titulo: { es: 'Nuevas formas de habitar.', en: 'New ways of living.', pt: 'Novas formas de habitar.' },
    texto: {
      es: 'Viviendas modulares y proyectos de diseño, con una visión arquitectónica integral.',
      en: 'Modular homes and design projects, with an integral architectural vision.',
      pt: 'Casas modulares e projetos de design, com uma visão arquitetônica integral.',
    },
    modulos: { es: 'Conocé los módulos', en: 'Discover the modules', pt: 'Conheça os módulos' },
    proyectos: { es: 'Ver proyectos', en: 'View projects', pt: 'Ver projetos' },
  },

  hogar: {
    etiqueta: { es: 'Viviendas modulares', en: 'Modular homes', pt: 'Casas modulares' },
    titulo: { es: 'Tu hogar,\nmás cerca.', en: 'Your home,\ncloser.', pt: 'Sua casa,\nmais perto.' },
    texto: {
      es: 'Módulos habitacionales de 24 m² y 48 m², con fabricación, transporte e instalación incluidos.',
      en: '24 m² and 48 m² living modules, with manufacturing, transport and installation included.',
      pt: 'Módulos habitacionais de 24 m² e 48 m², com fabricação, transporte e instalação incluídos.',
    },
    boton: { es: 'Ver modelos', en: 'View models', pt: 'Ver modelos' },
  },

  caminos: {
    etiqueta: { es: 'Nuestras propuestas', en: 'What we offer', pt: 'Nossas propostas' },
    titulo: { es: 'Tres caminos. Una misma visión.', en: 'Three paths. One vision.', pt: 'Três caminhos. Uma mesma visão.' },
    texto: {
      es: 'Diseño, construcción y gestión, integrados para convertir ideas en espacios reales.',
      en: 'Design, construction and permitting, integrated to turn ideas into real spaces.',
      pt: 'Projeto, construção e gestão, integrados para transformar ideias em espaços reais.',
    },
    items: [
      {
        titulo: { es: 'Viviendas modulares', en: 'Modular homes', pt: 'Casas modulares' },
        texto: {
          es: 'Módulos S (24 m²) y M (48 m²) con fabricación, transporte e instalación incluidos.',
          en: 'Modules S (24 m²) and M (48 m²) with manufacturing, transport and installation included.',
          pt: 'Módulos S (24 m²) e M (48 m²) com fabricação, transporte e instalação incluídos.',
        },
        enlace: { es: 'Explorar módulos', en: 'Explore modules', pt: 'Explorar módulos' },
        codigo: 'TF-SRV-01',
      },
      {
        titulo: { es: 'Proyectos a medida', en: 'Custom projects', pt: 'Projetos sob medida' },
        texto: {
          es: 'Arquitectura y construcción de viviendas particulares, adaptadas a cada terreno.',
          en: 'Architecture and construction of private homes, adapted to each site.',
          pt: 'Arquitetura e construção de casas particulares, adaptadas a cada terreno.',
        },
        enlace: { es: 'Ver proyectos', en: 'View projects', pt: 'Ver projetos' },
        codigo: 'TF-SRV-02',
      },
      {
        titulo: { es: 'Asesoramiento y gestiones', en: 'Advice and permits', pt: 'Assessoria e gestões' },
        texto: {
          es: 'Planos municipales, gestiones de aprobación y documentación para barrios privados.',
          en: 'Municipal drawings, approval procedures and documentation for gated communities.',
          pt: 'Plantas municipais, trâmites de aprovação e documentação para condomínios fechados.',
        },
        enlace: { es: 'Conocer servicios', en: 'Our services', pt: 'Conhecer serviços' },
        codigo: 'TF-SRV-03',
      },
    ],
    atributos: [
      { icono: 'plano', titulo: { es: 'Diseño arquitectónico', en: 'Architectural design', pt: 'Projeto arquitetônico' }, texto: { es: 'Diseño propio de TRAZOFINO', en: 'Designed by TRAZOFINO', pt: 'Projeto próprio da TRAZOFINO' } },
      { icono: 'fabrica', titulo: { es: 'Fabricación', en: 'Manufacturing', pt: 'Fabricação' }, texto: { es: 'Incluida en el valor', en: 'Included in the price', pt: 'Incluída no valor' } },
      { icono: 'camion', titulo: { es: 'Transporte', en: 'Transport', pt: 'Transporte' }, texto: { es: 'Hasta tu terreno, incluido', en: 'To your site, included', pt: 'Até o seu terreno, incluído' } },
      { icono: 'casa', titulo: { es: 'Instalación', en: 'Installation', pt: 'Instalação' }, texto: { es: 'En tu terreno, incluida', en: 'On your site, included', pt: 'No seu terreno, incluída' } },
    ],
    nota: {
      es: 'Las fundaciones y las conexiones de agua, electricidad y cloacas quedan a cargo del cliente.',
      en: 'Foundations and water, electricity and sewage connections are the client’s responsibility.',
      pt: 'As fundações e as ligações de água, eletricidade e esgoto ficam a cargo do cliente.',
    },
  },

  catalogo: {
    etiqueta: { es: 'Nuestros módulos', en: 'Our modules', pt: 'Nossos módulos' },
    titulo: { es: 'Diseño que se adapta\na tu vida.', en: 'Design that adapts\nto your life.', pt: 'Design que se adapta\nà sua vida.' },
    texto: {
      es: 'Dos módulos base, con posibilidades de crecimiento sujetas a validación técnica para acompañar cada etapa de tu proyecto.',
      en: 'Two base modules, with growth options subject to technical validation to support each stage of your project.',
      pt: 'Dois módulos base, com possibilidades de crescimento sujeitas a validação técnica para acompanhar cada etapa do seu projeto.',
    },
    items: [
      { icono: 'superficie', texto: { es: 'Superficie cubierta {m2}', en: 'Covered area {m2}', pt: 'Área coberta {m2}' } },
      { icono: 'fabrica', texto: { es: 'Fabricación incluida', en: 'Manufacturing included', pt: 'Fabricação incluída' } },
      { icono: 'camion', texto: { es: 'Transporte e instalación incluidos', en: 'Transport and installation included', pt: 'Transporte e instalação incluídos' } },
      { icono: 'plano', texto: { es: 'Diseño arquitectónico TRAZOFINO', en: 'TRAZOFINO architectural design', pt: 'Projeto arquitetônico TRAZOFINO' } },
    ],
    detalles: { es: 'Ver detalles', en: 'View details', pt: 'Ver detalhes' },
    crecimiento: {
      titulo: { es: 'Posibilidades\nde crecimiento', en: 'Growth\npossibilities', pt: 'Possibilidades\nde crescimento' },
      items: [
        { codigo: 'TF-ISO-01', texto: { es: 'Módulo individual', en: 'Single module', pt: 'Módulo individual' } },
        { codigo: 'TF-ISO-02', texto: { es: 'Conexión lateral', en: 'Side connection', pt: 'Conexão lateral' } },
        { codigo: 'TF-ISO-03', texto: { es: 'Dos niveles', en: 'Two levels', pt: 'Dois níveis' } },
      ],
      nota: {
        es: 'Esquemas ilustrativos. Cada configuración está sujeta a validación estructural, ingeniería, terreno y permisos.',
        en: 'Illustrative diagrams. Each configuration is subject to structural validation, engineering, site conditions and permits.',
        pt: 'Esquemas ilustrativos. Cada configuração está sujeita a validação estrutural, engenharia, terreno e licenças.',
      },
    },
  },

  proyectos: {
    etiqueta: { es: 'Proyectos realizados', en: 'Completed projects', pt: 'Projetos realizados' },
    titulo: { es: 'Casas que cuentan historias.', en: 'Homes that tell stories.', pt: 'Casas que contam histórias.' },
    todos: { es: 'Ver todos los proyectos', en: 'View all projects', pt: 'Ver todos os projetos' },
    anterior: { es: 'Proyecto anterior', en: 'Previous project', pt: 'Projeto anterior' },
    siguiente: { es: 'Proyecto siguiente', en: 'Next project', pt: 'Próximo projeto' },
  },

  servicios: {
    etiqueta: { es: 'Nuestros servicios', en: 'Our services', pt: 'Nossos serviços' },
    titulo: { es: 'Acompañamos\ntodo tu proyecto.', en: 'We support\nyour whole project.', pt: 'Acompanhamos\ntodo o seu projeto.' },
    texto: {
      es: 'Una mirada integral, desde la idea inicial hasta la construcción, con la experiencia de un estudio de arquitectura.',
      en: 'An integral approach, from the first idea to construction, with the experience of an architecture studio.',
      pt: 'Um olhar integral, da ideia inicial à construção, com a experiência de um escritório de arquitetura.',
    },
    items: [
      { icono: 'compas', titulo: { es: 'Proyecto arquitectónico', en: 'Architectural project', pt: 'Projeto arquitetônico' }, texto: { es: 'Diseño y documentación del Arq. Sebastian Gonzalez.', en: 'Design and documentation by Arch. Sebastian Gonzalez.', pt: 'Projeto e documentação do Arq. Sebastian Gonzalez.' } },
      { icono: 'documento', titulo: { es: 'Planos municipales y aprobaciones', en: 'Municipal drawings and approvals', pt: 'Plantas municipais e aprovações' }, texto: { es: 'Planos y gestiones de aprobación ante el municipio.', en: 'Drawings and approval procedures with the municipality.', pt: 'Plantas e trâmites de aprovação junto à prefeitura.' } },
      { icono: 'barrio', titulo: { es: 'Documentación para barrios privados', en: 'Gated community documentation', pt: 'Documentação para condomínios' }, texto: { es: 'La documentación que exige cada barrio.', en: 'The documentation each community requires.', pt: 'A documentação que cada condomínio exige.' } },
      { icono: 'casa', titulo: { es: 'Construcción a medida', en: 'Custom construction', pt: 'Construção sob medida' }, texto: { es: 'Arquitectura y construcción de viviendas particulares.', en: 'Architecture and construction of private homes.', pt: 'Arquitetura e construção de casas particulares.' } },
    ],
    boton: { es: 'Conocer todos los servicios', en: 'All services', pt: 'Conhecer todos os serviços' },
    // Pendiente de confirmar "sin costo": no se promete gratuidad.
    factibilidad: { es: 'Consultá la factibilidad de tu proyecto', en: 'Ask about your project’s feasibility', pt: 'Consulte a viabilidade do seu projeto' },
  },

  cierre: {
    titulo: { es: 'Hablemos de tu proyecto.', en: 'Let’s talk about your project.', pt: 'Vamos falar do seu projeto.' },
    texto: {
      es: 'Contanos qué tenés en mente y te asesoramos en cada etapa.',
      en: 'Tell us what you have in mind and we will advise you at every stage.',
      pt: 'Conte o que você tem em mente e assessoramos você em cada etapa.',
    },
    whatsapp: { es: 'Escribinos por WhatsApp', en: 'Message us on WhatsApp', pt: 'Fale conosco pelo WhatsApp' },
  },
} satisfies Record<string, unknown>;

export type IconoLinea =
  | 'plano'
  | 'fabrica'
  | 'camion'
  | 'casa'
  | 'superficie'
  | 'compas'
  | 'documento'
  | 'barrio';

/** Divide un título en líneas forzadas ("\n"). */
export const lineas = (v: T, lang: keyof T) => (v[lang] || v.es).split('\n');
