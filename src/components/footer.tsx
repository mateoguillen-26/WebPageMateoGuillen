import { useTranslations } from "next-intl";
import { Code2, FolderGit2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tServices = useTranslations("Services.items");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t bg-muted/30">
      <div className="absolute inset-0 -z-10 bg-glow-soft opacity-50" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--chart-2)_60%)] text-primary-foreground">
              <Code2 className="size-4" aria-hidden />
            </span>
            <span>Mateo Guillén</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">{t("servicesTitle")}</h3>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {tServices(`${service.slug}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">{t("siteTitle")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/proyectos" className="text-sm text-muted-foreground hover:text-foreground">
                {tNav("projects")}
              </Link>
            </li>
            <li>
              <Link href="/sobre-mi" className="text-sm text-muted-foreground hover:text-foreground">
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-sm text-muted-foreground hover:text-foreground">
                {tNav("contact")}
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {siteConfig.contactEmail}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <FolderGit2 className="size-3.5" aria-hidden />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {year} {siteConfig.name}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
