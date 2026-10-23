/**
 * ============================================================================
 *  TEXTOS DEL SITIO — Español (idioma principal)
 *  Textos institucionales, comerciales, de interfaz y SEO.
 *  Los textos marcados como BORRADOR requieren aprobación de TRAZOFINO.
 *  en.ts y pt.ts tienen exactamente las mismas claves.
 * ============================================================================
 */
export const es = {
  meta: {
    inicio: {
      titulo: 'TRAZOFINO ARQUITECTURA · Viviendas modulares',
      descripcion: 'Arquitectura para nuevas formas de habitar. Viviendas modulares de 24 m² y 48 m² diseñadas y construidas por TRAZOFINO ARQUITECTURA.',
    },
    modulos: {
      titulo: 'Casas modulares · Módulo S y Módulo M',
      descripcion: 'Conocé el Módulo S de 24 m² y el Módulo M de 48 m². Comparalos y solicitá tu cotización.',
    },
    proyectos: {
      titulo: 'Proyectos de arquitectura',
      descripcion: 'Portafolio de proyectos de arquitectura del estudio TRAZOFINO.',
    },
    estudio: {
      titulo: 'Estudio',
      descripcion: 'TRAZOFINO ARQUITECTURA: diseño / proyecto, dirección y ejecución de obras.',
    },
    contacto: {
      titulo: 'Contacto y cotizaciones',
      descripcion: 'Solicitá tu cotización del Módulo S o del Módulo M por formulario o WhatsApp.',
    },
    privacidad: { titulo: 'Política de privacidad', descripcion: 'Política de privacidad de TRAZOFINO ARQUITECTURA.' },
    noEncontrada: { titulo: 'Página no encontrada', descripcion: 'La página que buscás no existe.' },
  },

  nav: {
    modulos: 'Módulos',
    proyectos: 'Proyectos',
    estudio: 'Estudio',
    contacto: 'Contacto',
    menu: 'Menú',
    cerrar: 'Cerrar',
    saltar: 'Saltar al contenido',
    idioma: 'Idioma',
    principal: 'Navegación principal',
  },

  cta: {
    explorar: 'Explorar módulos',
    proyectos: 'Conocer nuestros proyectos',
    cotizar: 'Solicitar cotización',
    cotizarCorto: 'Cotizar',
    whatsapp: 'Consultar por WhatsApp',
    whatsappCorto: 'WhatsApp',
    verModulo: 'Ver módulo',
    comparar: 'Comparar módulos',
    verProyecto: 'Ver proyecto',
  },

  aviso: {
    revision: 'Versión preliminar · Contenidos en revisión',
    demo: 'Demostración',
    pendiente: 'Pendiente',
    aConfirmar: 'A confirmar',
    imagenPendiente: 'Imagen pendiente',
    renderIA: 'Render ilustrativo generado con IA',
    render: 'Render ilustrativo',
  },

  inicio: {
    hero: {
      etiqueta: 'Arquitectura · Viviendas modulares',
      titulo: 'Arquitectura para nuevas formas de habitar.',
      // BORRADOR
      texto: 'Diseñamos y construimos viviendas modulares con criterio de arquitectura. Dos módulos, de 24 y 48 m², para empezar a habitar.',
      desplazar: 'Desplazar',
      pausar: 'Pausar video',
      reproducir: 'Reproducir video',
    },
    presentacion: {
      etiqueta: 'TRAZOFINO',
      titulo: 'Una práctica de arquitectura, aplicada a la vivienda modular.',
      // BORRADOR basado en la descripción provista por la empresa
      texto: 'TRAZOFINO es una empresa constructora dedicada al diseño y proyecto, la dirección y la ejecución de obras. Llevamos esa misma práctica profesional a viviendas modulares pensadas para habitar con claridad.',
    },
    modular: {
      etiqueta: 'Viviendas modulares',
      titulo: 'Un diseño definido desde el primer día.',
      // BORRADOR
      texto: 'Una vivienda modular parte de un proyecto resuelto de antemano. Conocer su superficie y su propuesta desde el inicio permite evaluar, comparar y decidir con información clara, acompañado por profesionales en cada etapa.',
    },
    modelos: {
      etiqueta: 'Los módulos',
      titulo: 'Dos escalas para habitar.',
      texto: 'El Módulo S y el Módulo M comparten un mismo criterio de diseño. Elegí la superficie que mejor se adapte a tu proyecto.',
    },
    ventajas: {
      etiqueta: 'El enfoque',
      titulo: 'Por qué un módulo de TRAZOFINO.',
      // BORRADOR: afirmaciones a validar por TRAZOFINO antes del lanzamiento.
      items: [
        { titulo: 'Proyecto de arquitectura', texto: 'Cada módulo parte de un diseño resuelto: sabés desde el inicio qué superficie y qué propuesta estás evaluando.' },
        { titulo: 'Dos superficies claras', texto: '24 m² y 48 m²: dos escalas para necesidades distintas, comparables de forma directa.' },
        { titulo: 'Un mismo equipo', texto: 'Diseño y proyecto, dirección y ejecución de obras a cargo de una misma empresa constructora.' },
        { titulo: 'Asesoramiento previo', texto: 'Antes de cotizar conversamos sobre tu terreno y tus necesidades para orientarte con criterio profesional.' },
      ],
    },
    estudio: {
      etiqueta: 'Estudio de arquitectura',
      titulo: 'Proyectos del estudio.',
      texto: 'Además de los módulos, el estudio desarrolla proyectos de arquitectura a medida.',
    },
    proceso: {
      etiqueta: 'Cómo trabajamos',
      titulo: 'De la consulta a la propuesta.',
      // BORRADOR
      pasos: [
        { titulo: 'Consulta', texto: 'Escribinos por WhatsApp o desde el formulario indicando el módulo de interés y la localidad aproximada.' },
        { titulo: 'Asesoramiento', texto: 'Conversamos sobre tu terreno, tus necesidades y el módulo más adecuado para tu caso.' },
        { titulo: 'Cotización', texto: 'Preparamos una propuesta y una cotización según la información relevada.' },
        { titulo: 'Próximos pasos', texto: 'Definimos juntos cómo avanzar con el proyecto y la obra.' },
      ],
    },
    final: {
      titulo: 'Empecemos por tu consulta.',
      texto: 'Contanos qué módulo te interesa y dónde imaginás tu proyecto. Te respondemos personalmente.',
    },
  },

  modulos: {
    etiqueta: 'Casas modulares',
    titulo: 'Módulo S y Módulo M.',
    texto: 'Dos viviendas modulares diseñadas por TRAZOFINO ARQUITECTURA. Explorá cada una o comparalas.',
    comparar: {
      titulo: 'Comparar módulos',
      texto: 'La comparación muestra únicamente los datos confirmados de cada módulo.',
      escala: 'Superficie comparada a escala. El dibujo representa área, no la planta de la vivienda.',
      dato: 'Dato',
      pendientes: 'Medidas, distribución y especificaciones: se informarán al confirmarse.',
    },
  },

  ficha: {
    superficie: 'Superficie',
    categoria: 'Categoría',
    galeria: 'Galería',
    exterior: 'Exterior',
    interior: 'Interior',
    detalles: 'Detalles',
    plano: 'Plano',
    planoPendiente: 'El plano arquitectónico estará disponible próximamente.',
    especificaciones: 'Especificaciones técnicas',
    especificacionesPendiente: 'Las especificaciones técnicas se publicarán una vez confirmadas. Podés consultarlas con nosotros.',
    materiales: 'Materiales y terminaciones',
    materialesPendiente: 'Los materiales y terminaciones se publicarán una vez confirmados.',
    personalizacion: 'Personalización',
    personalizacionTexto: 'Opciones posibles, sujetas a confirmación para cada proyecto.',
    otroModulo: 'Conocé también',
    consultaEtiqueta: 'Cotización',
    consultaTitulo: 'Solicitá la cotización del {modulo}.',
    consultaTexto: 'Completá el formulario o escribinos por WhatsApp. Te respondemos personalmente.',
    galeriaPendiente: 'Fotografías y renders en preparación.',
    imagen: 'Imagen',
    de: 'de',
    anterior: 'Imagen anterior',
    siguiente: 'Imagen siguiente',
  },

  proyectos: {
    etiqueta: 'Portafolio',
    titulo: 'Proyectos.',
    texto: 'Trabajos de arquitectura desarrollados por el estudio.',
    vacioTitulo: 'Portafolio en preparación.',
    vacioTexto: 'Pronto vas a poder recorrer aquí los proyectos del estudio. Mientras tanto, consultanos por proyectos a medida.',
    anio: 'Año',
    ubicacion: 'Ubicación',
    categoria: 'Categoría',
    detalles: 'Detalles',
    galeria: 'Galería',
    planos: 'Planos y renders',
    volver: 'Todos los proyectos',
    demoAviso: 'Proyecto de demostración: no representa una obra realizada.',
  },

  estudio: {
    etiqueta: 'Estudio',
    titulo: 'TRAZOFINO ARQUITECTURA.',
    // Descripción provista por la empresa
    texto: 'Empresa constructora dedicada al diseño / proyecto, dirección y ejecución de obras.',
    enfoque: {
      titulo: 'Enfoque',
      // BORRADOR
      texto: 'Entendemos la arquitectura como un trabajo de precisión: cada decisión se dibuja, se mide y se resuelve antes de construir. Ese mismo criterio guía nuestras viviendas modulares y nuestros proyectos a medida.',
    },
    equipo: {
      titulo: 'Equipo',
      bioPendiente: 'Biografía y trayectoria pendientes de información.',
      rolPendiente: 'Socio arquitecto',
      fotoPendiente: 'Fotografía pendiente',
    },
    vision: {
      titulo: 'Visión',
      // BORRADOR
      texto: 'Acercar arquitectura de calidad a nuevas formas de habitar, con propuestas claras y un acompañamiento profesional en cada etapa.',
    },
    servicios: {
      titulo: 'Servicios',
      items: ['Diseño / proyecto', 'Dirección de obra', 'Ejecución de obra'],
    },
  },

  contacto: {
    etiqueta: 'Contacto',
    titulo: 'Solicitá tu cotización.',
    texto: 'Escribinos por el formulario o por WhatsApp. Te respondemos personalmente.',
    directo: 'Contacto directo',
    form: {
      nombre: 'Nombre y apellido',
      email: 'Correo electrónico',
      telefono: 'Teléfono',
      modulo: 'Modelo de interés',
      moduloOpciones: { s: 'Módulo S · 24 m²', m: 'Módulo M · 48 m²', ambos: 'Ambos / no estoy seguro', otro: 'Proyecto a medida' },
      localidad: 'Localidad aproximada del proyecto',
      mensaje: 'Mensaje adicional',
      opcional: 'opcional',
      consentimiento: 'Acepto que TRAZOFINO utilice estos datos para responder mi consulta, según la',
      privacidad: 'política de privacidad',
      enviar: 'Enviar consulta',
      enviando: 'Enviando…',
      whatsapp: 'Enviar por WhatsApp',
      requerido: 'Obligatorio',
    },
    estados: {
      ok: 'Recibimos tu consulta. Te vamos a responder a la brevedad.',
      error: 'No pudimos enviar la consulta. Probá nuevamente o escribinos por WhatsApp.',
      limite: 'Recibimos muchas consultas en poco tiempo. Probá nuevamente en unos minutos o escribinos por WhatsApp.',
      pendiente: 'El envío por formulario todavía no está habilitado. Podés enviar esta misma consulta por WhatsApp.',
      invalido: 'Revisá los campos marcados.',
    },
    wa: {
      saludo: 'Hola TRAZOFINO, quiero hacer una consulta.',
      modulo: 'Hola TRAZOFINO, me interesa el {modulo}.',
      nombre: 'Nombre',
      modelo: 'Modelo',
      localidad: 'Localidad',
      email: 'Email',
      telefono: 'Teléfono',
    },
    pendienteDato: 'Dato pendiente',
  },

  privacidad: {
    titulo: 'Política de privacidad',
    borrador: 'Borrador editable. Requiere revisión legal antes de su publicación definitiva.',
    parrafos: [
      'TRAZOFINO ARQUITECTURA utiliza los datos que nos envíes por el formulario o por WhatsApp (nombre, correo electrónico, teléfono, modelo de interés, localidad y mensaje) únicamente para responder tu consulta y preparar una cotización.',
      'No vendemos ni cedemos tus datos a terceros. Los datos del formulario se almacenan en un servicio de base de datos con acceso restringido.',
      'Podés solicitar el acceso, la rectificación o la eliminación de tus datos escribiéndonos por los canales de contacto de este sitio.',
    ],
  },

  pie: {
    descripcion: 'Empresa constructora dedicada al diseño / proyecto, dirección y ejecución de obras.',
    navegacion: 'Navegación',
    contacto: 'Contacto',
    redes: 'Redes',
    derechos: 'Todos los derechos reservados.',
    privacidad: 'Privacidad',
    arriba: 'Volver arriba',
  },

  noEncontrada: {
    titulo: 'Esta página no existe.',
    texto: 'Puede que el enlace haya cambiado.',
    volver: 'Volver al inicio',
  },
};

export type Textos = typeof es;
