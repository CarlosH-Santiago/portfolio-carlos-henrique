import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
// @ts-ignore: CSS module import declaration missing in project types
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-carlos-henrique.vercel.app"),
  title: {
    default: "Carlos Henrique Santiago | Engenheiro de Software Full-Stack",
    template: "%s | Carlos Henrique Santiago",
  },
  description:
    "Engenheiro de Software Full-Stack focado em arquiteturas escaláveis, Java (Spring Boot), Node.js, React, Next.js e Kotlin. Fundador do Bahia Dev Hub.",
  keywords: [
    "Carlos Henrique Santiago",
    "Caos Dev",
    "Engenheiro de Software Full-Stack",
    "Full-Stack Software Engineer",
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "TypeScript",
    "Kotlin",
    "Bahia Dev Hub",
  ],
  authors: [{ name: "Carlos Henrique Santiago", url: "https://github.com/CarlosH-Santiago" }],
  creator: "Carlos Henrique Santiago",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    url: "https://portfolio-carlos-henrique.vercel.app",
    title: "Carlos Henrique Santiago | Engenheiro de Software Full-Stack",
    description:
      "Transformando regras de negócio complexas em arquiteturas seguras, escaláveis e interfaces de alta performance.",
    siteName: "Carlos Henrique Santiago Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1347,
        height: 685,
        alt: "Preview do Portfólio de Carlos Henrique Santiago (Caos Dev)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Henrique Santiago | Engenheiro de Software Full-Stack",
    description:
      "Transformando regras de negócio complexas em arquiteturas seguras, escaláveis e interfaces de alta performance.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}


