import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Menu as MenuIcon, X, Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { usePrefs } from "@/lib/preferences";

type NavLink = {
  to: "/" | "/menu" | "/branches" | "/offers" | "/gallery" | "/reviews" | "/reservation" | "/about";
  key: string;
  exact?: boolean;
};
const links: NavLink[] = [
  { to: "/", key: "nav.home", exact: true },
  { to: "/menu", key: "nav.menu" },
  { to: "/offers", key: "nav.offers" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/reviews", key: "nav.reviews" },
  { to: "/branches", key: "nav.branches" },
  { to: "/reservation", key: "nav.reservation" },
  { to: "/about", key: "nav.about" },
];

export function Nav() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { t, theme, toggleTheme, lang, toggleLang } = usePrefs();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 mt-3">
        <div className="glass-strong rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="h-11 w-11 rounded-xl bg-gradient-gold flex items-center justify-center text-[oklch(0.1_0.012_40)] font-poster text-xl shadow-gold">
              أم
            </span>
            <div className="leading-tight">
              <div className="font-poster text-xl text-gold">أنوار المدينة</div>
              <div className="text-[10px] tracking-[0.35em] text-muted-foreground">MAGHAGHA · 1998</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact ?? false }}
                activeProps={{ className: "text-[var(--gold)]" }}
                inactiveProps={{ className: "text-foreground/80 hover:text-[var(--gold)]" }}
                className="relative text-sm font-medium transition-colors"
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="h-11 w-11 rounded-xl glass flex items-center justify-center hover:border-[var(--gold)]/60 transition text-xs font-bold"
              aria-label="Toggle language"
              title={lang === "ar" ? "English" : "العربية"}
            >
              <Languages className="h-4 w-4 text-[var(--gold)]" />
            </button>
            <button
              onClick={toggleTheme}
              className="h-11 w-11 rounded-xl glass flex items-center justify-center hover:border-[var(--gold)]/60 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-[var(--gold)]" /> : <Moon className="h-4 w-4 text-[var(--gold)]" />}
            </button>
            <Link
              to="/cart"
              className="relative h-11 w-11 rounded-xl glass flex items-center justify-center hover:border-[var(--gold)]/60 transition"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag className="h-5 w-5 text-[var(--gold)]" />
              {count > 0 && (
                <span className="absolute -top-1 -left-1 h-5 min-w-5 px-1 rounded-full bg-gradient-gold text-[oklch(0.1_0.012_40)] text-[11px] font-bold flex items-center justify-center shadow-gold">
                  {count}
                </span>
              )}
            </Link>
            <Link
              to="/reservation"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold text-sm shadow-gold hover:scale-[1.03] transition-transform"
            >
              {t("nav.order")}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-11 w-11 rounded-xl glass flex items-center justify-center"
              aria-label="القائمة"
            >
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-2 glass-strong rounded-2xl p-3 flex flex-col"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.exact ?? false }}
                activeProps={{ className: "text-[var(--gold)] bg-[oklch(0.84_0.16_84/0.08)]" }}
                className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-[oklch(0.84_0.16_84/0.06)] transition"
              >
                {t(l.key)}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}