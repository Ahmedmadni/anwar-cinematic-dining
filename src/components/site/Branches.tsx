import { motion } from "framer-motion";

const branches = [
  { name: "فرع وسط البلد", area: "مغاغة · شارع الجيش", hours: "١٢ ظهراً – ٢ صباحاً", status: "مفتوح الآن", eta: "٢٥ دقيقة" },
  { name: "فرع كورنيش النيل", area: "مغاغة · كورنيش النيل", hours: "١ ظهراً – ٣ صباحاً", status: "مفتوح الآن", eta: "٣٠ دقيقة" },
  { name: "فرع شارع الجمهورية", area: "مغاغة · الجمهورية", hours: "١٢ ظهراً – ١ صباحاً", status: "ضغط متوسط", eta: "٤٠ دقيقة" },
  { name: "فرع محطة السكة الحديد", area: "مغاغة · المحطة", hours: "١٠ صباحاً – ١٢ منتصف الليل", status: "مفتوح الآن", eta: "٢٠ دقيقة" },
  { name: "فرع المنطقة التجارية", area: "مغاغة · التجاري الجديد", hours: "١٢ ظهراً – ٢ صباحاً", status: "قريباً", eta: "—" },
];

export function Branches() {
  return (
    <section id="branches" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.5em] text-[var(--gold)] mb-4">الفروع</div>
          <h2 className="font-display text-5xl md:text-6xl mb-4">
            <span className="text-gold">خمسة فروع</span> في قلب مغاغة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            اختر الفرع الأقرب إليك — نوفر التوصيل، الاستلام، والتناول داخل المطعم في جميع الفروع.
          </p>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative p-8 rounded-2xl glass hover:border-[var(--gold)]/40 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{b.area}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] tracking-wider ${
                    b.status === "مفتوح الآن"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : b.status === "قريباً"
                      ? "bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30"
                      : "bg-orange-500/15 text-orange-300 border border-orange-500/30"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <div className="space-y-3 text-sm border-t border-border pt-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ساعات العمل</span>
                  <span>{b.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">وقت التحضير</span>
                  <span className="text-[var(--gold)]">{b.eta}</span>
                </div>
              </div>
              <button className="mt-6 w-full py-3 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-sm hover:bg-[var(--gold)]/10 transition-all">
                اختر هذا الفرع
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
