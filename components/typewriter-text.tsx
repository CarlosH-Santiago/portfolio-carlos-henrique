"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 60,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {index < text.length && (
        <span className="inline-block w-0.5 h-6 bg-accent animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  );
}
