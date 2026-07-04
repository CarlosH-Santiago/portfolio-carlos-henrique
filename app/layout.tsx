import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { VisitorCounter } from "@/components/visitor-counter";
import { SplashScreen } from "@/components/splash-screen";
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
  title: "Carlos Henrique | Full-Stack Developer",
  description:
    "19 years old Full-Stack Developer. Transforming logic into secure, scalable solutions.",
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
    lang="en" 
      className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`} 
      suppressHydrationWarning
      >
      <body className="font-sans antialiased">
        <SplashScreen />
        {children} 
        <VisitorCounter />
      </body>
    </html>
  );
}
