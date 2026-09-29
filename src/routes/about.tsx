import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-grill.jpg?w=1400&quality=70&format=webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "قصتنا | أنوار المدينة — شركة المدني العالمية للاستثمار" },
      { name: "description", content: "حكاية أنوار المدينة من مغاغة إلى قلوب محبي الطعام البلدي الأصيل." },
      { property: "og:title", content: "قصتنا | أنوار المدينة — شركة المدني العالمية للاستثمار" },
      { property: "og:description", content: "حكاية أنوار المدينة من مغاغة إلى قلوب محبي الطعام البلدي الأصيل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">قصتنا</div>
          <h1 className="font-poster text-4xl md:text-5xl">من مغاغة إلى قلوب محبي الطعم البلدي</h1>
        </div>

        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-cinematic">
          <img src={hero} alt="أنوار المدينة" className="absolute inset-0 w-full h-full object-cover ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.01_40)] via-transparent to-transparent" />
        </div>

        <div className="prose-anwar space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            بدأت <span className="text-gold font-bold">أنوار المدينة</span> سنة ١٩٩٨ كحلم بسيط في
            قلب مدينة مغاغة — مطعم عائلي يقدم الطعم البلدي الأصيل بنفس الحب الذي تطهو به الجدّات.
          </p>
          <p>
            على مدى أكثر من ربع قرن، نمت العلامة لتصبح وجهة الفخامة الشعبية في محافظة المنيا، تحت
            مظلة <span className="text-gold font-bold">شركة المدني العالمية للاستثمار</span>، بخمسة
            فروع تخدم آلاف الزوار شهرياً.
          </p>
          <p>
            فلسفتنا بسيطة: مكونات طازجة من السوق البلدي، فحم طبيعي، توابل تُطحن يومياً، وطهاة
            متمرسون يعاملون كل طبق كأنه عمل فني.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {[
            { k: "١٩٩٨", v: "تأسست" },
            { k: "+٢٥", v: "سنة من التميز" },
            { k: "+١٠٠ ألف", v: "زائر سنوياً" },
          ].map((s) => (
            <div key={s.v} className="glass-strong rounded-2xl p-6 text-center">
              <div className="font-poster text-4xl text-gold">{s.k}</div>
              <div className="text-xs tracking-[0.3em] text-muted-foreground mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}