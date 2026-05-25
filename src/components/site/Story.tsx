import { motion } from "framer-motion";
import pattern from "@/assets/pattern-arabesque.png";

const stats = [
  { num: "٥", label: "فروع في مغاغة" },
  { num: "+٢٠", label: "صنف على المنيو" },
  { num: "٢٤/٧", label: "دعم العملاء" },
  { num: "+١٠ آلاف", label: "عميل سعيد" },
];

export function Story() {
  return (
    <section id="story" className="relative py-32 px-6 overflow-hidden">
      <img src={pattern} alt="" className="absolute -left-32 top-10 w-96 opacity-10 pointer-events-none" />
      <img src={pattern} alt="" className="absolute -right-32 bottom-10 w-96 opacity-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="text-xs tracking-[0.5em] text-[var(--gold)] mb-4">قصتنا</div>
        <h2 className="font-display text-5xl md:text-6xl mb-8">
          <span className="text-gold">من قلب المنيا</span>
          <br />
          إلى مائدتك
        </h2>
        <div className="gold-divider w-32 mx-auto mb-10" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-foreground/80 leading-loose max-w-3xl mx-auto"
        >
          أنوار المدينة ليست مجرد مطعم — إنها رحلة في الذاكرة المصرية،
          حيث يلتقي عبق الفحم بنكهة الأصالة، وتتحول كل وجبة إلى لحظة تُروى.
          نقدم لك ما تعلّمناه على مدى سنوات من الشغف، تحت مظلة
          <span className="text-[var(--gold)]"> شركة المدني العالمية للاستثمار</span>.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-2xl glass"
            >
              <div className="text-4xl md:text-5xl font-display text-gold mb-2">{s.num}</div>
              <div className="text-xs tracking-wider text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
