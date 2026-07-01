import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceDefinition } from "@/lib/services-data";

export function ServiceCard({
  service,
  title,
  description,
}: {
  service: ServiceDefinition;
  title: string;
  description: string;
}) {
  const Icon = service.icon;

  return (
    <Link href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}>
      <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="flex h-full flex-col gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-colors group-hover:from-primary/30 group-hover:to-primary/10">
            <Icon className="size-5" aria-hidden />
          </span>
          <h3 className="font-semibold">{title}</h3>
          <p className="flex-1 text-sm text-muted-foreground">{description}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            <ArrowRight className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
