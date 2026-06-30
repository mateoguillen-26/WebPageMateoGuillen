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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
