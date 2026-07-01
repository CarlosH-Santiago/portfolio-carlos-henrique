"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { BentoCard } from "./bento-card";

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
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combina a imagem principal com as da galeria para o carrossel
  const allImages = [project.mainImage, ...project.gallery];

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
        <BentoCard delay={delay} className="h-full w-full flex flex-col justify-between p-5 hover:border-primary/50 transition-all duration-300">
          
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
              
              {/* Ícone flutuando na imagem */}
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
          
          {/* Rodapé do Card (Duplicação Corrigida) */}
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex flex-wrap gap-2">
              {/* Mostramos no máximo 2 tags para não encavalar com o botão Explorar */}
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-md bg-secondary px-2 py-1 text-[10px] sm:text-xs text-muted-foreground font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 transition-all duration-300 md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
              <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">Explorar</span>
              <ArrowRight className="h-3 w-3 text-primary animate-pulse" />
            </div>
          </div>
        </BentoCard>
      </motion.div>

      {/* --- VISÃO MACRO (MODAL EXPANDIDO) --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`card-${project.id}`}
              className="relative z-50 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button
                onClick={toggleModal}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-red-500"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto">
                {/* A imagem grande também tem layoutId para a animação conectar com o card pequeno */}
                <motion.div 
                  layoutId={`image-${project.id}`}
                  className="relative h-64 sm:h-80 w-full bg-secondary cursor-pointer group"
                  onClick={() => setLightboxIndex(0)}
                >
                  <Image src={project.mainImage} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">Ver em tela cheia</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 pointer-events-none">
                    <motion.div layoutId={`header-${project.id}`} className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-md border border-white/10">
                      <project.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.h3 layoutId={`title-${project.id}`} className="font-mono text-2xl sm:text-3xl font-bold text-white">
                      {project.title}
                    </motion.h3>
                  </div>
                </motion.div>

                {/* Conteúdo Detalhado */}
                <div className="p-6 sm:p-8 space-y-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">About the Project</h4>
                    <motion.p layoutId={`desc-${project.id}`} className="text-sm sm:text-base leading-relaxed text-zinc-300">
                      {project.longDesc}
                    </motion.p>
                  </div>

                  {project.gallery.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Gallery</h4>
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
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary/80 hover:text-primary">
                        <Github className="h-4 w-4" />
                        Repository
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                        <ExternalLink className="h-4 w-4" />
                        Live Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CARROSSEL FULLSCREEN (LIGHTBOX) --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
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

            <div className="relative h-[85vh] w-[90vw] sm:w-[80vw]" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full relative"
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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 font-mono text-sm text-white/70 backdrop-blur-md">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}