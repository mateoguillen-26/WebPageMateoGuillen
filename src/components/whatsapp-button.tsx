"use client";

import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppButton() {
  const t = useTranslations("WhatsApp");
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(t("message"))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-[#25D366]/50 focus-visible:outline-none"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
