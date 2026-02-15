"use client";

import { Globe, GraduationCap, Calendar, School } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

const communityItems = [
  { icon: Globe, label: "Founder of Bahia Dev Hub" },
  { icon: GraduationCap, label: "Speaker at UNEX (Information Systems)" },
  { icon: Calendar, label: "Organizer DevOpsDays FSA" },
  { icon: School, label: "IT Workshops for Public Schools" },
];

export function CommunityCard() {
  return (
    <BentoCard className="md:row-span-2 flex flex-col" delay={0.3}>
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Community
      </p>
      <h3 className="mb-6 font-mono text-lg font-semibold text-foreground">
        Community Builder
      </h3>
      <ul className="flex flex-1 flex-col gap-4">
        {communityItems.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
