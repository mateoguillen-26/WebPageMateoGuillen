import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");
  const tWa = await getTranslations("WhatsApp");
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(tWa("message"))}`;

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="absolute inset-0 -z-10 bg-grid-fade" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">{t("subtitle")}</p>

        <div className="mt-10 rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <ContactForm />
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-sm font-semibold text-muted-foreground">{t("directTitle")}</h2>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <Mail className="size-4" />
              {siteConfig.contactEmail}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <WhatsAppIcon className="size-4" />
              {siteConfig.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
