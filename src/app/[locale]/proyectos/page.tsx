import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: t("indexTitle"),
    description: t("indexDescription"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Projects");
  const tItems = await getTranslations("Projects.items");

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

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-glow-soft opacity-50" />
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                title={tItems(`${project.slug}.title`)}
                category={tItems(`${project.slug}.category`)}
                description={tItems(`${project.slug}.description`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
