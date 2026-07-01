import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { getServiceBySlug, services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "Services.items" });

  return {
    title: t(`${service.slug}.title`),
    description: t(`${service.slug}.shortDescription`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  setRequestLocale(locale);

  const t = await getTranslations("Services");
  const tItem = await getTranslations(`Services.items.${service.slug}`);
  const Icon = service.icon;
  const features = tItem.raw("features") as string[];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="absolute inset-0 -z-10 bg-grid-fade" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: tItem("title"),
            description: tItem("shortDescription"),
            provider: {
              "@type": "ProfessionalService",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }}
        />
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("backToServices")}
        </Link>

        <div className="mt-6 flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
            <Icon className="size-7" aria-hidden />
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tItem("title")}</h1>
        </div>

        <p className="mt-6 text-lg text-muted-foreground text-pretty">{tItem("description")}</p>

        <div className="mt-10 rounded-xl border bg-card p-6">
          <h2 className="font-semibold">{t("featuresTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 rounded-xl border bg-gradient-to-br from-primary/10 to-transparent p-8 text-center">
          <h2 className="text-xl font-semibold">{t("detailCtaTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("detailCtaSubtitle")}</p>
          <Button
            size="lg"
            className="mt-6 shadow-lg shadow-primary/20"
            render={
              <Link href="/contacto">
                {t("detailCtaButton")}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}
