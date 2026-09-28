import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Users, Phone, User } from "lucide-react";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "احجز طاولتك | أنوار المدينة" },
      { name: "description", content: "احجز طاولتك في أنوار المدينة — تجربة عشاء مصرية فاخرة." },
    ],
  }),
  component: ReservationPage,
});

function ReservationPage() {
  const [ref, setRef] = useState<string | null>(null);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setRef(`ANM-MAG-${Math.floor(Math.random() * 900000 + 100000)}`);
  }

  return (
    <main className="pt-28 pb-24 px-5 md:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">حجز طاولة</div>
          <h1 className="font-poster text-4xl md:text-5xl">تجربة عشاء كاملة</h1>
          <p className="text-muted-foreground mt-4">اختر التوقيت الذي يناسبك وسنجهز كل شيء.</p>
        </div>

        {ref ? (
          <div className="glass-strong rounded-3xl p-10 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-gold flex items-center justify-center text-[oklch(0.1_0.012_40)] text-2xl font-bold shadow-gold mb-5">✓</div>
            <h2 className="font-poster text-3xl mb-2">تم الحجز بنجاح</h2>
            <p className="text-muted-foreground mb-6">سيتواصل معك الفرع لتأكيد التفاصيل.</p>
            <div className="text-xs tracking-[0.3em] text-[var(--gold)]">رقم الحجز</div>
            <div className="font-poster text-3xl text-gold mt-1">{ref}</div>
          </div>
        ) : (
          <form onSubmit={submit} className="glass-strong rounded-3xl p-6 md:p-8 space-y-4">
            <Field icon={User} label="الاسم">
              <input required type="text" className="form-input" placeholder="اسمك الكريم" />
            </Field>
            <Field icon={Phone} label="رقم الهاتف">
              <input required type="tel" className="form-input" placeholder="01x xxxx xxxx" />
            </Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field icon={Calendar} label="التاريخ والوقت">
                <input required type="datetime-local" className="form-input" />
              </Field>
              <Field icon={Users} label="عدد الأشخاص">
                <input required type="number" min={1} max={20} defaultValue={2} className="form-input" />
              </Field>
            </div>
            <Field icon={User} label="الفرع المفضل">
              <select required className="form-input">
                <option>الفرع الرئيسي — شارع الجمهورية</option>
                <option>كورنيش النيل</option>
                <option>السوق</option>
                <option>المحطة</option>
              </select>
            </Field>
            <Field icon={User} label="ملاحظات (اختياري)">
              <textarea rows={3} className="form-input resize-none" placeholder="مكان تفضله، مناسبة خاصة..." />
            </Field>
            <button className="w-full py-4 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold shadow-gold hover:scale-[1.02] transition-transform">
              تأكيد الحجز
            </button>
          </form>
        )}
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: color-mix(in oklab, var(--background) 60%, transparent);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          color: var(--foreground);
          font-family: var(--font-body);
          text-align: start;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .form-input:focus { border-color: var(--ring); box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 25%, transparent); }
        .form-input::placeholder { color: var(--muted-foreground); opacity: 0.8; }
        /* Force LTR for numeric/phone inputs so digits and separators render correctly, but keep visual alignment at line-start */
        input[type="tel"].form-input,
        input[type="number"].form-input,
        input[type="datetime-local"].form-input { direction: ltr; text-align: start; }
        [dir="rtl"] input[type="tel"].form-input,
        [dir="rtl"] input[type="number"].form-input,
        [dir="rtl"] input[type="datetime-local"].form-input { text-align: right; }
      `}</style>
    </main>
  );
}

function Field({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[var(--gold)] mb-2">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      {children}
    </label>
  );
}