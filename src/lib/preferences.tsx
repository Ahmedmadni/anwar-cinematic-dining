import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
export type Theme = "dark" | "light";

type Ctx = {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (key: string) => string;
};

const dict: Record<string, { ar: string; en: string }> = {
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.menu": { ar: "المنيو", en: "Menu" },
  "nav.branches": { ar: "الفروع", en: "Branches" },
  "nav.reservation": { ar: "احجز طاولتك", en: "Reservations" },
  "nav.about": { ar: "قصتنا", en: "Our Story" },
  "nav.offers": { ar: "العروض", en: "Offers" },
  "nav.gallery": { ar: "المعرض", en: "Gallery" },
  "nav.reviews": { ar: "الآراء", en: "Reviews" },
  "nav.order": { ar: "اطلب الآن", en: "Order Now" },
  "nav.cart": { ar: "السلة", en: "Cart" },
  "hero.badge": { ar: "مغاغة · المنيا · مفتوح الآن", en: "Maghagha · Minya · Open Now" },
  "hero.title": { ar: "أنوار المدينة", en: "Anwar Al Madina" },
  "hero.subtitle": { ar: "الطعم المصري بصياغة سينمائية", en: "Egyptian Flavor, Cinematic Soul" },
  "hero.desc": {
    ar: "مشويات على الفحم البلدي، طواجن تطهى ببطء، كشري بنكهة الجدّات، وحلويات شرقية فاخرة — تجربة طعام لا تُنسى في قلب الصعيد.",
    en: "Charcoal-grilled meats, slow-cooked tagines, heritage koshary and royal oriental sweets — an unforgettable Egyptian dining experience.",
  },
  "hero.cta.menu": { ar: "تصفح المنيو", en: "Browse Menu" },
  "hero.cta.book": { ar: "احجز طاولة", en: "Book a Table" },
  "tiles.menu": { ar: "تصفح المنيو", en: "Browse Menu" },
  "tiles.menu.d": { ar: "أكثر من ٤٠ صنف بلدي", en: "Over 40 authentic dishes" },
  "tiles.book": { ar: "احجز طاولتك", en: "Reserve a Table" },
  "tiles.book.d": { ar: "تجربة عشاء كاملة", en: "Full dining experience" },
  "tiles.branches": { ar: "فروعنا", en: "Our Branches" },
  "tiles.branches.d": { ar: "٥ فروع في مغاغة", en: "5 branches in Maghagha" },
  "tiles.delivery": { ar: "اطلب توصيل", en: "Order Delivery" },
  "tiles.delivery.d": { ar: "خلال ٣٠ دقيقة", en: "Within 30 minutes" },
  "ai.title": { ar: "مساعد أنوار المدينة", en: "Anwar Al Madina Assistant" },
  "ai.welcome": {
    ar: "أهلًا بك! اسألني عن المنيو، الأسعار، الفروع، أو ساعات العمل.",
    en: "Welcome! Ask me about our menu, prices, branches, or hours.",
  },
  "ai.placeholder": { ar: "اكتب سؤالك...", en: "Type your question..." },
  "ai.send": { ar: "إرسال", en: "Send" },
  "ai.thinking": { ar: "يكتب...", en: "Typing..." },
  "ai.button": { ar: "اسأل المساعد", en: "Ask Assistant" },
};

const PrefCtx = createContext<Ctx | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const l = localStorage.getItem("aam.lang") as Lang | null;
      const t = localStorage.getItem("aam.theme") as Theme | null;
      if (l === "ar" || l === "en") setLangState(l);
      if (t === "dark" || t === "light") setThemeState(t);
    } catch {}
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    html.dataset.theme = theme;
    try { localStorage.setItem("aam.lang", lang); localStorage.setItem("aam.theme", theme); } catch {}
  }, [lang, theme]);

  const setLang = (l: Lang) => setLangState(l);
  const setTheme = (t: Theme) => setThemeState(t);
  const toggleLang = () => setLangState((l) => (l === "ar" ? "en" : "ar"));
  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));
  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <PrefCtx.Provider value={{ lang, theme, setLang, setTheme, toggleLang, toggleTheme, t }}>
      {children}
    </PrefCtx.Provider>
  );
}

export function usePrefs() {
  const v = useContext(PrefCtx);
  if (!v) throw new Error("usePrefs must be used within PreferencesProvider");
  return v;
}