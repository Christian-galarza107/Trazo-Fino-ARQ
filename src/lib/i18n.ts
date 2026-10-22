import { sitio, type Idioma } from '../config/sitio';
import { es, type Textos } from '../content/textos/es';
import { en } from '../content/textos/en';
import { pt } from '../content/textos/pt';
import type { T } from './tipos';

export const IDIOMAS = sitio.idiomas;
export const LOCALE: Record<Idioma, string> = { es: 'es-AR', en: 'en', pt: 'pt-BR' };

const TEXTOS: Record<Idioma, Textos> = { es, en, pt };
export const textos = (lang: Idioma): Textos => TEXTOS[lang];

/** Segmentos de URL por idioma. Español sin prefijo: /modulos/s/ */
export const RUTAS = {
  inicio: { es: '', en: '', pt: '' },
  modulos: { es: 'modulos', en: 'modules', pt: 'modulos' },
  proyectos: { es: 'proyectos', en: 'projects', pt: 'projetos' },
  estudio: { es: 'estudio', en: 'studio', pt: 'estudio' },
  contacto: { es: 'contacto', en: 'contact', pt: 'contato' },
  privacidad: { es: 'privacidad', en: 'privacy', pt: 'privacidade' },
} as const;
export type Ruta = keyof typeof RUTAS;

export function url(lang: Idioma, ruta: Ruta, slug?: string): string {
  const partes = [lang === 'es' ? '' : lang, RUTAS[ruta][lang], slug].filter(Boolean);
  return '/' + partes.join('/') + (partes.length ? '/' : '');
}

export function alternativas(ruta: Ruta, slug?: string): Record<Idioma, string> {
  return Object.fromEntries(IDIOMAS.map((l) => [l, url(l, ruta, slug)])) as Record<Idioma, string>;
}

/** Texto en el idioma pedido con respaldo en español. */
export function tr(v: T | null | undefined, lang: Idioma): string {
  if (!v) return '';
  return (v[lang] || v.es || '').trim();
}

export const fmt = (s: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), s);

export const parrafos = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export const m2 = (n: number, lang: Idioma) => `${new Intl.NumberFormat(LOCALE[lang]).format(n)} m²`;

/** Enlace wa.me con mensaje. Devuelve null si el número no está configurado. */
export function whatsapp(texto: string): string | null {
  const n = sitio.contacto.whatsapp?.replace(/\D/g, '');
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(texto)}` : null;
}
