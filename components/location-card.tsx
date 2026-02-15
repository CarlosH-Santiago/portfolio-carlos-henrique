"use client";

import { MapPin } from "lucide-react";
import { BentoCard } from "@/components/bento-card";

export function LocationCard() {
  return (
    <BentoCard className="relative" delay={0.45}>
      {/* Stylized map background */}
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 400 300"
          fill="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M0 150 Q100 100 200 150 T400 150"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
          />
          <path
            d="M0 180 Q100 130 200 180 T400 180"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
          <path
            d="M0 120 Q100 70 200 120 T400 120"
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
          />
          <circle cx="200" cy="150" r="4" fill="hsl(var(--accent))" />
          <circle
            cx="200"
            cy="150"
            r="12"
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="hsl(var(--foreground))"
              strokeWidth="0.2"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 45}
              y1="0"
              x2={i * 45}
              y2="300"
              stroke="hsl(var(--foreground))"
              strokeWidth="0.2"
            />
          ))}
        </svg>
      </div>
      <div className="relative">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
          <MapPin className="h-4 w-4" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Bahia, Brazil
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">
          Based in Feira de Santana / Irará
        </p>
      </div>
    </BentoCard>
  );
}
