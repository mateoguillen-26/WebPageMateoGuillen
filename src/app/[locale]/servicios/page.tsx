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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {t("indexEyebrow")}
      </p>
      <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-balance">
        {t("indexTitle")}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
        {t("indexDescription")}
      </p>

      <section className="mt-14">
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
  );
}
