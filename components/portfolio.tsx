"use client";

import { Shield, Trophy, Car, Server, Network, Users } from "lucide-react";
import { HeroCard } from "@/components/hero-card";
import { TechMarquee } from "@/components/tech-marquee";
import { CommunityCard } from "@/components/community-card";
import { HobbiesCard } from "@/components/hobbies-card";
import { LocationCard } from "@/components/location-card";
import { GithubCard } from "@/components/github-card";
import { ContactFooter } from "@/components/contact-footer";
import { MapCard } from "@/components/map-card";
import { MusicCard } from "@/components/music-card";
import { ShoppingBag } from "lucide-react";
import { Droplets } from 'lucide-react';
import { ExpandableProject, type Project } from "@/components/expandable-project";
import { ContactCard } from "@/components/contact-card";
import { ProposalForm } from "@/components/proposal-form";
import { SiteFooter } from "@/components/site-footer";


// 1. A LISTA DE PROJETOS
const myProjects: Project[] = [
    {
    id: "ecoquintal",
    title: "EcoQuintal",
    shortDesc: "Smart domestic water reuse system and interactive guide.",
    longDesc: "An eco-tech platform developed to educate and guide users on reusing greywater for domestic irrigation. Built with a focus on premium UI/UX, featuring interactive 3D elements, a custom dark/light theme, and a step-by-step interactive timeline to make sustainable engineering accessible to everyone.",
    tags: ["React", "UI/UX", "3D Design", "Sustainability"], // Altere as tags conforme as techs que usou
    liveUrl: "https://ecoquintal.vercel.app",
    mainImage: "/projects/ecoquintal-main.png", 
    gallery: ["/projects/ecoquintal-1.png", "/projects/ecoquintal-2.png"],
    icon: Droplets, // Sugestão: importe o ícone Droplet do lucide-react para combinar com água
  },
      {
    id: "siconecta",
    title: "SI CONECTA",
    shortDesc: "Digital ecosystem bridging Information Systems students and academic events.",
    longDesc: "A community-focused web platform created for the university context. It centralizes academic events, workshops, and student networking, acting as the main hub for the Information Systems degree activities.",
    tags: ["Web", "Community", "Event Mgmt"],
    githubUrl: "https://github.com/CarlosH-Santiago/SI_CONECTA",
    mainImage: "/projects/siconecta-main.png",
    gallery: ["/projects/siconecta-1.png"],
    icon: Users,
  },
  {
    id: "atelier",
    title: "Atelier E-Commerce",
    shortDesc: "High-end fashion e-commerce with custom CMS and RBAC authentication.",
    longDesc: "A sophisticated e-commerce platform built as a Modular Monolith. The front-end delivers a premium, minimalist shopping experience using React and Framer Motion. The back-end, powered by Node.js and MongoDB, features a fully functional custom CMS for inventory management, protected by JWT and Role-Based Access Control (RBAC) for administrators.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind", "JWT"],
    githubUrl: "https://github.com/CarlosH-Santiago/Trabalho-de-Interfaces", // Link do Front
    liveUrl: "https://atelier-puce-xi.vercel.app", 
    mainImage: "/projects/atelier-main.png", 
    gallery: ["/projects/atelier-1.png", "/projects/atelier-2.png"], 
    icon: ShoppingBag, 
  },
  {
    id: "combustion",
    title: "Combustion Analytics",
    shortDesc: "Mobile simulation app for automotive combustion analysis.",
    longDesc: "Built during the DIO Cognizant Bootcamp, this application simulates automotive combustion metrics. It features a robust Kotlin backend for Android, focusing on performance calculations and data visualization for mechanics and enthusiasts.",
    tags: ["Kotlin", "Android", "Material Design", "Retrofit", ],
    githubUrl: "https://github.com/CarlosH-Santiago/CombustionCarApp_DIO_Cognizant",
    mainImage: "/projects/combustion-main.jpg", 
    gallery: ["/projects/combustion-1.jpg", "/projects/combustion-2.jpg"],
    icon: Car,
  },
{
    id: "api-consumer",
    title: "PokéDex & API Integrator",
    shortDesc: "Mobile-first web application demonstrating simultaneous REST API consumption.",
    longDesc: "An academic project developed to master HTTP requests and third-party integrations. It operates on a Node.js/Express backend and uses vanilla JavaScript (Fetch API) to simultaneously consume the PokéAPI for real-time data fetching (GET) and the ReqRes API to simulate a complete CRUD cycle (POST, PUT, DELETE) for a trainer profile.",
    tags: ["Node.js", "Express", "JavaScript", "API Integration"],
    githubUrl: "https://github.com/CarlosH-Santiago/OAT2-Dev-API",
    mainImage: "/projects/api-main.png", // Tire um print do PokéDex rodando no navegador
    gallery: ["/projects/api-1.png"], // Tire um print do console/network ou do form de cadastro
    icon: Network, // Importe o ícone Network do lucide-react, combina perfeitamente com integrações!
  },

// Vou organizar as imagens depois
  // {
  //   id: "tcp-drive",
  //   title: "TCP File Drive",
  //   shortDesc: "High-performance file transfer system built from scratch using raw Java Sockets.",
  //   longDesc: "An advanced networking project demonstrating deep understanding of TCP/IP protocols. Built entirely in Java using raw Sockets to ensure high-performance and reliable file transfers across networks without relying on high-level libraries.",
  //   tags: ["Java", "Networking", "TCP/IP"],
  //   githubUrl: "https://github.com/CarlosH-Santiago/Drive-de-Arquivos-com-Sockets-TCP-em-Java",
  //   mainImage: "/projects/tcp-main.png",
  //   gallery: ["/projects/tcp-1.png"],
  //   icon: Network,
  // },

];

export function Portfolio() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <header className="mb-10">
          <p className="font-mono text-sm text-muted-foreground">
            {"~/portfolio/carlos-santiago.dev"}
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-4">
          
          <HeroCard />
          <TechMarquee />
          <MusicCard />

          {/* 2. PROJETOS RENDERIZADOS DINAMICAMENTE */}
          {myProjects.map((proj, index) => (
            <ExpandableProject 
              key={proj.id} 
              project={proj} 
              className="md:col-span-1" 
              delay={0.1 + (index * 0.1)} 
            />
          ))}

          {/* Demais Cards */}
          <HobbiesCard />
          <CommunityCard />
          <ContactCard />
          <GithubCard />
          <MapCard />
        </div>

        {/* Seção de Contato Nova (Layout Flex Dinâmico) */}
      <section id="contact" className="mt-20">
        <h2 className="text-2xl font-bold mb-6 font-mono text-foreground">Turn your problem into a sophisticated tech solution.</h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-stretch">

          {/* Formulário de Proposta (Ocupa TODO O RESTO do espaço disponível) */}
          <div className="w-full flex-1">
            <ProposalForm />
          </div>
          
        </div>
      </section>

      <br />

        {/* Rodapé Global */}
        <SiteFooter />
          
      </div>
    </main>
  );
}