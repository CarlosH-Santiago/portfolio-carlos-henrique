"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card/80 p-6 backdrop-blur-sm transition-colors hover:border-primary/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
