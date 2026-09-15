"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUp, Github, Linkedin, Mail, Instagram, MessageCircleMore } from "lucide-react";

export function SiteFooter() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { label: "WhatsApp", href: "https://wa.me/557581954000", icon: MessageCircleMore },
    { label: "Instagram", href: "https://www.instagram.com/caos.dev", icon: Instagram },
    { label: "Email", href: "mailto:carlohsssantiago@gmail.com", icon: Mail },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-h-santiago/", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/CarlosH-Santiago", icon: Github },
  ];

  return (
    <footer className="mt-16 col-span-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
      >
        {/* Barra Superior estilo Terminal macOS (Solicitado da Imagem 1) */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-xs sm:text-sm font-bold tracking-tight text-primary">
            {"~/portfolio/carlos-santiago.dev"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Coluna 1: Logo & Bio */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              Engenheiro de Software Full Stack dedicado a criar soluções seguras, escaláveis e com design de alta performance.
            </p>
            {/* Badge Status Live */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 w-fit mt-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              {t.footer.status}
            </div>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              {t.footer.navigationTitle}
            </h3>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="#about" className="hover:text-primary transition-colors w-fit">
                {t.footer.nav.about}
              </a>
              <a href="#projects" className="hover:text-primary transition-colors w-fit">
                {t.footer.nav.projects}
              </a>
              <a href="#ecosystem" className="hover:text-primary transition-colors w-fit">
                {t.footer.nav.ecosystem}
              </a>
              <a href="#contact" className="hover:text-primary transition-colors w-fit">
                {t.footer.nav.contact}
              </a>
            </nav>
          </div>

          {/* Coluna 3: Redes & Contato */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              {t.footer.socialsTitle}
            </h3>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors w-fit"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary/70" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Linha Divisória de Rodapé */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Rodapé Inferior: Copyright & Botão Voltar ao Topo (Hover com texto branco) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>{t.footer.copyright}</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-[11px] text-muted-foreground/80">{t.footer.builtWith}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-400 transition-all hover:bg-emerald-600 hover:border-emerald-500 hover:text-white cursor-pointer shadow-sm hover:shadow-emerald-500/20"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="h-3.5 w-3.5 text-current" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
}