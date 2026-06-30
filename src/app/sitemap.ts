import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function staticEntry(pathname: "/" | "/servicios" | "/sobre-mi" | "/contacto") {
  return {
    url: absoluteUrl(getPathname({ locale: routing.defaultLocale, href: { pathname } })),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          absoluteUrl(getPathname({ locale, href: { pathname } })),
        ])
      ),
    },
  };
}

function serviceEntry(slug: string) {
  const href = { pathname: "/servicios/[slug]" as const, params: { slug } };
  return {
    url: absoluteUrl(getPathname({ locale: routing.defaultLocale, href })),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(getPathname({ locale, href }))])
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    staticEntry("/"),
    staticEntry("/servicios"),
    staticEntry("/sobre-mi"),
    staticEntry("/contacto"),
    ...services.map((service) => serviceEntry(service.slug)),
  ];
}
