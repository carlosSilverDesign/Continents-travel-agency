import { updateSession } from './utils/supabase/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: any) {
  // 1. Run the Supabase Auth Interceptor (this handles auth logic & cookie refreshing)
  const authResponse = await updateSession(request);

  // If Supabase triggered a redirect (e.g. enforcing login boundary), obey it immediately
  if (authResponse.status === 307 || authResponse.status === 308) {
    return authResponse;
  }

  // Si la ruta es del Panel de Administración, devolver el authResponse directo.
  // Así evitamos que next-intl intente inyectar el idioma (ej. /es/admin) provocando un Error 404.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return authResponse;
  }

  // 2. Pass to internationalization middleware.
  // We must merge the cookies refreshed by Supabase into the next-intl response.
  const intlResponse = intlMiddleware(request);

  // Sync Supabase's newly set cookies over to the intlResponse so they reach the browser
  authResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  // REGLA DE ORO solicitada:
  // Interceptar todas las solicitudes excepto:
  // - api (rutas de la API)
  // - _next/static (archivos estáticos de Next.js)
  // - _next/image (motor de optimización de imágenes)
  // - cualquier archivo con punto (ej. favicon.ico, /images/logo.png, sitemap.xml)
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']
};
