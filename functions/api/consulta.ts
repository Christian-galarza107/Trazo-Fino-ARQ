/**
 * /api/consulta — Cloudflare Pages Function.
 *
 * Recibe el formulario de consulta, lo valida y lo guarda en Supabase (tabla public.consultas).
 *  - Solo POST, mismo origen, JSON y cuerpo de hasta 16 KB. Otros métodos: 405.
 *  - Si TURNSTILE_SECRET_KEY está configurado, el token se verifica SIEMPRE en el servidor
 *    (también el dominio que lo emitió).
 *  - Clave de Supabase: SUPABASE_SECRET_KEY (solo servidor) si existe; si no, la publicable.
 *    La política RLS solo permite insertar consultas, nunca leerlas.
 *  - Sin configuración de Supabase responde 503: el formulario informa "envío pendiente" y
 *    ofrece WhatsApp. Nunca se simula un envío.
 *  - No registra datos personales en los logs.
 */
interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SECRET_KEY?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}
interface Contexto {
  request: Request;
  env: Env;
}

const CABECERAS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'no-referrer',
  'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
  'x-robots-tag': 'noindex',
};
const responder = (cuerpo: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(cuerpo), { status, headers: { ...CABECERAS, ...extra } });

const MAX_BYTES = 16 * 1024;
const LIMITES = { nombre: 120, telefono: 40, email: 160, localidad: 120, mensaje: 3000, pagina: 300 } as const;
const MODULOS = new Set(['s', 'm', 'ambos', 'otro']);
const IDIOMAS = new Set(['es', 'en', 'pt']);
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
// Quita caracteres de control (salvo saltos de línea en el mensaje) y espacios sobrantes.
const limpiar = (v: string, multilinea: boolean) =>
  v.replace(multilinea ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '').trim();

export const onRequest = async (ctx: Contexto): Promise<Response> => {
  if (ctx.request.method !== 'POST') return responder({ error: 'metodo' }, 405, { allow: 'POST' });
  return recibir(ctx);
};

async function recibir({ request, env }: Contexto): Promise<Response> {
  const url = new URL(request.url);
  const origen = request.headers.get('origin');
  if (!origen || origen !== url.origin) return responder({ error: 'origen' }, 403);
  if (!(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) return responder({ error: 'tipo' }, 415);
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BYTES) return responder({ error: 'tamano' }, 413);

  const clave = env.SUPABASE_SECRET_KEY || env.SUPABASE_PUBLISHABLE_KEY;
  if (!env.SUPABASE_URL || !clave) return responder({ error: 'sin_configurar' }, 503);

  const texto = await request.text();
  if (texto.length > MAX_BYTES) return responder({ error: 'tamano' }, 413);
  let b: Record<string, unknown>;
  try {
    const v = JSON.parse(texto);
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error();
    b = v as Record<string, unknown>;
  } catch {
    return responder({ error: 'json' }, 400);
  }
  // Campo trampa: los bots lo completan. Se descarta sin guardar nada.
  if (typeof b.web === 'string' && b.web.length > 0) return responder({ ok: true });

  const txt = (k: keyof typeof LIMITES) => {
    const v = typeof b[k] === 'string' ? limpiar(b[k] as string, k === 'mensaje') : '';
    return v ? v.slice(0, LIMITES[k]) : null;
  };
  const consulta = {
    nombre: txt('nombre'),
    telefono: txt('telefono'),
    email: txt('email'),
    localidad: txt('localidad'),
    mensaje: txt('mensaje'),
    pagina: txt('pagina'),
    modulo: MODULOS.has(String(b.modulo)) ? String(b.modulo) : null,
    idioma: IDIOMAS.has(String(b.idioma)) ? String(b.idioma) : null,
    consentimiento: b.consentimiento === 'on' || b.consentimiento === true,
  };
  if (!consulta.nombre || consulta.nombre.length < 2) return responder({ error: 'campos' }, 422);
  if (!consulta.telefono || !/^[+\d][\d\s().-]{5,39}$/.test(consulta.telefono)) return responder({ error: 'telefono' }, 422);
  if (consulta.email && !EMAIL.test(consulta.email)) return responder({ error: 'email' }, 422);
  if (!consulta.consentimiento) return responder({ error: 'consentimiento' }, 422);

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof b['cf-turnstile-response'] === 'string' ? (b['cf-turnstile-response'] as string) : '';
    if (!token || token.length > 2048) return responder({ error: 'verificacion' }, 403);
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY);
    form.append('response', token);
    const ip = request.headers.get('cf-connecting-ip');
    if (ip) form.append('remoteip', ip);
    try {
      const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form, signal: AbortSignal.timeout(8000) });
      const v = (await r.json()) as { success: boolean; hostname?: string };
      if (!v.success || (v.hostname && v.hostname !== url.hostname)) return responder({ error: 'verificacion' }, 403);
    } catch {
      return responder({ error: 'verificacion' }, 503);
    }
  }

  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/consultas`, {
      method: 'POST',
      headers: { apikey: clave, 'content-type': 'application/json', prefer: 'return=minimal' },
      body: JSON.stringify(consulta),
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 429) {
      // Límite anti-spam de la base (SQLSTATE PT429): "intentá más tarde", sin detalles.
      console.warn('consulta: límite de frecuencia');
      return responder({ error: 'limite' }, 429);
    }
    if (res.status === 400) return responder({ error: 'campos' }, 422);
    if (!res.ok) {
      console.error('consulta: error de almacenamiento', res.status);
      return responder({ error: 'almacenamiento' }, 502);
    }
  } catch {
    console.error('consulta: Supabase no respondió');
    return responder({ error: 'almacenamiento' }, 504);
  }
  return responder({ ok: true });
}
