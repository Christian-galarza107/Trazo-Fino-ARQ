/**
 * ============================================================================
 *  CONFIGURACIÓN CENTRAL DEL SITIO
 *  Datos comerciales y de contacto. Es el único lugar donde se modifican.
 *  Un valor `null` significa "dato pendiente": el sitio lo oculta o muestra
 *  un estado pendiente, nunca un dato inventado.
 * ============================================================================
 */
import { SITE_URL } from './dominio.mjs';

export const sitio = {
  marca: 'Trazo Fino',
  marcaCompleta: 'Trazo Fino Arquitectura',
  dominio: SITE_URL,

  /** Descripción provista por la empresa. */
  descripcion: 'Empresa constructora dedicada al diseño / proyecto, dirección y ejecución de obras.',

  contacto: {
    /** WhatsApp en formato internacional, solo números (Argentina móvil: 549 + área sin 0 + número sin 15). */
    whatsapp: '5491169965554' as string | null,
    telefonoVisible: '+54 9 11 6996-5554' as string | null,
    email: 'estudio.tfarquitectura@gmail.com' as string | null,
    /** Dirección o zona de trabajo. Pendiente. */
    direccion: null as string | null,
    /** Horario de atención. Pendiente. */
    horario: null as string | null,
  },

  /** Redes sociales: completar la URL completa para que aparezcan en el sitio. */
  redes: {
    instagram: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
  },

  equipo: [
    {
      nombre: 'Arq. Sebastián González',
      /** Rol, biografía y foto: pendientes de información. */
      rol: null as string | null,
      foto: null as string | null,
    },
  ],

  /** Estado de publicación (se controla con variables de entorno, ver .env.example). */
  lanzado: import.meta.env.PUBLIC_SITE_LAUNCHED === 'true',
  mostrarDemos: import.meta.env.PUBLIC_MOSTRAR_DEMOS === 'true',

  /** Idiomas publicados. El primero es el principal (URLs sin prefijo). */
  idiomas: ['es', 'en', 'pt'] as const,
} as const;

export type Idioma = (typeof sitio.idiomas)[number];
