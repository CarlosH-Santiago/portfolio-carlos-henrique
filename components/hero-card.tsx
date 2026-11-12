"use client";

import { useRef, useState } from "react";
import { Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { BentoCard } from "@/components/bento-card";
import { TypewriterText } from "@/components/typewriter-text";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroCard() {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const birthDate = new Date("2006-06-22");

  // Lógica para calcular a idade exata considerando meses e anos bissextos
  const today = new Date();
  let currentAge = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    currentAge--;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width * 0.4,
      y: e.clientY - rect.top + rect.height * 0.1,
    });
  };

  const spotlightMask = `radial-gradient(${
    isHovered ? "200px" : "0px"
  } circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, rgba(0, 0, 0, 0.85) 45%, transparent 100%)`;

  return (
    <BentoCard
      className="!p-0 border border-white/10 bg-zinc-950/50 shadow-2xl backdrop-blur-md md:col-span-2 md:row-span-2 flex flex-col justify-center overflow-hidden"
      delay={0}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex h-full w-full flex-col justify-center p-6 sm:p-8 min-h-[320px]"
      >
        {/* Layout da Imagem (Lado Direito) com Máscara Estática de Degradê */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 z-10 h-[110%] w-[60%] select-none"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        >
          {/* Camada Base: Estática, P&B e Opacidade 30% */}
          <Image
            src="/carlos-profile.png"
            alt="Carlos Henrique Santiago"
            fill
            sizes="(max-width: 768px) 60vw, 35vw"
            className="object-cover object-top grayscale opacity-30"
            priority
          />

          {/* Camada Revelada: Colorida dentro do motion.div com Spotlight */}
          <motion.div
            className="absolute inset-0"
            animate={{
              WebkitMaskImage: spotlightMask,
              maskImage: spotlightMask,
            } as any}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
          >
            <Image
              src="/carlos-profile.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 60vw, 35vw"
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </div>

        {/* Textos (Lado Esquerdo) com z-20, max-w-[65%] e sombra de texto limpa sem glitch de filtro GPU */}
        <div className="relative z-20 flex max-w-[65%] flex-col items-start gap-6 [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
          <div className="space-y-2">
            <h1 className="font-mono tracking-tight text-foreground space-y-1">
              <span className="block text-2xl font-bold text-primary lg:text-4xl">
                <TypewriterText text="<Caos Dev>" />
              </span>
              <span className="block text-xl font-bold lg:text-3xl">
                <TypewriterText text="<Carlos Henrique Santiago/>" />
              </span>
            </h1>
            <p className="font-mono text-sm font-medium text-accent pt-1">
              {t.hero.role}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
            {t.hero.bio.replace("{age}", currentAge.toString())}
          </p>

          <div className="flex flex-wrap gap-3 [text-shadow:none]">
            <a
              href="/CV-Carlos-Santiago.pdf"
              download="CV_Carlos_Henrique_Santiago.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-zinc-950/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:border-primary/30"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t.hero.downloadCv}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t.hero.contactMe}
            </a>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
