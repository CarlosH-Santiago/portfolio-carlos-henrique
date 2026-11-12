"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProposalForm() {
  const { t } = useLanguage();
  const f = t.proposalForm;

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    const formData = new FormData(form);
    const endpoint = "https://formspree.io/f/xjgqadww";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <h3 className="mb-2 font-mono text-2xl font-bold text-white">{f.title}</h3>
      <p className="mb-6 text-sm text-muted-foreground">{f.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* Name & Company */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="proposal-name" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              {f.labels.name}
            </label>
            <input
              id="proposal-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder={f.placeholders.name}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="proposal-company" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              {f.labels.company}
            </label>
            <input
              id="proposal-company"
              type="text"
              name="company"
              autoComplete="organization"
              placeholder={f.placeholders.company}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Email & WhatsApp */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="proposal-email" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              {f.labels.email}
            </label>
            <input
              id="proposal-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={f.placeholders.email}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="proposal-whatsapp" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              {f.labels.whatsapp}
            </label>
            <input
              id="proposal-whatsapp"
              type="tel"
              name="whatsapp"
              autoComplete="tel"
              required
              placeholder={f.placeholders.whatsapp}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Project Type & Budget */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="proposal-type" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              {f.labels.projectType}
            </label>
            <select
              id="proposal-type"
              name="type"
              required
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">{f.projectTypeOptions.placeholder}</option>
              <option value="Web App">{f.projectTypeOptions.webApp}</option>
              <option value="Mobile App">{f.projectTypeOptions.mobileApp}</option>
              <option value="Landing Page">{f.projectTypeOptions.landingPage}</option>
              <option value="Other">{f.projectTypeOptions.other}</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="proposal-budget" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              {f.labels.budget}
            </label>
            <select
              id="proposal-budget"
              name="budget"
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Not defined">{f.budgetOptions.placeholder}</option>
              <option value="<2k">{f.budgetOptions.lt2k}</option>
              <option value="2k-5k">{f.budgetOptions.range2k5k}</option>
              <option value="5k-10k">{f.budgetOptions.range5k10k}</option>
              <option value="10k-20k">{f.budgetOptions.range10k20k}</option>
              <option value="20k+">{f.budgetOptions.gt20k}</option>
              <option value="To define">{f.budgetOptions.toDefine}</option>
            </select>
          </div>
        </div>

        {/* Deadline & Message */}
        <div className="space-y-1.5">
          <label htmlFor="proposal-deadline" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
            {f.labels.deadline}
          </label>
          <select
            id="proposal-deadline"
            name="deadline"
            className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Not defined">{f.deadlineOptions.placeholder}</option>
            <option value="Urgent">{f.deadlineOptions.urgent}</option>
            <option value="Short">{f.deadlineOptions.short}</option>
            <option value="Medium">{f.deadlineOptions.medium}</option>
            <option value="Long">{f.deadlineOptions.long}</option>
            <option value="None">{f.deadlineOptions.none}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="proposal-message" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
            {f.labels.message}
          </label>
          <textarea
            id="proposal-message"
            name="message"
            required
            placeholder={f.placeholders.message}
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        {status === "success" && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-mono text-emerald-400"
          >
            <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{f.successMessage}</span>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-mono text-red-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{f.errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          <AnimatePresence mode="wait">
            {status === "submitting" ? (
              <Loader2 key="loading" className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <motion.div key="idle" className="flex items-center gap-2">
                <span>{f.submitButton}</span>
                <Send className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </form>
    </div>
  );
}
