import { motion } from "framer-motion";
import heroImg from "@/assets/hero-grill.jpg";
import { Embers } from "./Embers";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic background image (acts as 4K hero plate, ready to swap with <video>) */}
      <motion.img
        src={heroImg}
        alt="مشويات أنوار المدينة على الفحم"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.1_0.01_60/0.4)_0%,transparent_30%,oklch(0.08_0.01_60/0.95)_100%)]" />
      <Embers count={28} />

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-xs tracking-[0.4em] text-[var(--gold)]">شركة المدني العالمية للاستثمار</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
        >
          الطعم المصري
          <br />
          <span className="shimmer-gold">بصياغة فاخرة</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          تجربة طعام سينمائية تجمع بين الأصالة المصرية والفخامة العصرية —
          من قلب مغاغة، المنيا.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#order"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-[hsl(0_0%_8%)] font-bold shadow-gold hover:scale-105 transition-transform"
          >
            اطلب الآن
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-foreground hover:border-[var(--gold)]/40 transition-all"
          >
            استكشف المنيو
          </a>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all"
          >
            احجز طاولتك
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-[0.3em] text-foreground/50"
        >
          <span>اكتشف</span>
          <span className="h-12 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
