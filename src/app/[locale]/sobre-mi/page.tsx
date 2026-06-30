import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");
  const skills = t.raw("skills") as string[];
  const experience = t.raw("experience") as ExperienceItem[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {t("eyebrow")}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance">{t("title")}</h1>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{t("degree")}</p>
      <p className="mt-6 text-lg text-muted-foreground text-pretty">{t("intro")}</p>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">{t("philosophyTitle")}</h2>
        <p className="mt-3 text-muted-foreground text-pretty">{t("philosophy")}</p>
      </div>

      <div className="mt-10 rounded-xl border bg-card p-6">
        <h2 className="font-semibold">{t("skillsTitle")}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="text-sm text-foreground/90">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">{t("experienceTitle")}</h2>
        <ol className="mt-5 space-y-6 border-l pl-6">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative">
              <span className="absolute top-1.5 -left-[27px] size-2.5 rounded-full bg-primary" />
              <p className="font-semibold">{item.company}</p>
              <p className="text-sm text-muted-foreground">{item.role}</p>
              <p className="mt-0.5 text-xs text-muted-foreground/80">
                {item.location} · {item.period}
              </p>
              <p className="mt-2 text-sm text-foreground/90 text-pretty">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <Button
        size="lg"
        className="mt-12"
        render={
          <Link href="/contacto">
            {t("cta")}
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    </div>
  );
}
