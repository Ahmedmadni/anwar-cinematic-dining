import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePrefs } from "@/lib/preferences";
import { Flame, Users, Truck, Gift } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "العروض والخصومات | أنوار المدينة" },
      { name: "description", content: "عروض المطعم اليومية والأسبوعية على المشاوي والعائلات والتوصيل." },
      { property: "og:title", content: "عروض أنوار المدينة" },
      { property: "og:description", content: "خصومات على وجبات العائلة والتوصيل وأيام المشاوي." },
    ],
  }),
  component: OffersPage,
});

type Offer = {
  icon: typeof Flame;
  tag: { ar: string; en: string };
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  price: { ar: string; en: string };
  save?: { ar: string; en: string };
};

const OFFERS: Offer[] = [
  {
    icon: Users,
    tag: { ar: "عرض العائلة", en: "Family Deal" },
    title: { ar: "سفرة العيلة ٤ أشخاص", en: "Family Feast for 4" },
    desc: { ar: "مشاوي مشكلة + ٤ سلطات + خبز بلدي + مشروبات + حلو", en: "Mixed grill + 4 salads + baladi bread + drinks + dessert" },
    price: { ar: "٧٤٥ ج.م", en: "745 EGP" },
    save: { ar: "وفّر ١٢٠ ج", en: "Save 120 EGP" },
  },
  {
    icon: Flame,
    tag: { ar: "الثلاثاء والخميس", en: "Tue & Thu" },
    title: { ar: "ليالي المشاوي", en: "Grill Nights" },
    desc: { ar: "خصم ٢٠٪ على كل أصناف المشاوي على الفحم", en: "20% off all charcoal grills" },
    price: { ar: "خصم ٢٠٪", en: "20% OFF" },
  },
  {
    icon: Truck,
    tag: { ar: "التوصيل", en: "Delivery" },
    title: { ar: "توصيل مجاني", en: "Free Delivery" },
    desc: { ar: "على كل طلب فوق ٢٥٠ ج.م داخل مغاغة", en: "On every order over 250 EGP inside Maghagha" },
    price: { ar: "مجاني", en: "Free" },
  },
  {
    icon: Gift,
    tag: { ar: "الحلويات", en: "Sweets" },
    title: { ar: "حلو على البيت", en: "Dessert On Us" },
    desc: { ar: "أم علي أو أرز بلبن هدية مع أي طلب فوق ٤٠٠ ج", en: "Free Om Ali or rice pudding on any order over 400 EGP" },
    price: { ar: "هدية", en: "Gift" },
  },
];

function OffersPage() {
  const { lang } = usePrefs();
  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">
            {lang === "ar" ? "العروض" : "OFFERS"}
          </div>
          <h1 className="font-poster text-3xl md:text-5xl">
            {lang === "ar" ? "عروض المدينة هذا الأسبوع" : "This Week At Al Madina"}
          </h1>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            {lang === "ar"
              ? "عروض حقيقية بدون شروط معقدة، صالحة في كل فروع مغاغة."
              : "Real offers, no fine print — valid across all Maghagha branches."}
          </p>
          <div className="gold-divider mx-auto mt-6 max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {OFFERS.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-[var(--gold)]/60 transition-all p-7 md:p-8"
              >
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[oklch(0.84_0.16_84/0.08)] blur-3xl group-hover:bg-[oklch(0.84_0.16_84/0.16)] transition" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center text-[oklch(0.1_0.012_40)] shadow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-[var(--gold)] border border-[var(--gold)]/40 rounded-full px-3 py-1">
                    {o.tag[lang]}
                  </span>
                </div>
                <h3 className="relative mt-5 font-poster text-2xl md:text-3xl">{o.title[lang]}</h3>
                <p className="relative mt-2 text-foreground/75 leading-relaxed">{o.desc[lang]}</p>
                <div className="relative mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-poster text-3xl text-gold">{o.price[lang]}</div>
                    {o.save && <div className="text-xs text-foreground/60 mt-1">{o.save[lang]}</div>}
                  </div>
                  <Link
                    to="/reservation"
                    className="px-5 py-2.5 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold text-sm shadow-gold hover:scale-[1.03] transition-transform"
                  >
                    {lang === "ar" ? "استفد الآن" : "Claim Now"}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}