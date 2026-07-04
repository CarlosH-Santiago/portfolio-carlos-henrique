"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se o usuário clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: "en" | "pt") => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Botão Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 rounded-full border border-white/5 bg-zinc-950/30 px-3 py-1.5 text-xs font-mono text-zinc-400 backdrop-blur-md transition-all hover:border-primary/40 hover:text-white hover:bg-zinc-900/50"
      >
        <Globe className="h-3.5 w-3.5 transition-transform duration-300 group-hover:text-primary" />
        <span className="uppercase tracking-widest">{language}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menu Dropdown Animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-36 origin-top-right rounded-xl border border-white/10 bg-zinc-950/90 p-1.5 shadow-2xl backdrop-blur-xl"
          >

            <button
              onClick={() => handleSelect("pt")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-mono transition-colors ${
                language === "pt"
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Português
              {language === "pt" && <Check className="h-3.5 w-3.5" />}
            </button>
            
            <button
              onClick={() => handleSelect("en")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-mono transition-colors ${
                language === "en"
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              English
              {language === "en" && <Check className="h-3.5 w-3.5" />}
            </button>

<button
  onClick={() => handleSelect("es")}
  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-mono transition-colors ${
    language === "es" ? "bg-primary/10 text-primary" : "text-zinc-400 hover:bg-white/5 hover:text-white"
  }`}
>
  Español
  {language === "es" && <Check className="h-3.5 w-3.5" />}
</button>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
