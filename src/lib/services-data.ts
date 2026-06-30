import {
  BarChart3,
  LayoutTemplate,
  Megaphone,
  Search,
  ShoppingCart,
  SquareCode,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "landing"
  | "web-avanzada"
  | "ecommerce"
  | "seo"
  | "google-analytics"
  | "google-ads";

export interface ServiceDefinition {
  slug: ServiceSlug;
  icon: LucideIcon;
  category: "desarrollo" | "marketing";
}

export const services: ServiceDefinition[] = [
  { slug: "landing", icon: LayoutTemplate, category: "desarrollo" },
  { slug: "web-avanzada", icon: SquareCode, category: "desarrollo" },
  { slug: "ecommerce", icon: ShoppingCart, category: "desarrollo" },
  { slug: "seo", icon: Search, category: "marketing" },
  { slug: "google-analytics", icon: BarChart3, category: "marketing" },
  { slug: "google-ads", icon: Megaphone, category: "marketing" },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
