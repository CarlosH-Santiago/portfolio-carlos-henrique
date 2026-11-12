"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  revealRadius?: number;
}

export function BentoCard({
  children,
  className,
  delay = 0,
  revealRadius,
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Reveal Hover Effect: Eased pointer tracking (desktop fine pointer only)
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches) return;

    const state = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      radius: 0,
      targetRadius: 0,
      clientX: 0,
      clientY: 0,
      inside: false,
      frame: 0,
    };

    const getRadius = () => {
      if (typeof revealRadius === "number" && Number.isFinite(revealRadius)) {
        return revealRadius;
      }
      return Math.min(260, Math.max(160, element.clientWidth * 0.35));
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      state.clientX = clientX;
      state.clientY = clientY;
      state.targetX = clientX - rect.left;
      state.targetY = clientY - rect.top;
    };

    const tick = () => {
      state.frame = 0;

      const positionEase = reduceMotion.matches ? 1 : 0.1;
      const radiusEase = reduceMotion.matches ? 1 : 0.14;

      state.x += (state.targetX - state.x) * positionEase;
      state.y += (state.targetY - state.y) * positionEase;
      state.radius += (state.targetRadius - state.radius) * radiusEase;

      element.style.setProperty("--reveal-x", `${state.x.toFixed(2)}px`);
      element.style.setProperty("--reveal-y", `${state.y.toFixed(2)}px`);
      element.style.setProperty("--reveal-radius", `${state.radius.toFixed(2)}px`);

      const unsettled =
        Math.abs(state.targetX - state.x) > 0.1 ||
        Math.abs(state.targetY - state.y) > 0.1 ||
        Math.abs(state.targetRadius - state.radius) > 0.1;

      if (unsettled) {
        state.frame = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!state.frame) {
        state.frame = requestAnimationFrame(tick);
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      state.inside = true;
      updateTarget(event.clientX, event.clientY);

      if (state.radius < 0.5) {
        state.x = state.targetX;
        state.y = state.targetY;
      }

      state.targetRadius = getRadius();
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      updateTarget(event.clientX, event.clientY);

      if (!state.inside) {
        state.inside = true;
        if (state.radius < 0.5) {
          state.x = state.targetX;
          state.y = state.targetY;
        }
        state.targetRadius = getRadius();
      }

      schedule();
    };

    const hideReveal = () => {
      state.inside = false;
      state.targetRadius = 0;
      schedule();
    };

    const onViewportChange = () => {
      if (!state.inside) return;
      updateTarget(state.clientX, state.clientY);
      state.targetRadius = getRadius();
      schedule();
    };

    element.addEventListener("pointerenter", onPointerEnter);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", hideReveal);
    element.addEventListener("pointercancel", hideReveal);
    window.addEventListener("blur", hideReveal);
    window.addEventListener("scroll", onViewportChange, { passive: true });

    const resizeObserver = new ResizeObserver(onViewportChange);
    resizeObserver.observe(element);

    return () => {
      if (state.frame) cancelAnimationFrame(state.frame);
      resizeObserver.disconnect();
      element.removeEventListener("pointerenter", onPointerEnter);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", hideReveal);
      element.removeEventListener("pointercancel", hideReveal);
      window.removeEventListener("blur", hideReveal);
      window.removeEventListener("scroll", onViewportChange);
    };
  }, [revealRadius]);

  return (
    <motion.div
      ref={cardRef}
      data-reveal-hover
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "reveal-hover group relative overflow-hidden rounded-lg border border-border bg-card/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30",
        className
      )}
    >
      {/* Spotlight surface reveal layer (feathered radial mask following eased cursor) */}
      <div
        aria-hidden="true"
        className="reveal-hover__image--overlay bg-gradient-to-br from-primary/[0.09] via-accent/[0.05] to-transparent pointer-events-none"
      />
      {children}
    </motion.div>
  );
}

