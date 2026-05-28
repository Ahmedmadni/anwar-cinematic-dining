import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Embers } from "./Embers";
import hero from "@/assets/hero-grill.jpg";
import heroVideo from "@/assets/hero-grill.mp4.asset.json";
import dish1 from "@/assets/dish-mixed-grill.jpg";
import dish2 from "@/assets/dish-tagine.jpg";
import bg2 from "@/assets/bg-grill-2.jpg";
import bg3 from "@/assets/bg-feast.jpg";
import bg4 from "@/assets/bg-dessert.jpg";
import { Flame, BookOpen, MapPin, CalendarHeart } from "lucide-react";
import { usePrefs } from "@/lib/preferences";

const tiles = [
  { to: "/menu", key: "tiles.menu", icon: BookOpen },
  { to: "/reservation", key: "tiles.book", icon: CalendarHeart },
  { to: "/branches", key: "tiles.branches", icon: MapPin },
  { to: "/cart", key: "tiles.delivery", icon: Flame },
] as const;

const VIDEO_SRC = heroVideo.url;
const BACKDROPS = [hero, bg2, bg3, bg4];

export function HeroVideo() {
  const { t } = usePrefs();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((v) => (v + 1) % BACKDROPS.length), 6500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
      {/* Layer 1 — Rotating ken-burns photo stack */}
      <AnimatePresence>
        <motion.img
          key={idx}
          src={BACKDROPS[idx]}
          alt="أنوار المدينة"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.18 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Layer 2 — Cinematic video (loads over photo if available) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={hero}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Vignette + grain */}
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-0 bg-[oklch(0.05_0.01_40/0.45)]" />
      <Embers count={28} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong text-[11px] tracking-[0.35em] text-[var(--gold)] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            مغاغة · المنيا · مفتوح الآن
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong text-[11px] tracking-[0.35em] text-[var(--gold)] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            {t("hero.badge")}
          </div>
          <h1 className="font-poster text-5xl sm:text-7xl md:text-8xl leading-[1.05] mb-6">
            <span className="block shimmer-gold">{t("hero.title")}</span>
            <span className="block text-foreground/95 text-3xl sm:text-4xl md:text-5xl mt-3 font-display">
              {t("hero.subtitle")}
            </span>
          </h1>
          <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-9">
            {t("hero.desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold shadow-gold hover:scale-[1.04] transition-transform"
            >
              <BookOpen className="h-5 w-5" /> {t("hero.cta.menu")}
            </Link>
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass-strong font-bold hover:border-[var(--gold)] transition"
            >
              <CalendarHeart className="h-5 w-5 text-[var(--gold)]" /> {t("hero.cta.book")}
            </Link>
          </div>
        </motion.div>

        {/* Quick tiles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14"
        >
          {tiles.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group glass-strong rounded-2xl p-5 hover:border-[var(--gold)]/70 hover:-translate-y-1 transition-all"
            >
              <t.icon className="h-6 w-6 text-[var(--gold)] mb-3" />
              <div className="font-display text-lg group-hover:text-[var(--gold)] transition-colors">{usePrefs().t(t.key)}</div>
              <div className="text-xs text-muted-foreground mt-1">{usePrefs().t(t.key + ".d")}</div>
            </Link>
          ))}
        </motion.div>

        {/* Decorative side dishes (desktop) */}
        <div className="hidden xl:block absolute right-8 top-1/3 w-56 aspect-[3/4] rounded-3xl overflow-hidden shadow-cinematic rotate-3 border border-[var(--gold)]/30">
          <img src={dish1} className="w-full h-full object-cover ken-burns" alt="مشاوي" />
        </div>
        <div className="hidden xl:block absolute left-8 bottom-24 w-44 aspect-[3/4] rounded-3xl overflow-hidden shadow-cinematic -rotate-3 border border-[var(--gold)]/30">
          <img src={dish2} className="w-full h-full object-cover ken-burns" alt="طاجن" />
        </div>
      </div>
    </section>
  );
}