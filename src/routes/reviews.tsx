import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePrefs } from "@/lib/preferences";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "آراء العملاء | أنوار المدينة" },
      { name: "description", content: "شهادات وتقييمات زوار مطعم أنوار المدينة في مغاغة." },
      { property: "og:title", content: "آراء زوار أنوار المدينة" },
      { property: "og:description", content: "قصص حقيقية من طاولات أنوار المدينة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  {
    name: { ar: "أحمد عبد الرحمن", en: "Ahmed Abdelrahman" },
    role: { ar: "زائر منتظم", en: "Regular guest" },
    rating: 5,
    text: {
      ar: "أحسن طعم مشاوي ذقته في الصعيد — الجو فخم والخدمة راقية والطعم زي بيت ستي بالظبط.",
      en: "Best grill flavor in Upper Egypt — refined atmosphere and taste just like my grandmother's kitchen.",
    },
  },
  {
    name: { ar: "منى السيد", en: "Mona Elsayed" },
    role: { ar: "عائلة السيد", en: "The Elsayed family" },
    rating: 5,
    text: {
      ar: "حجزنا سفرة العيلة يوم الجمعة، الطاجن كان زي ما مامتي بتعمله بالظبط والأولاد اتبسطوا جدًا.",
      en: "Booked the family feast on Friday — the tagine tasted just like mom's, and the kids loved every bite.",
    },
  },
  {
    name: { ar: "كريم حمدي", en: "Karim Hamdy" },
    role: { ar: "زائر من القاهرة", en: "Visiting from Cairo" },
    rating: 5,
    text: {
      ar: "جاي مغاغة كل شهرين وأول محطة أنوار المدينة، الكشري والملوخية بالأرانب مستوى مطاعم ٥ نجوم.",
      en: "I drive to Maghagha every two months just to eat here. Koshary and molokhia are five-star level.",
    },
  },
  {
    name: { ar: "شركة النيل للسياحة", en: "Nile Tours Co." },
    role: { ar: "رحلات سياحية", en: "Corporate group" },
    rating: 5,
    text: {
      ar: "استضافوا مجموعة ٥٠ سائح بتنظيم مذهل، الأكل والخدمة والتقديم على مستوى فنادق ٥ نجوم.",
      en: "Hosted 50 tourists flawlessly — food, service and presentation at 5-star hotel standard.",
    },
  },
  {
    name: { ar: "دكتور طارق فؤاد", en: "Dr. Tarek Fouad" },
    role: { ar: "طبيب أطفال", en: "Pediatrician" },
    rating: 5,
    text: {
      ar: "المكان نظيف جدًا ومناسب للعائلات، والوجبة توصل البيت سخنة خلال ٢٥ دقيقة.",
      en: "Impeccably clean, family-friendly, and delivery arrives hot within 25 minutes.",
    },
  },
  {
    name: { ar: "سارة إبراهيم", en: "Sara Ibrahim" },
    role: { ar: "مدوّنة طعام", en: "Food blogger" },
    rating: 5,
    text: {
      ar: "أم علي بالمكسرات هنا تحفة — قشدة بلدي حقيقية ومكسرات محمصة يوميًا. تجربة سينمائية.",
      en: "Om Ali here is a masterpiece — real cream, fresh-roasted nuts. A cinematic dessert moment.",
    },
  },
];

function ReviewsPage() {
  const { lang } = usePrefs();
  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">
            {lang === "ar" ? "الشهادات" : "TESTIMONIALS"}
          </div>
          <h1 className="font-poster text-3xl md:text-5xl">
            {lang === "ar" ? "قالوا عن أنوار المدينة" : "What Guests Say"}
          </h1>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex gap-1 text-[var(--gold)]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <span className="text-sm text-foreground/70">
              {lang === "ar" ? "٤.٩ / ٥ · +٢٤٠٠ تقييم" : "4.9 / 5 · 2,400+ reviews"}
            </span>
          </div>
          <div className="gold-divider mx-auto mt-6 max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="relative rounded-3xl bg-card border border-border p-7 hover:border-[var(--gold)]/60 transition-colors"
            >
              <Quote className="absolute top-5 left-5 rtl:right-5 rtl:left-auto h-8 w-8 text-[var(--gold)]/25" />
              <div className="flex gap-1 text-[var(--gold)] mb-4">
                {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="font-display leading-relaxed text-foreground/90">
                «{r.text[lang]}»
              </p>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="font-medium">{r.name[lang]}</div>
                <div className="text-xs text-muted-foreground tracking-wider mt-1">{r.role[lang]}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}