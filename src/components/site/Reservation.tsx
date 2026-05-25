import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  { id: "dine", label: "تناول داخل المطعم", desc: "احجز طاولتك" },
  { id: "pickup", label: "استلام من الفرع", desc: "جاهز عند وصولك" },
  { id: "delivery", label: "توصيل منزلي", desc: "يصل إلى بابك" },
];

export function Reservation() {
  const [service, setService] = useState("dine");
  return (
    <section id="reservation" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.3_0.1_40/0.3),transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.5em] text-[var(--gold)] mb-4">الحجوزات</div>
          <h2 className="font-display text-5xl md:text-6xl">
            <span className="text-gold">احجز تجربتك</span>
          </h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-cinematic"
        >
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setService(s.id)}
                className={`p-5 rounded-xl text-right transition-all border ${
                  service === s.id
                    ? "bg-gradient-gold text-[hsl(0_0%_8%)] border-transparent shadow-gold"
                    : "bg-card/40 border-border hover:border-[var(--gold)]/40"
                }`}
              >
                <div className="font-bold mb-1">{s.label}</div>
                <div className={`text-xs ${service === s.id ? "opacity-80" : "text-muted-foreground"}`}>{s.desc}</div>
              </button>
            ))}
          </div>

          <form className="grid md:grid-cols-2 gap-5">
            <Field label="الاسم الكامل" placeholder="اكتب اسمك" />
            <Field label="رقم الهاتف" placeholder="01XXXXXXXXX" type="tel" />
            <Field label="عدد الأفراد" placeholder="٤" type="number" />
            <Select label="الفرع" options={["وسط البلد", "كورنيش النيل", "شارع الجمهورية", "محطة السكة الحديد"]} />
            <Field label="التاريخ" type="date" />
            <Field label="الوقت" type="time" />
            <div className="md:col-span-2">
              <label className="block text-xs text-muted-foreground mb-2 tracking-wider">ملاحظات إضافية</label>
              <textarea
                rows={3}
                placeholder="أي طلبات خاصة..."
                className="w-full bg-input/40 border border-border focus:border-[var(--gold)]/60 outline-none rounded-xl px-4 py-3 text-sm transition-colors"
              />
            </div>
            <button
              type="button"
              className="md:col-span-2 mt-4 py-4 rounded-full bg-gradient-gold text-[hsl(0_0%_8%)] font-bold shadow-gold hover:scale-[1.02] transition-transform"
            >
              تأكيد الحجز · ANM-MAG-{Math.floor(Math.random() * 900000 + 100000)}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-2 tracking-wider">{label}</label>
      <input
        {...props}
        className="w-full bg-input/40 border border-border focus:border-[var(--gold)]/60 outline-none rounded-xl px-4 py-3 text-sm transition-colors"
      />
    </div>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-2 tracking-wider">{label}</label>
      <select className="w-full bg-input/40 border border-border focus:border-[var(--gold)]/60 outline-none rounded-xl px-4 py-3 text-sm">
        {options.map((o) => (
          <option key={o} className="bg-card">{o}</option>
        ))}
      </select>
    </div>
  );
}
