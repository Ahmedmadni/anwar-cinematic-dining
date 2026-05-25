import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroVideo } from "@/components/site/HeroVideo";
import { CATEGORIES } from "@/lib/menu-data";
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
      <section className="relative py-24 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">المنيو</div>
              <h2 className="font-poster text-4xl md:text-5xl">معرض الذوق المصري</h2>
            </div>
            <Link to="/menu" className="hidden md:inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:gap-3 transition-all">
              كل الأصناف <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="gold-divider mb-10" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="font-display text-xl group-hover:text-[var(--gold)] transition-colors">{c.label}</div>
                    <div className="text-xs text-foreground/70 mt-1">{c.tagline}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative py-20 px-5 md:px-8 border-y border-border bg-[oklch(0.07_0.01_40)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { k: "+25", v: "سنة خبرة" },
            { k: "5", v: "فروع نشطة" },
            { k: "+40", v: "صنف بلدي" },
            { k: "30د", v: "متوسط التوصيل" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-poster text-5xl text-gold">{s.k}</div>
              <div className="text-xs tracking-[0.3em] text-muted-foreground mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative py-24 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6 text-[var(--gold)]">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <p className="font-display text-2xl md:text-3xl leading-relaxed">
            «أحسن طعم مشاوي ذقته في الصعيد — الجو فخم والخدمة راقية والطعم زي بيت ستي بالظبط.»
          </p>
          <div className="mt-6 text-sm text-muted-foreground tracking-wider">— أحمد عبد الرحمن · زائر منتظم</div>
        </div>
      </section>
    </main>
  );
}