# Continents Viajes - Documentación Técnica y Funcional

Este documento sirve como un registro vivo ("Living Documentation") del proyecto. Se actualizará constantemente a medida que se implementen nuevas características.

## 1. Visión General del Proyecto
Continents Viajes es una plataforma web dual que consta de:
1. **Web Pública (Customer Facing):** Un portal multi-idioma (ES/EN) para que los usuarios exploren tours, paquetes y vuelos ofertados por la agencia.
2. **Panel de Administración (Backoffice):** Un sistema privado y protegido donde el personal de la agencia puede gestionar (CRUD) el catálogo de viajes.

## 2. Pila Tecnológica (Tech Stack)
- **Framework Core:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 + Variables CSS personalizadas (Design System)
- **Base de Datos & Backend:** Supabase (PostgreSQL)
- **Autenticación:** Supabase SSR Auth (Cookies gestionadas en el servidor)
- **Internacionalización:** `next-intl` (Rutas dinámicas `/[locale]`)
- **Iconografía:** `react-icons` y SVGs personalizados.

## 3. Arquitectura del Sistema

### 3.1. Internacionalización (i18n)
La web pública utiliza `next-intl` para gestionar rutas como `/es/tours` y `/en/tours`. Los diccionarios de traducción se encuentran en la carpeta `/messages` (`es.json`, `en.json`).
- **Excepción de Rutas:** El panel de administración (`/admin`) está excluido explícitamente de la internacionalización para mantener las rutas limpias y evitar conflictos analíticos.

### 3.2. Panel de Administración y Autenticación
El panel en `/admin` está protegido utilizando un patrón de "Edge Interceptor" (`src/proxy.ts`):
- **Estrategia:** Server-Side Rendering (SSR) Auth con `@supabase/ssr`.
- **Flujo:** 
  1. El usuario intenta acceder a `/admin`.
  2. `src/proxy.ts` intercepta la petición.
  3. `src/utils/supabase/middleware.ts` valida el token de la cookie contra Supabase.
  4. Si no hay sesión válida, se redirige forzosamente a `/admin/login`.
- **Gestión de UI:** Las acciones destructivas (ej. Eliminar Vuelo) utilizan un `<ConfirmModal />` personalizado que bloquea la interacción hasta que el usuario confirme, seguido de un `<StatusModal />` animado para el feedback de éxito/error.

## 4. Estructura de la Base de Datos (Supabase)

### Tabla `tours`
Gestiona los paquetes turísticos completos.
- `id` (uuid/bigint)
- `title` (text)
- `slug` (text) - Identificador único de URL.
- `locale` (text) - 'es' o 'en'.
- `duration_days` (numeric)
- `price` (numeric)
- `category` (text)
- `cover_image_url` (text)

### Tabla `flights`
Gestiona los tickets de vuelo individuales.
- `id` (bigint)
- `origin` (text)
- `destination` (text)
- `flight_type` (text)
- `airline` (text)
- `price_usd` (numeric)
- `price_pen` (numeric)
- `date_range` (text)
- `inclusions` (jsonb) - Array de strings con llaves internas de beneficios (ej. `["personal", "carryon", "checked"]`).
- `locale` (text)

*(Este documento continuará expandiéndose con las próximas misiones del proyecto...)*
