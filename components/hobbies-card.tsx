"use client";

import { Music, Gauge } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

export function HobbiesCard() {
  return (
    <BentoCard delay={0.4}>
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Interests
      </p>
      <h3 className="mb-4 font-mono text-lg font-semibold text-foreground">
        Beyond Code
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Music className="h-6 w-6" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Gauge className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Philharmonic Musician & Speed Enthusiast.
      </p>
    </BentoCard>
  );
}
