import { motion } from "framer-motion";



export function SiteFooter() {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden col-span-full flex flex-col items-center gap-6 bg-card/80 px-6 py-8 backdrop-blur-sm"
      >

      <footer className="col-span-full text-center py-8 border-t border-white/5 mt-8">
      <p className="font-mono text-xs text-muted-foreground">
         &copy; 2026 by Carlos Santiago. Todos os direitos reservados.
      </p>
    </footer>
    </motion.footer>
  );
}