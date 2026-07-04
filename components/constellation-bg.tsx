"use client";

import { useEffect, useRef } from "react";

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // Configuração do Mouse
    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150, // Distância que a linha alcança o mouse
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Ajusta o tamanho do Canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", resizeCanvas);

    // Classe da Partícula
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
        // CORREÇÃO: Usando window.innerWidth e window.innerHeight para evitar o erro de TypeScript
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

    // Inicializa as partículas
    function init() {
      particlesArray = [];
      // CORREÇÃO: Usando window.innerWidth e window.innerHeight
      const numberOfParticles = (window.innerWidth * window.innerHeight) / 12000;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 1;
        const x = Math.random() * (window.innerWidth - size * 2) + size;
        const y = Math.random() * (window.innerHeight - size * 2) + size;
        const speedX = (Math.random() - 0.5) * 0.5; 
        const speedY = (Math.random() - 0.5) * 0.5;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
      }
    }

    // Loop de Animação
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Conecta as partículas entre si
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { 
            if (ctx) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(161, 161, 170, ${0.2 - distance / 500})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
            }
          }
        }

        // Conecta a partícula ao MOUSE
        if (mouse.x && mouse.y) {
          const dx = particlesArray[i].x - mouse.x;
          const dy = particlesArray[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            if (ctx) {
              ctx.beginPath();
              //rgba(156, 5, 148, 0.8)
              ctx.strokeStyle = `rgba(156, 5, 148, ${0.8 - distance / mouse.radius})`; // Verde interativo
              ctx.lineWidth = 1;
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }
      }
    }

    // Executa o dimensionamento inicial (que já chama o init) e começa a animar
    resizeCanvas(); 
    animate();

    // Limpeza ao sair da página
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] bg-background"
    />
  );
}