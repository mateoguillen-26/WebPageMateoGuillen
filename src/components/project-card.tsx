import { ExternalLink, FolderGit2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectDefinition } from "@/lib/projects-data";

export function ProjectCard({
  project,
  title,
  category,
  description,
}: {
  project: ProjectDefinition;
  title: string;
  category: string;
  description: string;
}) {
  const t = useTranslations("Projects");
  const Icon = project.icon;

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="flex-1 text-sm text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="size-4" />
            {t("liveLabel")}
          </a>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <FolderGit2 className="size-4" />
              {t("repoLabel")}
            </a>
          ) : null}
        </div>
        {project.liveNote ? (
          <p className="text-xs text-muted-foreground/80">{t("demoNote")}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
