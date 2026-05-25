import { motion } from "framer-motion";

const links = [
  { href: "#menu", label: "المنيو" },
  { href: "#branches", label: "الفروع" },
  { href: "#reservation", label: "احجز طاولتك" },
  { href: "#story", label: "قصتنا" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between glass rounded-b-2xl">
        <a href="#top" className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center text-[hsl(0_0%_8%)] font-bold text-lg shadow-gold">أم</span>
          <div className="leading-tight">
            <div className="font-display text-xl text-gold">أنوار المدينة</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">EST · MAGHAGHA</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-foreground/85 hover:text-[var(--gold)] transition-colors group"
            >
              {l.label}
              <span className="absolute -bottom-1 right-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#order"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-[hsl(0_0%_8%)] font-bold text-sm shadow-gold hover:scale-105 transition-transform"
        >
          اطلب الآن
        </a>
      </div>
    </motion.header>
  );
}
