import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/services-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  return {
    title: t("indexTitle"),
    description: t("indexDescription"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services");
  const tServices = await getTranslations("Services.items");

  const development = services.filter((s) => s.category === "desarrollo");
  const marketing = services.filter((s) => s.category === "marketing");

  return (
    <div>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-hero-glow" />
        <div className="absolute inset-0 -z-10 bg-grid-fade" />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t("indexEyebrow")}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-balance">
            {t("indexTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            {t("indexDescription")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <section>
          <h2 className="text-xl font-semibold">{t("categoryDevelopment")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {development.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                title={tServices(`${service.slug}.title`)}
                description={tServices(`${service.slug}.shortDescription`)}
              />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold">{t("categoryMarketing")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {marketing.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                title={tServices(`${service.slug}.title`)}
                description={tServices(`${service.slug}.shortDescription`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
