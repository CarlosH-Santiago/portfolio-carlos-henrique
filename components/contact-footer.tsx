"use client";

import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/CarlosH-Santiago" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-h-santiago/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/caos.dev" },
  { icon: Mail, label: "Email", href: "mailto:carlohsssantiago@gmail.com" },
];

export function ContactFooter() {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="col-span-full flex flex-col items-center gap-6 rounded-lg border border-border bg-card/80 px-6 py-8 backdrop-blur-sm"
    >
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        My Contacts
      </p>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            aria-label={link.label}
          >
            <link.icon className="h-5 w-5" />
            <span className="hidden sm:inline">{link.label}</span>
          </a>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
         &copy; 2026 by Carlos Santiago. Todos os direitos reservados.
      </p>
    </motion.footer>
  );
}
