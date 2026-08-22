"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function VisitorCounter() {
  const { t } = useLanguage();
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // API gratuita que conta +1 a cada acesso
    fetch("https://api.counterapi.dev/v1/caos-portfolio/visits/up")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.count === "number" && !isNaN(data.count)) {
          setVisits(data.count);
        } else if (data && typeof data.value === "number" && !isNaN(data.value)) {
          setVisits(data.value);
        } else {
          setVisits(142);
        }
      })
      .catch((err) => {
        console.error("Erro no contador:", err);
        setVisits(142); // Número base caso a API caia ou seja bloqueada
      });
  }, []);

  return (
    <AnimatePresence>
      {typeof visits === "number" && !isNaN(visits) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary cursor-default"
        >
          {/* Bolinha "Live" verde piscante */}
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </div>

          <Users className="h-3 w-3" />
          <span>
            <strong className="text-foreground">{visits.toLocaleString()}</strong>{" "}
            {t.visitorCounter.views}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}