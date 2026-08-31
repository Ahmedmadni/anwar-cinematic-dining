import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroVideo } from "@/components/site/HeroVideo";
import { CATEGORIES, ALL_DISHES } from "@/lib/menu-data";

const SIGNATURE = ["g1", "t1", "k1", "d1"]
  .map((id) => ALL_DISHES.find((d) => d.id === id)!)
  .filter(Boolean);

import { ArrowLeft, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أنوار المدينة | تجربة طعام مصرية سينمائية — مغاغة" },
      {
        name: "description",
        content: "مطعم أنوار المدينة في مغاغة، المنيا. مشويات على الفحم، طواجن بلدي، كشري أصلي وحلويات شرقية.",
      },
      { property: "og:title", content: "أنوار المدينة | الطعم المصري بصياغة سينمائية" },
      { property: "og:description", content: "احجز طاولتك أو اطلب توصيل خلال ٣٠ دقيقة." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <HeroVideo />

      {/* Categories teaser */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] text-[var(--gold)] mb-2 sm:mb-3">المنيو</div>
              <h2 className="font-poster text-2xl sm:text-4xl md:text-5xl">معرض الذوق المصري</h2>
            </div>
            <Link to="/menu" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:gap-3 transition-all">
              كل الأصناف <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="gold-divider mb-8 sm:mb-10" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  to="/menu"
                  hash={c.id}
                  className="group block relative overflow-hidden rounded-3xl bg-card border border-border hover:border-[var(--gold)]/60 transition-all"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={c.dishes[0].img} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.01_40)] via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5">
                    <div className="font-display text-sm sm:text-xl group-hover:text-[var(--gold)] transition-colors">{c.label}</div>
                    <div className="text-[10px] sm:text-xs text-foreground/70 mt-1 line-clamp-2">{c.tagline}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature dishes */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] text-[var(--gold)] mb-2 sm:mb-3">التوقيع</div>
            <h2 className="font-poster text-2xl sm:text-4xl md:text-5xl">أطباق لا تُفوَّت</h2>
            <div className="gold-divider mt-6 max-w-md mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {SIGNATURE.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  to="/menu"
                  className="group block rounded-3xl overflow-hidden bg-card border border-border hover:border-[var(--gold)]/60 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={d.img}
                      alt={d.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                    {d.tag && (
                      <span className="absolute top-2 start-2 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold text-[oklch(0.1_0.012_40)]">
                        {d.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="font-display text-sm sm:text-base line-clamp-1 group-hover:text-[var(--gold)] transition-colors">{d.name}</div>
                    <div className="mt-1 text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{d.desc}</div>
                    <div className="mt-2 font-poster text-base sm:text-lg text-gold tabular-nums">{d.price} ج.م</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Trust strip */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-5 md:px-8 border-y border-border bg-[oklch(0.07_0.01_40)] [&_*]:!text-[oklch(0.74_0.03_75)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center">
          {[
            { k: "+25", v: "سنة خبرة" },
            { k: "5", v: "فروع نشطة" },
            { k: "+40", v: "صنف بلدي" },
            { k: "30د", v: "متوسط التوصيل" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-poster text-3xl sm:text-5xl text-gold">{s.k}</div>
              <div className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-5 sm:mb-6 text-[var(--gold)]">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />)}
          </div>
          <p className="font-display text-lg sm:text-2xl md:text-3xl leading-relaxed">
            «أحسن طعم مشاوي ذقته في الصعيد — الجو فخم والخدمة راقية والطعم زي بيت ستي بالظبط.»
          </p>
          <div className="mt-5 sm:mt-6 text-xs sm:text-sm text-muted-foreground tracking-wider">— أحمد عبد الرحمن · زائر منتظم</div>
        </div>
      </section>
    </main>
  );
}