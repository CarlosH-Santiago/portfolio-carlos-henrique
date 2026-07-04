"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProposalForm() {
  const { t } = useLanguage();
  const f = t.proposalForm;

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const endpoint = "https://formspree.io/f/xjgqadww";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("idle");
      alert("Error sending your proposal. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <h3 className="mb-2 font-mono text-2xl font-bold text-white">{f.title}</h3>
      <p className="mb-6 text-sm text-muted-foreground">{f.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* Name & Company */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.name}</label>
            <input type="text" name="name" required placeholder={f.placeholders.name} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.company}</label>
            <input type="text" name="company" placeholder={f.placeholders.company} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
        </div>

        {/* Email & WhatsApp */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.email}</label>
            <input type="email" name="email" required placeholder={f.placeholders.email} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.whatsapp}</label>
            <input type="tel" name="whatsapp" required placeholder={f.placeholders.whatsapp} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
        </div>

        {/* Project Type & Budget */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.projectType}</label>
            <select name="type" required className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">{f.projectTypeOptions.placeholder}</option>
              <option value="Web App">{f.projectTypeOptions.webApp}</option>
              <option value="Mobile App">{f.projectTypeOptions.mobileApp}</option>
              <option value="Landing Page">{f.projectTypeOptions.landingPage}</option>
              <option value="Other">{f.projectTypeOptions.other}</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.budget}</label>
            <select name="budget" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
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
          <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.deadline}</label>
          <select name="deadline" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="Not defined">{f.deadlineOptions.placeholder}</option>
            <option value="Urgent">{f.deadlineOptions.urgent}</option>
            <option value="Short">{f.deadlineOptions.short}</option>
            <option value="Medium">{f.deadlineOptions.medium}</option>
            <option value="Long">{f.deadlineOptions.long}</option>
            <option value="None">{f.deadlineOptions.none}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">{f.labels.message}</label>
          <textarea name="message" required placeholder={f.placeholders.message} rows={4} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
        </div>

        <button type="submit" disabled={status !== "idle"} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div key="idle" className="flex items-center gap-2">
                <span>{f.submitButton}</span>
                <Send className="h-4 w-4" />
              </motion.div>
            )}
            {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && <CheckCircle className="h-4 w-4" />}
          </AnimatePresence>
        </button>
      </form>
    </div>
  );
}