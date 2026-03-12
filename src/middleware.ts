import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // REGLA DE ORO solicitada:
  // Interceptar todas las solicitudes excepto:
  // - api (rutas de la API)
  // - _next/static (archivos estáticos de Next.js)
  // - _next/image (motor de optimización de imágenes)
  // - admin (Panel de administración que queremos aislar)
  // - cualquier archivo con punto (ej. favicon.ico, /images/logo.png, sitemap.xml)
  matcher: ['/((?!api|_next/static|_next/image|admin|.*\\..*).*)']
};
