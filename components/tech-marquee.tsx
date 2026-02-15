"use client";

import { BentoCard } from "@/components/bento-card";

const technologies = [
  "Java",
  "Spring Boot",
  "Laravel",
  "Angular",
  "Node.js",
  "Kotlin",
  "React",
  "PHP",
  "Python",
  "SQL",
  "MongoDB",
  "Figma",
];

export function TechMarquee() {
  return (
    <BentoCard className="md:col-span-2 overflow-hidden" delay={0.1}>
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Tech Stack
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-4 whitespace-nowrap">
          {[...technologies, ...technologies].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="inline-flex items-center rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
