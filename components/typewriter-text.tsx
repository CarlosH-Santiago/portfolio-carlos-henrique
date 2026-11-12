"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 55,
  className,
}: TypewriterTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      setIndex(text.length);
      return;
    }
    setDisplayed("");
    setIndex(0);
  }, [text, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, prefersReducedMotion]);

  return (
    <span className={`relative inline-block ${className || ""}`}>
      {/* Reserva a geometria exata do texto completo para evitar Layout Shift e ghosting de GPU */}
      <span className="invisible select-none" aria-hidden="true">
        {text}
      </span>
      <span className="absolute left-0 top-0 right-0 bottom-0">
        {displayed}
        {index < text.length && (
          <span
            aria-hidden="true"
            className="inline-block w-0.5 h-6 bg-accent animate-pulse ml-0.5 align-middle"
          />
        )}
      </span>
    </span>
  );
}

