"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";

export function ProposalForm() {
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

      <h3 className="mb-2 font-mono text-2xl font-bold text-white">Start a Project</h3>
      <p className="mb-6 text-sm text-muted-foreground">Let's build something extraordinary together.</p>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* Name & Company */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Name *</label>
            <input type="text" name="name" required placeholder="John Doe" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Company</label>
            <input type="text" name="company" placeholder="Acme Inc." className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
        </div>

        {/* Email & WhatsApp */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Email *</label>
            <input type="email" name="email" required placeholder="john@company.com" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">WhatsApp *</label>
            <input type="tel" name="whatsapp" required placeholder="+55 (75) 99999-9999" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
          </div>
        </div>

        {/* Project Type & Budget */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Project Type *</label>
            <select name="type" required className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">Select...</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Landing Page">Landing Page</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Budget</label>
            <select name="budget" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="Not defined">Select...</option>
              <option value="<2k">Up to R$ 2.000</option>
              <option value="2k-5k">R$ 2.000 – R$ 5.000</option>
              <option value="5k-10k">R$ 5.000 – R$ 10.000</option>
              <option value="10k-20k">R$ 10.000 – R$ 20.000</option>
              <option value="20k+">Above R$ 20.000</option>
              <option value="To define">To be defined</option>
            </select>
          </div>
        </div>

        {/* Deadline & Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Deadline</label>
          <select name="deadline" className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-zinc-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="Not defined">Select...</option>
            <option value="Urgent">Urgent (up to 2 weeks)</option>
            <option value="Short">Short term (1 month)</option>
            <option value="Medium">Medium term (2-3 months)</option>
            <option value="Long">Long term (3+ months)</option>
            <option value="None">No deadline</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Describe your idea *</label>
          <textarea name="message" required placeholder="What problem are we solving together?" rows={4} className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
        </div>

        <button type="submit" disabled={status !== "idle"} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
           <AnimatePresence mode="wait">
             {status === "idle" && (
               <motion.div key="idle" className="flex items-center gap-2"><span>Send Proposal</span><Send className="h-4 w-4" /></motion.div>
             )}
             {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
             {status === "success" && <CheckCircle className="h-4 w-4" />}
           </AnimatePresence>
        </button>
      </form>
    </div>
  );
}