"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  id?: string;
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ id, tag, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`col-span-1 md:col-span-4 mt-8 mb-4 flex flex-col gap-1.5 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
          {tag}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-border via-primary/30 to-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mt-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-muted-foreground font-mono">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
