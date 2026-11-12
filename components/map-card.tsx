"use client";

import { useEffect, useState } from "react";
import { BentoCard } from "@/components/bento-card";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LOCATIONS = [
  {
    name: "Feira de Santana",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124806.28743831828!2d-39.00685989711624!3d-12.266205912423758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71439dbd0766da9%3A0xed4d58d8cc9d5763!2sFeira%20de%20Santana%20-%20BA!5e0!3m2!1spt-BR!2sbr!4v1708123456790!5m2!1spt-BR!2sbr",
  },
  {
    name: "Irará, Bahia",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62442.66986588237!2d-38.8050965768822!3d-12.049487661596765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7144ee817812b39%3A0x6003714c000d603e!2sIrar%C3%A1%20-%20BA!5e0!3m2!1spt-BR!2sbr!4v1708123456789!5m2!1spt-BR!2sbr",
  },
];

export function MapCard() {
  const { t } = useLanguage();
  const [time, setTime] = useState("");
  const [index, setIndex] = useState(0);

  // 1. Relógio em tempo real (UTC-3 Bahia)
  useEffect(() => {
    const updateClock = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Bahia",
          })
        );
      } catch {
        setTime(
          new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Ciclo de troca de cidades (a cada 8 segundos, sem desmontar os iframes)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOCATIONS.length);
    }, 8000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <BentoCard
      className="md:col-span-1 relative overflow-hidden h-[200px] md:h-auto min-h-[200px] !p-0 rounded-2xl border border-white/10 shadow-2xl"
      delay={0.2}
    >
      {/* --- Relógio Flutuante --- */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-background/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
        <div className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span className="text-xs font-mono font-bold text-foreground">
          {time} UTC-3
        </span>
      </div>

      {/* --- Texto da Cidade (Animado) --- */}
      <div className="absolute bottom-4 left-4 z-30">
        <h3 className="text-sm font-bold text-white drop-shadow-md flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />{" "}
          {t.location.region}
        </h3>

        <AnimatePresence mode="wait">
          <motion.p
            key={LOCATIONS[index].name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-white/80 drop-shadow-md ml-4 font-mono"
          >
            {LOCATIONS[index].name}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Overlay Escuro para leitura */}
      <div className="absolute inset-0 z-20 h-full w-full bg-black/25 pointer-events-none" />

      {/* --- Mapas com Transição Suave via Opacidade (sem recarregar rede) --- */}
      <div className="absolute inset-0 z-10 h-full w-full bg-zinc-900">
        {LOCATIONS.map((loc, i) => (
          <iframe
            key={loc.name}
            src={loc.src}
            width="100%"
            height="100%"
            loading="lazy"
            title={`Mapa de ${loc.name}`}
            className={`absolute inset-0 h-full w-full object-cover border-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-80 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{ filter: "grayscale(1) invert(1)" }}
          />
        ))}
      </div>
    </BentoCard>
  );
}
