import { motion } from "framer-motion";
import koshary from "@/assets/dish-koshary.jpg";
import tagine from "@/assets/dish-tagine.jpg";
import omali from "@/assets/dish-omali.jpg";
import mixed from "@/assets/dish-mixed-grill.jpg";

const categories = [
  { id: "grills", label: "المشويات الفاخرة" },
  { id: "tagines", label: "الطواجن البلدي" },
  { id: "koshary", label: "الكشري الأصلي" },
  { id: "desserts", label: "الحلويات والمشروبات" },
];

const dishes = [
  {
    img: mixed,
    cat: "grills",
    name: "مشاوي مشكلة",
    desc: "كباب · كفتة · ريش · فراخ مشوية على الفحم",
    price: "٤٨٠",
    tag: "الأكثر طلباً",
  },
  {
    img: tagine,
    cat: "tagines",
    name: "طاجن بامية باللحمة",
    desc: "بامية بلدي مطبوخة في الفخار مع الطشة الأصلية",
    price: "١٨٥",
    tag: "بيتي",
  },
  {
    img: koshary,
    cat: "koshary",
    name: "كشري المدينة",
    desc: "أرز · مكرونة · عدس · حمص · بصل مقرمش · صلصة حارة",
    price: "٦٥",
    tag: "تقليدي",
  },
  {
    img: omali,
    cat: "desserts",
    name: "أم علي بالمكسرات",
    desc: "أم علي ساخنة بفستق ولوز وقشطة طازجة",
    price: "٩٥",
    tag: "حلو",
  },
];

export function Menu() {
  return (
    <section id="menu" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.2_0.04_60/0.6),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.5em] text-[var(--gold)] mb-4">المنيو</div>
          <h2 className="font-display text-5xl md:text-6xl mb-4">
            <span className="text-gold">معرض الذوق</span> المصري
          </h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-5 py-2 rounded-full glass text-sm hover:border-[var(--gold)]/50 hover:text-[var(--gold)] transition-all"
            >
              {c.label}
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-[var(--gold)]/40 transition-all duration-500 shadow-cinematic"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.01_60)] via-[oklch(0.1_0.01_60/0.3)] to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-[10px] tracking-widest text-[var(--gold)]">
                  {d.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {d.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[40px]">{d.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-gold">{d.price}</span>
                    <span className="text-xs text-muted-foreground mr-1">ج.م</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-gradient-gold text-[hsl(0_0%_8%)] text-xs font-bold hover:scale-105 transition-transform">
                    أضف للسلة
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
