import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/servicios": {
      es: "/servicios",
      en: "/services",
    },
    "/servicios/[slug]": {
      es: "/servicios/[slug]",
      en: "/services/[slug]",
    },
    "/sobre-mi": {
      es: "/sobre-mi",
      en: "/about",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
