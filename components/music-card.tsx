"use client";

import { BentoCard } from "@/components/bento-card";
import { Music, Activity } from "lucide-react";
import Image from "next/image";

export function MusicCard() {
  return (
    <BentoCard
      className="md:col-span-1 h-[200px] flex flex-col justify-between overflow-hidden group"
      delay={0.5}
    >
      {/* Background Animado (Simulação de Equalizador) */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 z-0" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Music className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Vibe
          </span>
        </div>
        <Activity className="h-4 w-4 text-primary animate-pulse" />
      </div>

      <div className="relative z-10 mt-auto">
        {/* Iframe do Spotify Compacto */}
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0" // Playlist Lofi Coding
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="shadow-lg border border-white/5 bg-black/50"
        ></iframe>
      </div>
    </BentoCard>
  );
}
