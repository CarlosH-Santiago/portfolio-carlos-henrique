"use client";

import { Globe, GraduationCap, Calendar, School } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { useLanguage } from "@/contexts/LanguageContext";

const communityIcons = [Globe, GraduationCap, Calendar, School];

export function CommunityCard() {
  const { t } = useLanguage();

  return (
    <BentoCard className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden md:row-span-2 flex flex-col" delay={0.3}>
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t.community.category}
      </p>
      <h3 className="mb-6 font-mono text-lg font-semibold text-foreground">
        {t.community.title}
      </h3>
      <ul className="flex flex-1 flex-col gap-4">
        {t.community.items.map((label, index) => {
          const Icon = communityIcons[index];
          return (
            <li key={label} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </BentoCard>
  );
}
