"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const localeLabels: Record<string, string> = {
  es: "ES",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onChange(nextLocale: string | null) {
    if (!nextLocale) return;
    router.replace(
      // @ts-expect-error -- `params` always matches `pathname` for the current route.
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <Select defaultValue={locale} onValueChange={onChange}>
      <SelectTrigger size="sm" className="w-[68px]" aria-label="Idioma / Language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {localeLabels[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
