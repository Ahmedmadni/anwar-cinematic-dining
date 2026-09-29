import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Embers } from "./Embers";
import heroLqip from "@/assets/hero-grill.jpg?w=48&quality=40&blur=25&format=webp";
import hero from "@/assets/hero-grill.jpg?w=1600&quality=70&format=webp";
import heroMobile from "@/assets/hero-grill.jpg?w=900&quality=68&format=webp";
import heroVideo from "@/assets/hero-grill.mp4.asset.json";
import dish1 from "@/assets/dish-mixed-grill.jpg?w=560&quality=72&format=webp";
import dish2 from "@/assets/dish-tagine.jpg?w=440&quality=72&format=webp";
import bg2 from "@/assets/bg-grill-2.jpg?w=1600&quality=68&format=webp";
import bg3 from "@/assets/bg-feast.jpg?w=1600&quality=68&format=webp";
import bg4 from "@/assets/bg-dessert.jpg?w=1600&quality=68&format=webp";
import bg2m from "@/assets/bg-grill-2.jpg?w=900&quality=66&format=webp";
import bg3m from "@/assets/bg-feast.jpg?w=900&quality=66&format=webp";
import bg4m from "@/assets/bg-dessert.jpg?w=900&quality=66&format=webp";
import { Flame, BookOpen, MapPin, CalendarHeart } from "lucide-react";
import { usePrefs } from "@/lib/preferences";

const tiles = [
  { to: "/menu", key: "tiles.menu", icon: BookOpen },
  { to: "/reservation", key: "tiles.book", icon: CalendarHeart },
  { to: "/branches", key: "tiles.branches", icon: MapPin },
  { to: "/cart", key: "tiles.delivery", icon: Flame },
] as const;

const VIDEO_SRC = heroVideo.url;
const BACKDROPS_DESKTOP = [hero, bg2, bg3, bg4];
const BACKDROPS_MOBILE = [heroMobile, bg2m, bg3m, bg4m];

export function HeroVideo() {
  const { t } = usePrefs();
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [videoAllowed, setVideoAllowed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const isSlow = !!saveData?.saveData || (saveData?.effectiveType ?? "").includes("2g");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);

    // Video only on desktop, when user hasn't opted out of motion, and network is OK.
    setVideoAllowed(!mq.matches && !rm.matches && !isSlow);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const backdrops = isMobile ? BACKDROPS_MOBILE : BACKDROPS_DESKTOP;

  useEffect(() => {
    if (!heroReady) return;
    const i = setInterval(
      () => setIdx((v) => (v + 1) % backdrops.length),
      isMobile ? 8500 : 6500,
    );
    return () => clearInterval(i);
  }, [heroReady, isMobile, backdrops.length]);

  return (
    <section className="cinematic-hero relative min-h-[88svh] w-full overflow-hidden flex items-center justify-center">
      {/* Layer 0 — Instant LQIP (tiny blurred preview, ships in initial HTML) */}
      <img
        src={heroLqip}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl"
      />

      {/* Layer 1 — Rotating ken-burns photo stack (progressive enhancement) */}
      <AnimatePresence>
        <motion.img
          key={idx}
          src={backdrops[idx]}
          alt="أنوار المدينة"
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={idx === 0 ? "high" : "low"}
          onLoad={() => setHeroReady(true)}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.18 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Layer 2 — Cinematic video: desktop + full motion + non-slow network only.
          Skipping on mobile saves ~19MB of transfer. */}
      {videoAllowed && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={hero}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Vignette + grain */}
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-0 bg-[oklch(0.05_0.01_40/0.45)]" />
      <Embers count={28} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-24 sm:pb-14 md:pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-strong text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-[var(--gold)] mb-5 sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            {t("hero.badge")}
          </div>
          <h1 className="font-poster text-[2.25rem] xs:text-4xl sm:text-6xl md:text-7xl leading-[1.05] mb-5 sm:mb-6">
            <span className="block shimmer-gold">{t("hero.title")}</span>
            <span className="block text-[var(--on-image)] text-xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 font-display">
              {t("hero.subtitle")}
            </span>
          </h1>
          <p className="text-[var(--on-image-muted)] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-9 px-2">
            {t("hero.desc")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-gold text-[var(--on-gold)] font-bold shadow-gold hover:scale-[1.04] transition-transform"
            >
              <BookOpen className="h-5 w-5" /> {t("hero.cta.menu")}
            </Link>
            <Link
              to="/reservation"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl glass-strong font-bold hover:border-[var(--gold)] transition"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 sm:mt-14"
        >
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link
                key={tile.to}
                to={tile.to}
                className="group glass-strong rounded-2xl p-4 sm:p-5 hover:border-[var(--gold)]/70 hover:-translate-y-1 transition-all"
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--gold)] mb-2 sm:mb-3" />
                <div className="font-display text-base sm:text-lg group-hover:text-[var(--gold)] transition-colors">{t(tile.key)}</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">{t(tile.key + ".d")}</div>
              </Link>
            );
          })}
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