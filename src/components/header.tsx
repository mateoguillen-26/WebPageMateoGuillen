"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MenuIcon, Code2 } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/servicios", label: t("services") },
    { href: "/proyectos", label: t("projects") },
    { href: "/sobre-mi", label: t("about") },
  ] as const;

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="flex h-14 items-center justify-between gap-2 rounded-full border bg-background/80 py-2 pr-2 pl-4 shadow-lg shadow-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--chart-2)_60%)] text-primary-foreground shadow-sm shadow-primary/30">
            <Code2 className="size-3.5" aria-hidden />
          </span>
          <span className="hidden sm:inline">Mateo Guillén</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "bg-accent text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <ThemeToggle />
          <LocaleSwitcher />
          <Button size="sm" className="rounded-full" render={<Link href="/contacto">{t("cta")}</Link>} />
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menú">
                  <MenuIcon className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <nav className="mt-10 flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                      >
                        {link.label}
                      </Link>
                    }
                  />
                ))}
                <div className="mt-3 px-3">
                  <LocaleSwitcher />
                </div>
                <SheetClose
                  render={
                    <Button className="mt-4" render={<Link href="/contacto">{t("cta")}</Link>} />
                  }
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
