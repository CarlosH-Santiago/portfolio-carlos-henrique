"use client";

import { useRef, useEffect } from "react";
import { BentoCard } from "@/components/bento-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView, animate } from "framer-motion";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const target = parseInt(value.replace(/\D/g, "")) || 0;
      const suffix = value.replace(/\d/g, "");
      
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (current) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(current) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>0{value.replace(/\d/g, "")}</span>;
}

export function MetricsCard() {
  const { t } = useLanguage();

  return (
    <BentoCard delay={0.2} className="!p-0 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col">
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
        
        {/* Métrica 1: Projetos */}
        <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-6 border-b border-r border-white/5 group hover:bg-white/[0.02] transition-colors overflow-hidden">
          {/* Ajuste feito aqui: text-2xl sm:text-3xl e whitespace-nowrap */}
          <span className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
            <AnimatedCounter value={t.metrics.projects.value} />
          </span>
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-primary uppercase tracking-wider mt-1 sm:mt-2 mb-1 leading-tight">
            {t.metrics.projects.label}
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
            {t.metrics.projects.desc}
          </span>
        </div>

        {/* Métrica 2: Horas de Código */}
        <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-6 border-b border-white/5 group hover:bg-white/[0.02] transition-colors overflow-hidden">
          <span className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
            <AnimatedCounter value={t.metrics.hours.value} />
          </span>
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-primary uppercase tracking-wider mt-1 sm:mt-2 mb-1 leading-tight">
            {t.metrics.hours.label}
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
            {t.metrics.hours.desc}
          </span>
        </div>

        {/* Métrica 3: Tecnologias */}
        <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-6 border-r border-white/5 group hover:bg-white/[0.02] transition-colors overflow-hidden">
          <span className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
            <AnimatedCounter value={t.metrics.techs.value} />
          </span>
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-primary uppercase tracking-wider mt-1 sm:mt-2 mb-1 leading-tight">
            {t.metrics.techs.label}
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
            {t.metrics.techs.desc}
          </span>
        </div>

        {/* Métrica 4: Comunidade */}
        <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-6 group hover:bg-white/[0.02] transition-colors overflow-hidden">
          <span className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
            <AnimatedCounter value={t.metrics.community.value} />
          </span>
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-primary uppercase tracking-wider mt-1 sm:mt-2 mb-1 leading-tight">
            {t.metrics.community.label}
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
            {t.metrics.community.desc}
          </span>
        </div>

      </div>
    </BentoCard>
  );
}