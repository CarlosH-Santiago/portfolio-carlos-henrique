"use client";

import { Shield, Trophy } from "lucide-react";
import { Car, Server, Network, Users } from "lucide-react";
import Link from "next/link";
import { HeroCard } from "@/components/hero-card";
import { TechMarquee } from "@/components/tech-marquee";
import { ProjectCard } from "@/components/project-card";
import { CommunityCard } from "@/components/community-card";
import { HobbiesCard } from "@/components/hobbies-card";
import { LocationCard } from "@/components/location-card";
import { GithubCard } from "@/components/github-card";
import { ContactFooter } from "@/components/contact-footer";
import { MapCard } from "@/components/map-card";
import { MusicCard } from "@/components/music-card";

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
            {"~/portfolio"}
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-4">
          {/* Row 1-2: Hero (2x2) + Tech Marquee (2x1) stacked with projects */}
          <HeroCard />
          <TechMarquee />

          {/* Projects */}
          {/* Projeto 1: App de Carros (Combustion) */}
          <Link href="https://github.com/CarlosH-Santiago/CombustionCarApp_DIO_Cognizant" target="_blank">
            <ProjectCard
              icon={Car}
              title="Combustion Analytics"
              description="Mobile simulation app for automotive combustion analysis built with Kotlin."
              tags={["Kotlin", "Android", "Simulation"]}
              delay={0.1}
            />
          </Link>

          {/* Projeto 2: API (Backend) */}
          <Link href="https://github.com/CarlosH-Santiago/OAT2-Dev-API" target="_blank">
            <ProjectCard
              icon={Server}
              title="Dev Management API"
              description="Scalable RESTful API architecture for developer resource management."
              tags={["JavaScript", "Node.js", "RESTful API"]}
              delay={0.2}
            />
          </Link>

          {/* Projeto 3: Sockets TCP (Hard Skill) */}
          <Link href="https://github.com/CarlosH-Santiago/Drive-de-Arquivos-com-Sockets-TCP-em-Java" target="_blank">
            <ProjectCard
              icon={Network}
              title="TCP File Drive"
              description="High-performance file transfer system built from scratch using raw Java Sockets."
              tags={["Java", "Networking", "TCP/IP"]}
              delay={0.3}
            />
          </Link>

          {/* Projeto 4: SI Conecta (Comunidade) */}
          <Link href="https://github.com/CarlosH-Santiago/SI_CONECTA" target="_blank">
            <ProjectCard
              icon={Users}
              title="SI CONECTA"
              description="Digital ecosystem bridging Information Systems students and academic events."
              tags={["Web", "Community", "Event Mgmt"]}
              delay={0.4}
            />
          </Link>

          {/* Community (1x2) + Hobbies + Location */}
          <CommunityCard />
          <HobbiesCard />
          <LocationCard />

          <MapCard />
          <MusicCard />

          {/* Github Activity (2x1) */}
          <GithubCard />

          {/* Contact Footer */}
          <ContactFooter />
        </div>
      </div>
    </main>
  );
}
