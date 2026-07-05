"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { BentoCard } from "./bento-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { createPortal } from "react-dom"; // IMPORTANTE: O teleportador do React!

export type Project = {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  mainImage: string;
  gallery: string[];
  icon: any;
};

interface ExpandableProjectProps {
  project: Project;
  className?: string;
  delay?: number;
}

export function ExpandableProject({ project, className, delay = 0 }: ExpandableProjectProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Combina a imagem principal com as da galeria para o carrossel
  const allImages = [project.mainImage, ...project.gallery];

  // Garante que o Portal só será criado no Client-side (evita erro do Next.js)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Controle de rolagem do body mais seguro usando useEffect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setLightboxIndex(null);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allImages.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <>
      {/* --- VISÃO COMUM (BENTO GRID COM IMAGEM DE PRÉ-VISUALIZAÇÃO) --- */}
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={toggleModal}
        className={`cursor-pointer group flex h-full flex-col ${className}`}
      >
        <BentoCard delay={delay} className="rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden h-full w-full flex flex-col justify-between hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300">
          <div className="flex flex-col flex-grow">
            {/* Banner de Imagem Embutido */}
            <motion.div layoutId={`image-${project.id}`} className="relative mb-4 h-32 w-full overflow-hidden rounded-lg bg-secondary">
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <motion.div layoutId={`header-${project.id}`} className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                <project.icon className="h-4 w-4 text-primary" />
              </motion.div>
            </motion.div>

            {/* Textos */}
            <div>
              <motion.h3 layoutId={`title-${project.id}`} className="mb-1 font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </motion.h3>
              <motion.p layoutId={`desc-${project.id}`} className="text-sm text-muted-foreground line-clamp-2">
                {project.shortDesc}
              </motion.p>
            </div>
          </div>

          {/* Rodapé do Card */}
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[10px] sm:text-xs text-muted-foreground font-medium backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 transition-all duration-300 md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">{t.projects.explore}</span>
              <ArrowRight className="h-3 w-3 text-primary animate-pulse" />
            </div>
          </div>
        </BentoCard>
      </motion.div>

      {/* --- MODAIS COM REACT PORTAL (Garante fixação na câmera/tela) --- */}
      {mounted && createPortal(
        <>
          {/* VISÃO MACRO (MODAL EXPANDIDO) */}
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={toggleModal}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                  layoutId={`card-${project.id}`}
                  className="relative z-50 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[90dvh]"
                >
                  <button
                    onClick={toggleModal}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-red-500 border border-white/10"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
                    <motion.div
                      layoutId={`image-${project.id}`}
                      className="relative h-64 sm:h-80 w-full bg-secondary cursor-pointer group shrink-0"
                      onClick={() => setLightboxIndex(0)}
                    >
                      <Image src={project.mainImage} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">{t.projects.viewFullscreen}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent pointer-events-none" />

                      <div className="absolute bottom-6 left-6 pointer-events-none">
                        <motion.div layoutId={`header-${project.id}`} className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-black/50 backdrop-blur-md border border-white/10">
                          <project.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <motion.h3 layoutId={`title-${project.id}`} className="font-mono text-2xl sm:text-3xl font-bold text-white shadow-black drop-shadow-lg">
                          {project.title}
                        </motion.h3>
                      </div>
                    </motion.div>

                    <div className="p-6 sm:p-8 space-y-8">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">{t.projects.aboutProject}</h4>
                        <motion.p layoutId={`desc-${project.id}`} className="text-sm sm:text-base leading-relaxed text-zinc-300">
                          {project.longDesc}
                        </motion.p>
                      </div>

                      {project.gallery.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">{t.projects.gallery}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {project.gallery.map((img, i) => (
                              <div
                                key={i}
                                onClick={() => setLightboxIndex(i + 1)}
                                className="relative aspect-video rounded-lg overflow-hidden border border-white/5 bg-secondary cursor-pointer group"
                              >
                                <Image src={img} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-primary backdrop-blur-md">
                            <Github className="h-4 w-4" />
                            {t.projects.repository}
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md bg-primary/90 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-primary shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            <ExternalLink className="h-4 w-4" />
                            {t.projects.livePreview}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* CARROSSEL FULLSCREEN (LIGHTBOX) */}
          <AnimatePresence>
            {lightboxIndex !== null && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxIndex(null)}
                  className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                />

                <button
                  className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  onClick={() => setLightboxIndex(null)}
                >
                  <X className="h-6 w-6" />
                </button>

                {allImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 sm:left-10 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                      className="absolute right-4 sm:right-10 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  </>
                )}

                <div className="relative h-[85vh] w-[90vw] sm:w-[80vw] z-50 pointer-events-none">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="h-full w-full relative pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={allImages[lightboxIndex]}
                      alt="Fullscreen view"
                      fill
                      className="object-contain"
                      quality={100}
                    />
                  </motion.div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 font-mono text-sm text-white/70 backdrop-blur-md z-50">
                  {lightboxIndex + 1} / {allImages.length}
                </div>
              </div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
}