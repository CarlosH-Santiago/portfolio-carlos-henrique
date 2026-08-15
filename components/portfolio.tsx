"use client";

import { Shield, Trophy, Car, Server, Network, Users } from "lucide-react";
import { HeroCard } from "@/components/hero-card";
import { TechMarquee } from "@/components/tech-marquee";
import { CommunityCard } from "@/components/community-card";
import { HobbiesCard } from "@/components/hobbies-card";
import { LocationCard } from "@/components/location-card";
import { GithubCard } from "@/components/github-card";
import { AboutSection } from "@/components/about-section";
import { MapCard } from "@/components/map-card";
import { MusicCard } from "@/components/music-card";
import { ShoppingBag } from "lucide-react";
import { Droplets } from "lucide-react";
import { ExpandableProject, type Project } from "@/components/expandable-project";
import { ContactCard } from "@/components/contact-card";
import { ProposalForm } from "@/components/proposal-form";
import { SiteFooter } from "@/components/site-footer";
import { ConstellationBackground } from "@/components/constellation-bg";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/language-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { MetricsCard } from "./metrics-card";

export function Portfolio() {
  const { t, language } = useLanguage();

  // Lista de projetos com textos vindos do dicionário
  const myProjects: Project[] = [
    {
      id: "ecoquintal",
      title: "EcoQuintal",
      shortDesc: t.projects.items.ecoquintal.shortDesc,
      longDesc: t.projects.items.ecoquintal.longDesc,
      tags: ["React", "UI/UX", "3D Design", "Sustainability"],
      liveUrl: "https://ecoquintal.vercel.app",
      mainImage: "/projects/ecoquintal-main.png",
      gallery: ["/projects/ecoquintal-1.png", "/projects/ecoquintal-2.png"],
      icon: Droplets,
    },
    {
      id: "siconecta",
      title: "SI CONECTA",
      shortDesc: t.projects.items.siconecta.shortDesc,
      longDesc: t.projects.items.siconecta.longDesc,
      tags: ["Web", "Community", "Event Mgmt"],
      githubUrl: "https://github.com/CarlosH-Santiago/SI_CONECTA",
      mainImage: "/projects/siconecta-main.png",
      gallery: ["/projects/siconecta-1.png"],
      icon: Users,
    },
    {
      id: "atelier",
      title: "Atelier E-Commerce",
      shortDesc: t.projects.items.atelier.shortDesc,
      longDesc: t.projects.items.atelier.longDesc,
      tags: ["React", "Node.js", "MongoDB", "Tailwind", "JWT"],
      githubUrl: "https://github.com/CarlosH-Santiago/Trabalho-de-Interfaces",
      liveUrl: "https://atelier-puce-xi.vercel.app",
      mainImage: "/projects/atelier-main.png",
      gallery: ["/projects/atelier-1.png", "/projects/atelier-2.png"],
      icon: ShoppingBag,
    },
    {
      id: "combustion",
      title: "Combustion Analytics",
      shortDesc: t.projects.items.combustion.shortDesc,
      longDesc: t.projects.items.combustion.longDesc,
      tags: ["Kotlin", "Android", "Material Design", "Retrofit"],
      githubUrl: "https://github.com/CarlosH-Santiago/CombustionCarApp_DIO_Cognizant",
      mainImage: "/projects/combustion-main.jpg",
      gallery: ["/projects/combustion-1.jpg", "/projects/combustion-2.jpg"],
      icon: Car,
    },
    {
      id: "api-consumer",
      title: "PokéDex & API Integrator",
      shortDesc: t.projects.items.apiConsumer.shortDesc,
      longDesc: t.projects.items.apiConsumer.longDesc,
      tags: ["Node.js", "Express", "JavaScript", "API Integration"],
      githubUrl: "https://github.com/CarlosH-Santiago/OAT2-Dev-API",
      mainImage: "/projects/api-main-new.png",
      gallery: ["/projects/api-1.png"],
      icon: Network,
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Dot pattern background */}
      <ConstellationBackground />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Header — fica FORA da animação para não piscar ao trocar idioma */}
        <header className="mb-10 flex items-center justify-between">
          <p className="font-mono text-sm text-muted-foreground">
            {"~/portfolio/carlos-santiago.dev"}
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-primary align-middle" />
          </p>

          {/* Seletor de idioma */}
          <LanguageToggle />
        </header>

        {/* Blur Fade global — monta/desmonta toda a página ao trocar o idioma */}
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, filter: "blur(8px)", y: 5 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Bento Grid */}
            <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-4">

              <HeroCard />
              <TechMarquee />
              <MusicCard />

              <AboutSection />

              {/* Projetos renderizados dinamicamente */}
              {myProjects.map((proj, index) => (
                <ExpandableProject
                  key={proj.id}
                  project={proj}
                  className="md:col-span-1"
                  delay={0.1 + index * 0.1}
                />
              ))}

              {/* Demais Cards */}
              <MetricsCard/>
              <CommunityCard />
              <ContactCard />
              <GithubCard />
              <MapCard />
            </div>

            {/* Seção de Contato */}
            <section id="contact" className="mt-20">
              <h2 className="text-2xl font-bold mb-6 font-mono text-foreground">
                {t.projects.sectionHeading}
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                {/* Formulário de Proposta */}
                <div className="w-full flex-1">
                  <ProposalForm />
                </div>
              </div>
            </section>

            <br />

            {/* Rodapé Global */}
            <SiteFooter />

          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}