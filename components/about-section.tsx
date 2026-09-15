"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Route, Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"about" | "journey">("about");

  return (
    <div className="col-span-full mt-12 rounded-2xl border border-white/10 bg-zinc-950/50 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-3/4 bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4 relative z-10 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-mono transition-colors rounded-lg ${
            activeTab === "about"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          }`}
        >
          <User className="h-4 w-4" />
          {t.about.tabs.aboutMe}
        </button>

        <button
          onClick={() => setActiveTab("journey")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-mono transition-colors rounded-lg ${
            activeTab === "journey"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          }`}
        >
          <Route className="h-4 w-4" />
          {t.about.tabs.myJourney}
        </button>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 min-h-[300px]">
        <AnimatePresence mode="wait">

          {/* TAB 1: ABOUT ME */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">{t.about.aboutMe.heading}</h3>

              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base">
                <p>{t.about.aboutMe.bio}</p>

                <div className="flex items-start gap-3 mt-6 p-4 rounded-xl border border-white/5 bg-black/30">
                  <Music className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-400">
                    <strong className="text-zinc-200">{t.about.aboutMe.musicLabel}</strong>{" "}
                    {t.about.aboutMe.musicText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MY JOURNEY (TIMELINE DINÂMICA) */}
          {activeTab === "journey" && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">{t.about.journey.heading}</h3>

              <div className="relative border-l border-white/10 pl-6 md:pl-8 space-y-8 mt-8 before:absolute before:inset-y-0 before:left-[-0.5px] before:w-[1px] before:bg-gradient-to-t before:from-primary before:via-primary/50 before:to-transparent">

                {t.about.journey.items.map((milestone, index) => {
                  const isCurrent = index === t.about.journey.items.length - 1;

                  return (
                    <div key={index} className="relative">
                      <div
                        className={`absolute -left-[30px] md:-left-[38px] top-1.5 h-3 w-3 rounded-full ring-4 ring-zinc-950 transition-colors ${
                          isCurrent
                            ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                            : "bg-zinc-700"
                        }`}
                      />

                      <span className={`text-xs font-mono uppercase tracking-wider ${isCurrent ? "text-primary" : "text-zinc-500"}`}>
                        {milestone.period}
                      </span>

                      <h4 className="text-lg font-bold text-white mt-1">{milestone.title}</h4>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                        {"description" in milestone ? (
                          milestone.description
                        ) : (
                          <>
                            {milestone.descriptionBefore}
                            <strong>{milestone.strongText}</strong>
                            {milestone.descriptionAfter}
                          </>
                        )}
                      </p>
                    </div>
                  );
                })}

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}