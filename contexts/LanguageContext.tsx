"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// Passo 1: Importe os novos dicionários aqui
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { es } from "@/dictionaries/es";

type Language = "en" | "pt" | "es" ;

// O tipo Dictionary usa typeof en como tipo canônico.
// Cast seguro: pt tem exatamente a mesma estrutura que en (apenas strings diferem).
type Dictionary = typeof en;

// Mapa genérico que associa cada sigla de idioma ao seu dicionário.
// O duplo cast (unknown → Dictionary) é necessário porque ambos usam `as const`,
// gerando literal types incompatíveis entre si, mas a estrutura é idêntica.
const dictionaryMap: Record<Language, Dictionary> = {
  en: en,
  pt: pt,
  es: es,
};

interface LanguageContextType {
  language: Language;
  t: Dictionary;
  // Passo 3: Função genérica que aceita qualquer Language suportado
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>("pt");

  // Carrega o idioma salvo no localStorage na primeira renderização
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio-lang") as Language;
    if (savedLang && savedLang in dictionaryMap) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  // Função genérica para definir qualquer idioma suportado
  const setLanguage = (newLang: Language) => {
    if (newLang in dictionaryMap) {
      setCurrentLanguage(newLang);
      localStorage.setItem("portfolio-lang", newLang);
    }
  };

  // Dicionário ativo selecionado dinamicamente pelo mapa
  const t = dictionaryMap[language];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}