import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RESERVED_SUBDOMAINS = new Set(['www', 'app', 'dashboard', 'admin', 'api']);
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get('host') || '';

  // Skip internal Next.js paths and static files
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isLocalhost = host.includes('localhost');
  const isPraisolDomain = host.endsWith('.praisol.online') || host === 'praisol.online';
  const parts = host.split('.');

  let slug = '';

  if (isLocalhost) {
    // slug.localhost:3000
    if (parts.length > 1 && parts[0] !== 'localhost') {
      slug = parts[0];
    }
  } else if (isPraisolDomain) {
    // slug.praisol.online
    if (parts.length > 2) {
      slug = parts[0];
    }
  } else {
    // ── Custom domain: www.myschool.com ──────────────────────────────────────
    // Resolve via backend API — edge-compatible fetch (no Node APIs)
    try {
      const resolveUrl = `${BACKEND_URL}/resolve-domain?host=${encodeURIComponent(host)}`;
      const r = await fetch(resolveUrl, { next: { revalidate: 60 } }); // cache 60 s
      if (r.ok) {
        const data = await r.json();
        if (data.slug) {
          // Rewrite to the tenant site renderer, passing the domain for later use
          const rewriteUrl = new URL(`/sites/${data.slug}${url.pathname}`, req.url);
          const res = NextResponse.rewrite(rewriteUrl);
          res.headers.set('x-tenant-domain', host);
          return res;
        }
      }
    } catch {
      // If resolve fails fall through to normal handling
    }
    return NextResponse.next();
  }

  // Subdomain found — standard rewrite
  if (slug && !RESERVED_SUBDOMAINS.has(slug)) {
    return NextResponse.rewrite(new URL(`/sites/${slug}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

