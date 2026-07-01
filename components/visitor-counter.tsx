"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // API gratuita que conta +1 a cada acesso
    fetch("https://api.counterapi.dev/v1/caos-portfolio/visits/up")
      .then((res) => res.json())
      .then((data) => {
        setVisits(data.count);
      })
      .catch((err) => {
        console.error("Erro no contador", err);
        setVisits(142); // Número base caso a API caia
      });
  }, []);

  return (
    <AnimatePresence>
      {visits !== null && (
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
            <strong className="text-foreground">{visits.toLocaleString()}</strong> views
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}