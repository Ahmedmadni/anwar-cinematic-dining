import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePrefs } from "@/lib/preferences";
import mixed from "@/assets/dish-mixed-grill.jpg?w=900&quality=70&format=webp";
import tagine from "@/assets/dish-tagine.jpg?w=900&quality=70&format=webp";
import koshary from "@/assets/dish-koshary.jpg?w=900&quality=70&format=webp";
import omali from "@/assets/dish-omali.jpg?w=900&quality=70&format=webp";
import bgGrill from "@/assets/bg-grill-2.jpg?w=1400&quality=70&format=webp";
import bgFeast from "@/assets/bg-feast.jpg?w=1400&quality=70&format=webp";
import bgDessert from "@/assets/bg-dessert.jpg?w=1400&quality=70&format=webp";
import hero from "@/assets/hero-grill.jpg?w=1400&quality=70&format=webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "معرض الصور | أنوار المدينة" },
      { name: "description", content: "لقطات سينمائية من مطبخ وأجواء مطعم أنوار المدينة في مغاغة." },
      { property: "og:title", content: "معرض الصور | أنوار المدينة" },
      { property: "og:description", content: "لقطات سينمائية من مطبخ وأجواء أنوار المدينة." },
    ],
  }),
  component: GalleryPage,
});

const shots = [
  { src: bgGrill, cap: { ar: "على الفحم البلدي", en: "On charcoal embers" }, span: "md:col-span-2 md:row-span-2" },
  { src: mixed, cap: { ar: "مشاوي مشكلة", en: "Mixed grill" }, span: "" },
  { src: tagine, cap: { ar: "طاجن في الفخار", en: "Clay tagine" }, span: "" },
  { src: bgFeast, cap: { ar: "سفرة العائلة", en: "Family feast" }, span: "md:col-span-2" },
  { src: koshary, cap: { ar: "كشري المدينة", en: "City koshary" }, span: "" },
  { src: omali, cap: { ar: "أم علي بالمكسرات", en: "Om Ali with nuts" }, span: "" },
  { src: bgDessert, cap: { ar: "لمسة شرقية", en: "Oriental touch" }, span: "md:col-span-2" },
  { src: hero, cap: { ar: "لحظة الشوي", en: "The grill moment" }, span: "md:col-span-2 md:row-span-2" },
];

function GalleryPage() {
  const { lang } = usePrefs();
  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">
            {lang === "ar" ? "المعرض" : "GALLERY"}
          </div>
          <h1 className="font-poster text-3xl md:text-5xl">
            {lang === "ar" ? "لقطات من قلب المطبخ" : "Frames From The Kitchen"}
          </h1>
          <div className="gold-divider mx-auto mt-6 max-w-xs" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {shots.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-border ${s.span}`}
            >
              <img
                src={s.src}
                alt={s.cap[lang]}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.05_0.01_40/0.85)] via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 inset-x-3 text-sm font-medium text-white/95 opacity-0 group-hover:opacity-100 transition-opacity">
                {s.cap[lang]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </main>
  );
}