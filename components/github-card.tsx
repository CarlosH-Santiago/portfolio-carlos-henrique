"use client";

import { useEffect, useState, useMemo } from "react";
import { BentoCard } from "@/components/bento-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, ExternalLink, GitBranch, Users, Flame } from "lucide-react";

interface GithubStats {
  public_repos: number;
  followers: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const WEEKS_TO_SHOW = 24;
const DAYS_PER_WEEK = 7;

// Fallback determinístico caso o usuário esteja offline na primeira renderização
function buildFallbackWeeks(): ContributionDay[][] {
  const pattern = [
    0, 1, 2, 0, 3, 1, 0, 2, 4, 3, 1, 0, 2, 1, 0, 0, 2, 3, 4, 2, 1, 0, 1, 3,
  ];
  return Array.from({ length: WEEKS_TO_SHOW }, (_, w) =>
    Array.from({ length: DAYS_PER_WEEK }, (__, d) => {
      const level = ((pattern[(w + d * 3) % pattern.length] + ((w * d) % 2)) %
        5) as 0 | 1 | 2 | 3 | 4;
      return {
        date: "",
        count: level * 2,
        level,
      };
    })
  );
}

export function GithubCard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<GithubStats>({
    public_repos: 44,
    followers: 35,
  });
  const [totalContributions, setTotalContributions] = useState<number>(532);
  const [weeks, setWeeks] = useState<ContributionDay[][]>(() =>
    buildFallbackWeeks()
  );
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // 1. Perfil oficial do GitHub (repositórios públicos e seguidores)
    fetch("https://api.github.com/users/CarlosH-Santiago", {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.public_repos === "number") {
          setStats({
            public_repos: data.public_repos,
            followers: data.followers ?? 35,
          });
        }
      })
      .catch(() => {});

    // 2. Histórico real de contribuições do último ano
    fetch(
      "https://github-contributions-api.jogruber.de/v4/CarlosH-Santiago?y=last",
      {
        signal: controller.signal,
      }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.contributions)) {
          if (typeof data.total?.lastYear === "number") {
            setTotalContributions(data.total.lastYear);
          }

          const totalDaysNeeded = WEEKS_TO_SHOW * DAYS_PER_WEEK;
          const recent: ContributionDay[] = data.contributions.slice(
            -totalDaysNeeded
          );

          const grouped: ContributionDay[][] = [];
          for (let i = 0; i < recent.length; i += DAYS_PER_WEEK) {
            grouped.push(recent.slice(i, i + DAYS_PER_WEEK));
          }
          if (grouped.length > 0) {
            setWeeks(grouped);
          }
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const levelStyles: Record<number, string> = useMemo(
    () => ({
      0: "bg-white/[0.05] border border-white/[0.04] hover:border-white/20",
      1: "bg-emerald-500/25 border border-emerald-500/20",
      2: "bg-emerald-500/50 border border-emerald-500/30",
      3: "bg-emerald-400/80 border border-emerald-400/50 shadow-[0_0_6px_rgba(52,211,153,0.25)]",
      4: "bg-emerald-400 border border-emerald-300/60 shadow-[0_0_10px_rgba(52,211,153,0.55)]",
    }),
    []
  );

  return (
    <BentoCard
      className="rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-7 shadow-2xl relative overflow-hidden md:col-span-2 flex flex-col justify-between gap-5"
      delay={0.2}
    >
      {/* Brilho sutil de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-emerald-500/[0.07] blur-3xl"
      />

      {/* Topo: Identidade + Badges de Métricas Reais */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
            <Github className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                {t.github.label}
              </h3>
              <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                @CarlosH-Santiago
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t.github.tagline}
            </p>
          </div>
        </div>

        {/* KPI Pills Sofisticados */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-mono backdrop-blur-sm">
            <Flame className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            <span className="font-bold text-white">{totalContributions}</span>
            <span className="text-[11px] text-muted-foreground">
              {t.github.contributions}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-mono backdrop-blur-sm">
            <GitBranch className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="font-bold text-white">{stats.public_repos}</span>
            <span className="text-[11px] text-muted-foreground">
              {t.github.repos}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-mono backdrop-blur-sm">
            <Users className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="font-bold text-white">{stats.followers}</span>
            <span className="text-[11px] text-muted-foreground hidden xl:inline">
              {t.github.followers}
            </span>
          </div>

          <a
            href="https://github.com/CarlosH-Santiago"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.github.viewProfile}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Matriz Nativa Dark-Mode de Contribuições Reais (Sem Scrollbar Horizontal) */}
      <div
        role="img"
        aria-label={t.github.contributionsAlt}
        onMouseLeave={() => setHoveredDay(null)}
        className="relative z-10 rounded-xl border border-white/[0.06] bg-black/40 p-3.5 sm:p-4"
      >
        <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1 sm:gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 sm:gap-1.5">
              {week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  onMouseEnter={() => day.date && setHoveredDay(day)}
                  className={`aspect-square w-full rounded-[3px] sm:rounded-[4px] transition-transform duration-200 hover:scale-125 ${
                    levelStyles[day.level] ?? levelStyles[0]
                  }`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Barra Inferior de Status / Legenda */}
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2.5 text-[11px] font-mono text-muted-foreground">
          <span className="truncate">
            {hoveredDay && hoveredDay.date
              ? `${hoveredDay.date} — ${hoveredDay.count} ${t.github.contributions.toLowerCase()}`
              : "github.com/CarlosH-Santiago"}
          </span>

          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="text-[10px] text-zinc-500">{t.github.less}</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className={`h-2.5 w-2.5 rounded-[2px] ${levelStyles[lvl]}`}
              />
            ))}
            <span className="text-[10px] text-zinc-500">{t.github.more}</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
