"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Oculta a tela após 2.5 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          // A animação de saída: desaparece suavemente com um leve desfoque
          exit={{ opacity: 0, filter: "blur(10px)" }} 
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950"
        >
          {/* Container da Logo com animação de entrada */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex h-32 w-32 items-center justify-center"
          >
            {/* Efeito de anel pulsante atrás da logo */}
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 duration-1000" />
            
            <Image
              src="/logo.png"
              alt="Logo Carregando"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
              priority // Força o Next.js a carregar essa imagem primeiro
            />
          </motion.div>
          
          {/* Barra de progresso visual */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 h-0.5 w-48 overflow-hidden rounded-full bg-white/5"
          >
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              // A barra enche exatamente no tempo da tela de carregamento
              transition={{ duration: 2, ease: "easeInOut" }} 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}