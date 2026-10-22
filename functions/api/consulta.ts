/**
 * POST /api/consulta — Cloudflare Pages Function.
 * Valida la consulta, verifica Turnstile (si está configurado) y la guarda en Supabase
 * (tabla public.consultas). La política RLS solo permite INSERTAR, nunca leer.
 * Sin SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY responde 503: el formulario muestra
 * "envío pendiente de configuración" y ofrece WhatsApp.
 */
interface Env {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const LIMITES = { nombre: 120, telefono: 40, email: 160, localidad: 120, mensaje: 3000, pagina: 300 } as const;
const MODULOS = new Set(['s', 'm', 'ambos', 'otro']);
const IDIOMAS = new Set(['es', 'en', 'pt']);

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const origen = request.headers.get('origin');
  if (origen && origen !== new URL(request.url).origin) return json({ error: 'origen' }, 403);
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) return json({ error: 'sin_configurar' }, 503);

  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: 'json' }, 400);
  }
  if (b.web) return json({ ok: true }); // trampa anti-bots

  const txt = (k: keyof typeof LIMITES) => (typeof b[k] === 'string' ? (b[k] as string).trim().slice(0, LIMITES[k]) : '') || null;
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
  if (!consulta.nombre || consulta.nombre.length < 2 || !consulta.telefono || consulta.telefono.length < 6) return json({ error: 'campos' }, 422);
  if (consulta.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consulta.email)) return json({ error: 'email' }, 422);
  if (!consulta.consentimiento) return json({ error: 'consentimiento' }, 422);

  if (env.TURNSTILE_SECRET_KEY) {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY);
    form.append('response', String(b['cf-turnstile-response'] ?? ''));
    const ip = request.headers.get('cf-connecting-ip');
    if (ip) form.append('remoteip', ip);
    const v = (await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })).json()) as { success: boolean };
    if (!v.success) return json({ error: 'verificacion' }, 403);
  }

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/consultas`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_PUBLISHABLE_KEY,
      'content-type': 'application/json',
      prefer: 'return=minimal',
    },
    body: JSON.stringify(consulta),
  });
  if (!res.ok) return json({ error: 'almacenamiento' }, 502);
  return json({ ok: true });
};
