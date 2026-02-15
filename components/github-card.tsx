"use client";

import { useEffect, useMemo, useState } from "react";
import { BentoCard } from "@/components/bento-card";

export function GithubCard() {
  const weeks = 20;
  const days = 7;

  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    const randomGrid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.random())
    );
    setGrid(randomGrid);
  }, []);


  function getColor(value: number): string {
    if (value < 0.2) return "bg-secondary";
    if (value < 0.4) return "bg-accent/20";
    if (value < 0.6) return "bg-accent/40";
    if (value < 0.8) return "bg-accent/70";
    return "bg-accent";
  }

  return (
    <BentoCard className="md:col-span-2" delay={0.5}>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          GitHub Activity
        </p>
        <p className="text-xs text-muted-foreground">
          Committing code & organizing chaos.
        </p>
      </div>
      <div className="flex gap-1 overflow-hidden min-h-[6rem]" role="img" aria-label="GitHub contribution graph showing high activity">
        {grid.length === 0 
          ? Array.from({ length: weeks }).map((_, wi) => (
              <div key={`loading-${wi}`} className="flex flex-col gap-1">
                {Array.from({ length: days }).map((_, di) => (
                  <div key={`loading-${wi}-${di}`} className="h-3 w-3 rounded-sm bg-secondary opacity-20" />
                ))}
              </div>
            ))
          : grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    // Adicionei animate-in e fade-in para dar um efeito suave quando as cores aparecerem
                    className={`h-3 w-3 rounded-sm ${getColor(day)} transition-colors duration-500 animate-in fade-in`}
                  />
                ))}
              </div>
            ))
        }
      </div>
    </BentoCard>
  );
}
