"use client";

import type { LucideIcon } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

interface ProjectCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  delay?: number;
}

export function ProjectCard({
  icon: Icon,
  title,
  description,
  tags,
  delay = 0,
}: ProjectCardProps) {
  return (
    <BentoCard className="flex flex-col justify-between" delay={delay}>
      <div className="space-y-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-mono text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
