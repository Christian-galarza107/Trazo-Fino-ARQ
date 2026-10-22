import type { APIRoute } from 'astro';
import { sitio } from '../config/sitio';

export const GET: APIRoute = ({ site }) =>
  new Response(
    sitio.lanzado
      ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`
      : `# Sitio en preparación: no indexar hasta el lanzamiento\nUser-agent: *\nDisallow: /\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
