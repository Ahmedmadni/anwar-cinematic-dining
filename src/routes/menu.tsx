import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, type Dish } from "@/lib/menu-data";
import { useCart } from "@/lib/cart";
import { Plus, ShoppingBag, Search, ChevronDown, X, SlidersHorizontal, Minus, ListFilter, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { playClick, playSuccess, isMuted, toggleMuted } from "@/lib/sound";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "المنيو | أنوار المدينة — كل الأصناف" },
      { name: "description", content: "تصفح قائمة طعام أنوار المدينة: مشويات، طواجن، كشري، وحلويات شرقية." },
      { property: "og:title", content: "منيو أنوار المدينة" },
      { property: "og:description", content: "أكثر من ٤٠ صنف بلدي بنكهة سينمائية." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const [priceBand, setPriceBand] = useState<"all" | "lt100" | "mid" | "gt250">("all");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c, i) => [c.id, i === 0])),
  );
  const [selected, setSelected] = useState<Dish | null>(null);
  const { add, count, setQty, items } = useCart();
  const [catOpen, setCatOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [muted, setMutedState] = useState(false);
  const [pinged, setPinged] = useState<string | null>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMutedState(isMuted());
    const onChange = (e: Event) => setMutedState((e as CustomEvent<boolean>).detail);
    window.addEventListener("aam-sound-muted", onChange);
    return () => window.removeEventListener("aam-sound-muted", onChange);
  }, []);

  const handleAdd = (id: string, opts?: { success?: boolean }) => {
    add(id);
    if (opts?.success) playSuccess();
    else playClick();
    setPinged(id);
    window.setTimeout(() => setPinged((cur) => (cur === id ? null : cur)), 650);
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const qtyOf = (id: string) => items.find((i) => i.id === id)?.qty ?? 0;

  const bands = [
    { id: "all", label: "الكل" },
    { id: "lt100", label: "أقل من ١٠٠" },
    { id: "mid", label: "١٠٠ - ٢٥٠" },
    { id: "gt250", label: "أعلى من ٢٥٠" },
  ] as const;

  const activeCat = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0];
  const activeBand = bands.find((b) => b.id === priceBand)!;
  const sortLabel = sort === "asc" ? "السعر ↑" : sort === "desc" ? "السعر ↓" : "الافتراضي";

  const matchPrice = (p: number) => {
    if (priceBand === "lt100") return p < 100;
    if (priceBand === "mid") return p >= 100 && p <= 250;
    if (priceBand === "gt250") return p > 250;
    return true;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.map((c) => {
      let dishes = c.dishes.filter(
        (d) =>
          matchPrice(d.price) &&
          (q === "" || d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)),
      );
      if (sort === "asc") dishes = [...dishes].sort((a, b) => a.price - b.price);
      if (sort === "desc") dishes = [...dishes].sort((a, b) => b.price - a.price);
      return { ...c, dishes };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, priceBand, sort]);

  const totalHits = filtered.reduce((n, c) => n + c.dishes.length, 0);
  const filtersActive = query !== "" || priceBand !== "all" || sort !== "default";

  const toggleOpen = (id: string) =>
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  const expandAll = () =>
    setOpenIds(Object.fromEntries(CATEGORIES.map((c) => [c.id, true])));
  const collapseAll = () =>
    setOpenIds(Object.fromEntries(CATEGORIES.map((c) => [c.id, false])));
  const resetFilters = () => {
    setQuery("");
    setPriceBand("all");
    setSort("default");
  };

  return (
    <main className="pt-24 sm:pt-28 pb-20 sm:pb-24 px-4 sm:px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <div className="text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] text-[var(--gold)] mb-2 sm:mb-3">القائمة الكاملة</div>
          <h1 className="font-poster text-3xl sm:text-5xl md:text-6xl mb-3">منيو أنوار المدينة</h1>
          <div className="gold-divider w-32 sm:w-40 mx-auto mt-4 sm:mt-5" />
        </div>

        {/* Sticky compact filter bar */}
        <div className="sticky top-20 sm:top-24 z-30 -mx-4 px-4 sm:-mx-5 sm:px-5 md:mx-0 md:px-0 mb-6 sm:mb-10">
          <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[140px] order-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--gold)]/70 pointer-events-none" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="مسح البحث"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full hover:bg-[var(--gold)]/10 text-muted-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                inputMode="search"
                placeholder="ابحث عن طبق..."
                className="w-full bg-transparent outline-none border-0 h-10 pr-10 pl-9 text-sm placeholder:text-muted-foreground/70"
              />
            </div>

            {/* Category dropdown */}
            <div ref={catRef} className="relative order-2">
              <button
                type="button"
                onClick={() => { setCatOpen((v) => !v); setFilterOpen(false); }}
                className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-border hover:border-[var(--gold)]/60 text-xs sm:text-sm font-medium transition"
              >
                <span className="text-[var(--gold)]/80">القسم:</span>
                <span className="truncate max-w-[110px]">{activeCat.label}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto rounded-xl glass-strong border border-border shadow-xl p-1.5 z-40"
                  >
                    {CATEGORIES.map((c) => (
                      <a
                        key={c.id}
                        href={`#${c.id}`}
                        onClick={() => {
                          setActive(c.id);
                          setOpenIds((prev) => ({ ...prev, [c.id]: true }));
                          setCatOpen(false);
                        }}
                        className={`block px-3 py-2 rounded-lg text-xs sm:text-sm text-right transition ${
                          active === c.id
                            ? "bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold"
                            : "hover:bg-[var(--gold)]/10 text-foreground/80"
                        }`}
                      >
                        {c.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filters dropdown (price + sort + expand/collapse) */}
            <div ref={filterRef} className="relative order-3">
              <button
                type="button"
                onClick={() => { setFilterOpen((v) => !v); setCatOpen(false); }}
                aria-label="الفلاتر"
                className={`inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border text-xs sm:text-sm font-medium transition ${
                  filtersActive ? "border-[var(--gold)]/60 text-[var(--gold)]" : "border-border hover:border-[var(--gold)]/60"
                }`}
              >
                <ListFilter className="h-4 w-4" />
                <span className="hidden sm:inline">فلاتر</span>
                {filtersActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />}
              </button>
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 rounded-xl glass-strong border border-border shadow-xl p-3 z-40 space-y-3"
                  >
                    <div>
                      <div className="text-[10px] tracking-[0.25em] text-[var(--gold)] mb-1.5 flex items-center gap-1.5">
                        <SlidersHorizontal className="h-3 w-3" /> السعر
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {bands.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setPriceBand(b.id)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${
                              priceBand === b.id
                                ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40"
                                : "border border-border text-foreground/70 hover:text-[var(--gold)]"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.25em] text-[var(--gold)] mb-1.5">الترتيب</div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {([
                          { id: "default", label: "افتراضي" },
                          { id: "asc", label: "السعر ↑" },
                          { id: "desc", label: "السعر ↓" },
                        ] as const).map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSort(s.id)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${
                              sort === s.id
                                ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40"
                                : "border border-border text-foreground/70 hover:text-[var(--gold)]"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => (Object.values(openIds).every(Boolean) ? collapseAll() : expandAll())}
                        className="text-[11px] text-foreground/70 hover:text-[var(--gold)]"
                      >
                        {Object.values(openIds).every(Boolean) ? "طيّ كل الأقسام" : "فتح كل الأقسام"}
                      </button>
                      {filtersActive && (
                        <button type="button" onClick={resetFilters} className="text-[11px] text-[var(--gold)] hover:underline">
                          إعادة الضبط
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="السلة"
              className="order-4 shrink-0 inline-flex items-center gap-1.5 px-3 h-10 rounded-xl glass text-xs sm:text-sm hover:border-[var(--gold)] transition"
              onClick={() => playClick()}
            >
              <ShoppingBag className="h-4 w-4 text-[var(--gold)]" />
              <span className="font-bold">{count}</span>
            </Link>

            {/* Sound toggle */}
            <button
              type="button"
              onClick={() => { toggleMuted(); if (isMuted() === false) playClick(); }}
              aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"}
              title={muted ? "تشغيل الصوت" : "كتم الصوت"}
              className="order-5 shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border hover:border-[var(--gold)]/60 text-[var(--gold)]/80 hover:text-[var(--gold)] transition"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          {filtersActive && (
            <div className="flex items-center justify-between text-[11px] sm:text-xs px-1 mt-2">
              <span className="text-muted-foreground">{totalHits} نتيجة • {activeBand.label} • {sortLabel}</span>
              <button type="button" onClick={resetFilters} className="text-[var(--gold)] hover:underline">
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}
        </div>

        {/* Sections per category */}
        <div className="space-y-6 sm:space-y-16 md:space-y-24">
          {filtered.map((c) => {
            const isOpen = isMobile ? !!openIds[c.id] : true;
            const empty = c.dishes.length === 0;
            return (
              <section key={c.id} id={c.id} className="scroll-mt-44 sm:scroll-mt-48">
                <button
                  type="button"
                  onClick={() => isMobile && toggleOpen(c.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-3 mb-4 sm:mb-8 border-b border-border pb-3 sm:pb-5 text-right md:cursor-default"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.35em] text-[var(--gold)] mb-1 sm:mb-2">قسم</div>
                    <h2 className="font-poster text-2xl sm:text-3xl md:text-5xl truncate">{c.label}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-1">{c.tagline}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs tracking-[0.25em] text-muted-foreground">
                      {c.dishes.length}
                    </span>
                    <span className="sm:hidden h-9 w-9 grid place-items-center rounded-full border border-border text-[var(--gold)]">
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {empty ? (
                        <div className="py-10 text-center text-sm text-muted-foreground">
                          لا توجد أصناف مطابقة في هذا القسم.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 pt-1 pb-2">
                          {c.dishes.map((d, i) => (
                            <motion.article
                              key={d.id}
                              layoutId={`dish-${d.id}`}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
                              onClick={() => { playClick(); setSelected(d); }}
                              whileHover={{ y: -4 }}
                              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-[var(--gold)]/60 hover:shadow-gold transition-all cursor-pointer text-right"
                            >
                              <motion.div layoutId={`dish-img-${d.id}`} className="relative aspect-[16/10] sm:aspect-[5/4] overflow-hidden">
                                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.01_40)] via-transparent to-transparent" />
                                {d.tag && (
                                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full glass-strong text-[10px] tracking-widest text-[var(--gold)]">{d.tag}</span>
                                )}
                              </motion.div>
                              <div className="p-4 sm:p-5">
                                <h3 className="font-display text-lg sm:text-xl group-hover:text-[var(--gold)] transition-colors">{d.name}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-2 sm:line-clamp-none sm:min-h-[36px]">{d.desc}</p>
                                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                                  <div>
                                    <span className="text-xl sm:text-2xl font-bold text-gold">{d.price}</span>
                                    <span className="text-[11px] text-muted-foreground mr-1">ج.م</span>
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleAdd(d.id); }}
                                    className="gold-sweep relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] text-xs font-bold hover:scale-[1.05] active:scale-95 transition-transform touch-manipulation shadow-gold"
                                  >
                                    <Plus className="h-4 w-4" /> أضف
                                    {pinged === d.id && (
                                      <span className="pointer-events-none absolute inset-0 rounded-xl bg-[var(--gold)]/50 ping-ring" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.article>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}

          {totalHits === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground mb-4">لا توجد نتائج مطابقة لبحثك.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] text-xs font-bold"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dish detail lightbox with shared layout animation */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="absolute inset-0 bg-[oklch(0.05_0.008_40)/0.75] backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.article
              layoutId={`dish-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-card border border-[var(--gold)]/30 shadow-2xl grid grid-rows-[auto_1fr]"
            >
              <motion.div layoutId={`dish-img-${selected.id}`} className="relative aspect-[16/10] overflow-hidden">
                <img src={selected.img} alt={selected.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.01_40)] via-transparent to-transparent" />
                {selected.tag && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass-strong text-[10px] tracking-widest text-[var(--gold)]">{selected.tag}</span>
                )}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="إغلاق"
                  className="absolute top-4 left-4 h-10 w-10 grid place-items-center rounded-full glass-strong text-foreground hover:text-[var(--gold)] transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
              <motion.div
                className="p-5 sm:p-7 overflow-y-auto"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                exit={{ opacity: 0, y: 12 }}
              >
                <div className="text-[10px] tracking-[0.3em] text-[var(--gold)] mb-2">طبق مميّز</div>
                <h3 className="font-poster text-2xl sm:text-3xl mb-3">{selected.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.desc}</p>
                <div className="mt-5 pt-5 border-t border-border flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <span className="text-3xl font-bold text-gold">{selected.price}</span>
                    <span className="text-xs text-muted-foreground mr-1">ج.م</span>
                  </div>
                  {qtyOf(selected.id) > 0 ? (
                    <div className="inline-flex items-center gap-2 rounded-2xl glass-strong p-1.5">
                      <button
                        type="button"
                        onClick={() => { playClick(); setQty(selected.id, qtyOf(selected.id) - 1); }}
                        aria-label="إنقاص"
                        className="h-10 w-10 grid place-items-center rounded-xl hover:bg-[var(--gold)]/10 text-[var(--gold)] touch-manipulation"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center font-bold tabular-nums">{qtyOf(selected.id)}</span>
                      <button
                        type="button"
                        onClick={() => handleAdd(selected.id)}
                        aria-label="زيادة"
                        className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] touch-manipulation"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdd(selected.id, { success: true })}
                      className="gold-sweep inline-flex items-center gap-2 px-5 h-11 rounded-2xl bg-gradient-gold text-[oklch(0.1_0.012_40)] text-sm font-bold hover:scale-[1.03] active:scale-95 transition-transform touch-manipulation shadow-gold"
                    >
                      <Plus className="h-4 w-4" /> أضف للسلة
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}