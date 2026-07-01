import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { ProjectCard } from "@/components/project-card";
import { services } from "@/lib/services-data";
import { projects } from "@/lib/projects-data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const tServices = await getTranslations("Services.items");
  const tProjects = await getTranslations("Projects.items");

  const steps = t.raw("process.steps") as { title: string; description: string }[];
  const trustItems = t.raw("trust.items") as string[];

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-hero-glow" />
        <div className="absolute inset-0 -z-10 bg-grid-fade" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="shadow-lg shadow-primary/25"
                render={
                  <Link href="/contacto">
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/servicios">{t("hero.ctaSecondary")}</Link>}
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/20 blur-2xl" />
            <div className="overflow-hidden rounded-xl border bg-card shadow-xl shadow-primary/10">
              <div className="flex items-center gap-1.5 border-b bg-muted/60 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-yellow-400" />
                <span className="size-2.5 rounded-full bg-green-400" />
              </div>
              <div className="space-y-3 p-6 font-mono text-xs sm:text-sm">
                <p className="text-muted-foreground">
                  <span className="text-primary">const</span> sitio = {"{"}
                </p>
                <p className="pl-4">
                  rápido: <span className="text-primary">true</span>,
                </p>
                <p className="pl-4">
                  seo: <span className="text-primary">&quot;optimizado&quot;</span>,
                </p>
                <p className="pl-4">
                  analytics: <span className="text-primary">&quot;conectado&quot;</span>,
                </p>
                <p className="pl-4">
                  ads: <span className="text-primary">&quot;gestionado&quot;</span>,
                </p>
                <p className="text-muted-foreground">{"}"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b bg-muted/20">
        <div className="absolute inset-0 -z-10 bg-glow-soft-alt opacity-70" />
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t("trust.title")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-foreground/90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-glow-soft opacity-70" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("servicesTeaser.eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {t("servicesTeaser.title")}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {t("servicesTeaser.subtitle")}
            </p>
          </div>
          <Button
            variant="ghost"
            render={
              <Link href="/servicios">
                {t("servicesTeaser.cta")}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              title={tServices(`${service.slug}.title`)}
              description={tServices(`${service.slug}.shortDescription`)}
            />
          ))}
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y bg-muted/20">
        <div className="absolute inset-0 -z-10 bg-glow-soft-alt opacity-70" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("process.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("process.title")}</h2>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative space-y-2">
                {index < steps.length - 1 ? (
                  <span
                    className="absolute top-4.5 left-9 hidden h-px w-[calc(100%-1rem)] bg-gradient-to-r from-primary/40 to-transparent lg:block"
                    aria-hidden
                  />
                ) : null}
                <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--chart-2)_60%)] text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20">
                  {index + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-glow-soft opacity-70" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("projectsTeaser.eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {t("projectsTeaser.title")}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {t("projectsTeaser.subtitle")}
            </p>
          </div>
          <Button
            variant="ghost"
            render={
              <Link href="/proyectos">
                {t("projectsTeaser.cta")}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              title={tProjects(`${project.slug}.title`)}
              category={tProjects(`${project.slug}.category`)}
              description={tProjects(`${project.slug}.description`)}
            />
          ))}
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-glow-soft-alt opacity-70" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("aboutTeaser.eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {t("aboutTeaser.title")}
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              {t("aboutTeaser.description")}
            </p>
            <Button
              className="mt-6"
              variant="outline"
              render={
                <Link href="/sobre-mi">
                  {t("aboutTeaser.cta")}
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t bg-cta-gradient text-primary-foreground">
        <div className="absolute inset-0 -z-10 bg-grid-fade opacity-20" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-balance">{t("cta.title")}</h2>
          <p className="mt-3 text-primary-foreground/80 text-pretty">{t("cta.subtitle")}</p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-7 shadow-lg shadow-black/10"
            render={
              <Link href="/contacto">
                {t("cta.button")}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        </div>
      </section>
    </>
  );
}
