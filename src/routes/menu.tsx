import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/menu-data";
import { useCart } from "@/lib/cart";
import { Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "المنيو | أنوار المدينة — كل الأصناف" },
      { name: "description", content: "تصفح قائمة طعام أنوار المدينة: مشويات، طواجن، كشري، وحلويات شرقية." },
      { property: "og:title", content: "منيو أنوار المدينة" },
      { property: "og:description", content: "أكثر من ٤٠ صنف بلدي بنكهة سينمائية." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const { add, count } = useCart();

  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">القائمة الكاملة</div>
          <h1 className="font-poster text-5xl md:text-6xl mb-3">منيو أنوار المدينة</h1>
          <div className="gold-divider w-40 mx-auto mt-5" />
        </div>

        {/* Sticky category tabs */}
        <div className="sticky top-24 z-30 -mx-5 px-5 md:mx-0 md:px-0 mb-10">
          <div className="glass-strong rounded-2xl p-2 flex gap-2 overflow-x-auto scroll-x-snap">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={() => setActive(c.id)}
                className={`snap-item shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === c.id
                    ? "bg-gradient-gold text-[oklch(0.1_0.012_40)] shadow-gold"
                    : "text-foreground/80 hover:text-[var(--gold)]"
                }`}
              >
                {c.label}
              </a>
            ))}
            <Link
              to="/cart"
              className="snap-item shrink-0 mr-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm hover:border-[var(--gold)] transition"
            >
              <ShoppingBag className="h-4 w-4 text-[var(--gold)]" /> السلة ({count})
            </Link>
          </div>
        </div>

        {/* Sections per category */}
        <div className="space-y-24">
          {CATEGORIES.map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-44">
              <div className="flex items-end justify-between mb-8 border-b border-border pb-5">
                <div>
                  <div className="text-xs tracking-[0.35em] text-[var(--gold)] mb-2">قسم</div>
                  <h2 className="font-poster text-3xl md:text-5xl">{c.label}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{c.tagline}</p>
                </div>
                <div className="hidden md:block text-xs tracking-[0.3em] text-muted-foreground">
                  {c.dishes.length} أصناف
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {c.dishes.map((d, i) => (
                  <motion.article
                    key={d.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-[var(--gold)]/50 transition-all"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.01_40)] via-transparent to-transparent" />
                      {d.tag && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full glass-strong text-[10px] tracking-widest text-[var(--gold)]">{d.tag}</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl group-hover:text-[var(--gold)] transition-colors">{d.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2 min-h-[36px]">{d.desc}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-gold">{d.price}</span>
                          <span className="text-[11px] text-muted-foreground mr-1">ج.م</span>
                        </div>
                        <button
                          onClick={() => add(d.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] text-xs font-bold hover:scale-[1.05] transition-transform"
                        >
                          <Plus className="h-4 w-4" /> أضف
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}