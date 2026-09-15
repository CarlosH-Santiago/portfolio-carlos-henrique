"use client";

import { BentoCard } from "@/components/bento-card";
import { Github, Linkedin, Mail, Instagram, MessageSquare, MessageCircleMore } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const links = [
  { icon: MessageCircleMore, label: "Whatsapp", href: "https://wa.me/557581954000" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/caos.dev" },
  { icon: Mail, label: "Email", href: "mailto:carlohsssantiago@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-h-santiago/" },
  { icon: Github, label: "GitHub", href: "https://github.com/CarlosH-Santiago" },
];

export function ContactCard() {
  const { t } = useLanguage();

  return (
    <BentoCard className="rounded-2xl border border-white/10  bg-zinc-950/40 backdrop-blur-md  p-6 sm:p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-mono text-lg font-bold text-foreground">{t.contact.title}</h3>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary group"
          >
            <div className="p-1.5 rounded-md bg-secondary/50 group-hover:bg-primary/10 transition-colors">
              <link.icon className="h-4 w-4" />
            </div>
            {link.label}
          </a>
        ))}
      </div>
    </BentoCard>
  );
}