"use client";

import { BentoCard } from "@/components/bento-card";
import { Music, Activity, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export function MusicCard() {
  const { t } = useLanguage();

  return (
    <BentoCard
      className="md:col-span-2 h-[200px] flex flex-col justify-between overflow-hidden group relative"
      delay={0.5}
    >
      {/* Background Animado (Simulação de Equalizador) */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 z-0 transition-opacity duration-500 group-hover:opacity-40" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Micro-interação: O ícone cresce levemente no hover */}
          <div className="p-2 bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
            <Music className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {t.music.label}
          </span>
        </div>
        <Activity className="h-4 w-4 text-primary animate-pulse" />
      </div>

      <div className="relative z-10 mt-auto flex flex-col">

        {/* A Mágica da Affordance: Tooltip flutuante que induz ao clique */}
        <div className="flex justify-end w-full mb-2 pointer-events-none">
          <div className="animate-bounce flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 backdrop-blur-sm shadow-lg">
            <PlayCircle className="h-3 w-3 text-green-400" />
            <span className="text-[9px] sm:text-[10px] font-bold text-green-400 uppercase tracking-widest">
              {t.music.tooltip}
            </span>
          </div>
        </div>

        {/* Iframe do Spotify Compacto */}
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/3v5CwIFBTkJ9SK421B83Qs?utm_source=generator&theme=0"
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="shadow-xl border border-white/5 bg-black/50 transition-transform duration-300 group-hover:-translate-y-1 relative z-20"
        ></iframe>
      </div>
    </BentoCard>
  );
}