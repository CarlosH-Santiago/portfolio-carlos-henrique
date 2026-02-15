"use client";

import { Download, Mail } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { TypewriterText } from "@/components/typewriter-text";
import Image from "next/image";

export function HeroCard() {
  return (
    <BentoCard
      className="md:col-span-2 md:row-span-2 flex flex-col justify-center"
      delay={0}
    >
      <div className="flex flex-col items-start gap-6">
        <div className="relative h-24 w-24 rounded-full border-2 border-primary/50 overflow-hidden">
          <Image
            src="/profile.png" 
            alt="Carlos Henrique"
            fill 
            className="object-cover" 
            priority 
          />
        </div>

        <div className="space-y-3">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            <TypewriterText text="<Caos Dev>" />
          </h1>
          <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            <TypewriterText text="<Carlos Henrique Santiago/>" />
          </h1>
          <p className="font-mono text-sm font-medium text-accent">
            {"Full Stack Software Engineer"}
          </p>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:text-base">
          {"19 years old. Transforming logic into secure, scalable solutions. Let's build your brand update."}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/CV-Carlos-Santiago.pdf" download="CV_Carlos_Henrique.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:border-primary/30"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </div>
      </div>
    </BentoCard>
  );
}
