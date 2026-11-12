"use client";

import { useEffect, useRef } from "react";

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotionQuery.matches;

    let particlesArray: Particle[] = [];
    let animationFrameId = 0;
    let isRunning = false;

    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150,
      radiusSq: 150 * 150,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };

    const handlePointerOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update() {
        if (this.x > window.innerWidth || this.x < 0) this.speedX = -this.speedX;
        if (this.y > window.innerHeight || this.y < 0) this.speedY = -this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(161, 161, 170, 0.3)";
        ctx.fill();
      }
    }

    function init() {
      const newParticles: Particle[] = [];
      // Limita o teto de partículas em telas grandes e reduz em mobile para poupar GPU/bateria
      const densityDivisor = window.innerWidth < 768 ? 18000 : 14000;
      const numberOfParticles = Math.min(
        90,
        Math.floor((window.innerWidth * window.innerHeight) / densityDivisor)
      );

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 1;
        const x = Math.random() * Math.max(10, window.innerWidth - size * 2) + size;
        const y = Math.random() * Math.max(10, window.innerHeight - size * 2) + size;
        const speedX = (Math.random() - 0.5) * 0.45;
        const speedY = (Math.random() - 0.5) * 0.45;
        newParticles.push(new Particle(x, y, size, speedX, speedY));
      }
      particlesArray = newParticles;
    }

    function renderFrame(shouldUpdate: boolean) {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const currentParticles = particlesArray;
      const len = currentParticles.length;
      const maxConnectDistSq = 10000; // 100 * 100

      for (let i = 0; i < len; i++) {
        const p1 = currentParticles[i];
        if (!p1) continue;

        if (shouldUpdate) p1.update();
        p1.draw();

        for (let j = i + 1; j < len; j++) {
          const p2 = currentParticles[j];
          if (!p2) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(161, 161, 170, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radiusSq) {
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(156, 5, 148, ${0.8 - distance / mouse.radius})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isRunning) return;
      renderFrame(true);
      animationFrameId = requestAnimationFrame(animate);
    }

    function startLoop() {
      if (prefersReducedMotion || document.hidden) {
        renderFrame(false);
        return;
      }
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    function stopLoop() {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
      if (prefersReducedMotion || document.hidden) {
        renderFrame(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        renderFrame(false);
      } else {
        startLoop();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handlePointerOut, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handlePointerOut, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    resizeCanvas();
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handlePointerOut);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[-1] bg-background"
    />
  );
}
