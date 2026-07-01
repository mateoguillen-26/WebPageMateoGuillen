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
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--chart-2)_60%)] text-primary-foreground shadow-sm shadow-primary/30">
            <Code2 className="size-4" aria-hidden />
          </span>
          <span>Mateo Guillén</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground after:absolute after:-bottom-[21px] after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LocaleSwitcher />
          <Button size="sm" render={<Link href="/contacto">{t("cta")}</Link>} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LocaleSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Menú">
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
