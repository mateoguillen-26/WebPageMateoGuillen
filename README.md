# Mateo Guillén — sitio web

Sitio web personal/profesional para ofrecer servicios de desarrollo web (landing pages, sitios avanzados, e-commerce) y marketing digital (SEO, administración de Google Analytics y Google Ads).

Construido con Next.js 16 (App Router), TypeScript, Tailwind CSS v4 y shadcn/ui. Contenido bilingüe (es/en) con `next-intl`. Pensado para desplegar en Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (sobre Base UI)
- **next-intl** — rutas `/es` y `/en`, URLs traducidas (ej. `/servicios` ↔ `/services`)
- **Resend** — envío del formulario de contacto por email
- **@next/third-parties** — Google Analytics 4 (opcional, vía variable de entorno)

## Estructura del proyecto

```
src/
  app/
    [locale]/
      layout.tsx          # layout raíz (html/body), header, footer, metadata
      page.tsx             # home
      servicios/
        page.tsx            # índice de servicios
        [slug]/page.tsx      # detalle de cada servicio
      sobre-mi/page.tsx
      contacto/page.tsx
    api/
      contact/route.ts      # endpoint del formulario (Resend)
    sitemap.ts
    robots.ts
  components/               # Header, Footer, ContactForm, ServiceCard, etc.
  components/ui/             # componentes shadcn/ui
  i18n/                      # routing, navigation, request config de next-intl
  lib/
    services-data.ts          # catálogo de servicios (slug, icono, categoría)
    site-config.ts             # nombre, URL, email de contacto, GA ID
  proxy.ts                   # antes "middleware.ts" — detección/redirección de idioma
messages/
  es.json                   # todo el copy en español
  en.json                   # todo el copy en inglés
```

## Cómo agregar o editar contenido

- **Textos**: todo el copy vive en `messages/es.json` y `messages/en.json`. No hay textos hardcodeados en los componentes.
- **Servicios**: el catálogo (slugs, ícono, categoría) está en `src/lib/services-data.ts`. Para agregar un servicio nuevo:
  1. Agregar el slug en `ServiceSlug` y un entry en el array `services`.
  2. Agregar el contenido (`title`, `shortDescription`, `description`, `features`) bajo `Services.items.<slug>` en ambos `messages/es.json` y `messages/en.json`.
  3. La página `/servicios/[slug]` y el sitemap se generan automáticamente.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar las variables (ver abajo)
npm run dev
```

Abrí [http://localhost:3000/es](http://localhost:3000/es) (o `/en`).

## Variables de entorno

Ver `.env.example`. Resumen:

| Variable | Para qué sirve | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (metadata, sitemap, OG) | Recomendada |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email que se muestra en el sitio (footer, contacto) | Recomendada |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) para enviar el formulario de contacto | Sí, para que el formulario funcione |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend | No (usa `onboarding@resend.dev` de prueba) |
| `NEXT_PUBLIC_GA_ID` | ID de Google Analytics 4 (`G-XXXXXXXXXX`) | No (si está vacío, GA no se carga) |

### Configurar Resend (formulario de contacto)

1. Crear cuenta en [resend.com](https://resend.com) y generar una API key.
2. (Opcional pero recomendado) Verificar tu propio dominio en Resend para poder enviar desde `contacto@tudominio.com` en vez del dominio de pruebas.
3. Cargar `RESEND_API_KEY` (y `CONTACT_FROM_EMAIL` si verificaste dominio) en `.env.local` y en las variables de entorno del proyecto en Vercel.

## Deploy en Vercel

1. Subí el repo a GitHub (ver más abajo).
2. En [vercel.com/new](https://vercel.com/new), importá el repositorio.
3. Vercel detecta Next.js automáticamente — no hace falta configuración extra.
4. Cargá las variables de entorno del punto anterior en **Project Settings → Environment Variables**.
5. Deploy.

## Conectar este repo a GitHub

Este proyecto ya tiene un repo git local con el primer commit hecho. Para subirlo a GitHub:

```bash
gh repo create mateoguillen-dev --private --source=. --remote=origin --push
# o manualmente:
git remote add origin https://github.com/<tu-usuario>/<nombre-repo>.git
git push -u origin main
```

## Pendientes / ideas para sumar más adelante

- Reemplazar el email de contacto por defecto (`hola@mateoguillen.dev` en `.env.example`) por uno real.
- Reemplazar `src/app/favicon.ico` (es el ícono genérico de Next.js) por uno propio.
- Sumar un dominio propio y actualizar `NEXT_PUBLIC_SITE_URL`.
- Reemplazar los íconos/placeholder visual del hero por capturas reales de proyectos cuando los tengas.
- Sección de portafolio/casos de éxito cuando haya proyectos para mostrar.
- Verificar dominio propio en Resend para que los emails no salgan desde `onboarding@resend.dev`.
