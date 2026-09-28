import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { findDish } from "@/lib/menu-data";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة الطلبات | أنوار المدينة" },
      { name: "description", content: "أكمل طلبك من مطعم أنوار المدينة بتوصيل سريع." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [done, setDone] = useState<string | null>(null);

  const rows = items
    .map((i) => ({ ...i, dish: findDish(i.id) }))
    .filter((r) => r.dish);

  const subtotal = rows.reduce((n, r) => n + (r.dish!.price * r.qty), 0);
  const delivery = type === "delivery" && subtotal > 0 ? 25 : 0;
  const total = subtotal + delivery;

  function submit() {
    const ref = `ANM-${Math.floor(Math.random() * 900000 + 100000)}`;
    setDone(ref);
    clear();
  }

  if (done) {
    return (
      <main className="pt-32 pb-24 px-5 min-h-[80vh] flex items-center">
        <div className="max-w-lg mx-auto text-center glass-strong rounded-3xl p-10">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-gold flex items-center justify-center text-[oklch(0.1_0.012_40)] text-2xl font-bold shadow-gold mb-5">✓</div>
          <h1 className="font-poster text-4xl mb-3">تم استلام طلبك</h1>
          <p className="text-muted-foreground mb-6">سيتواصل معك أحد ممثلي خدمة العملاء خلال دقائق.</p>
          <div className="text-xs tracking-[0.3em] text-[var(--gold)]">رقم الطلب</div>
          <div className="font-poster text-3xl text-gold mt-1">{done}</div>
          <Link to="/menu" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold">
            <ArrowLeft className="h-4 w-4" /> العودة للمنيو
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">سلة الطلبات</div>
          <h1 className="font-poster text-4xl md:text-5xl">طلبك جاهز للإرسال</h1>
        </div>

        {rows.length === 0 ? (
          <div className="glass-strong rounded-3xl p-12 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-[var(--gold)] mb-4" />
            <h2 className="font-display text-2xl mb-2">السلة فارغة</h2>
            <p className="text-muted-foreground mb-6">ابدأ بإضافة أطباقك المفضلة من المنيو.</p>
            <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold">
              تصفح المنيو
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="glass-strong rounded-2xl p-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4"
                >
                  <img src={r.dish!.img} alt={r.dish!.name} className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-base sm:text-lg truncate">{r.dish!.name}</div>
                    <div className="text-xs text-muted-foreground">{r.dish!.price} ج.م</div>
                    <div className="mt-2 flex items-center gap-2 sm:hidden">
                      <div className="flex items-center gap-1 glass rounded-xl p-1 shrink-0">
                        <button onClick={() => setQty(r.id, r.qty - 1)} className="h-7 w-7 rounded-lg flex items-center justify-center touch-manipulation" aria-label="نقص"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center text-sm font-bold">{r.qty}</span>
                        <button onClick={() => setQty(r.id, r.qty + 1)} className="h-7 w-7 rounded-lg flex items-center justify-center touch-manipulation" aria-label="زيادة"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="font-bold text-gold text-sm ms-auto">{r.dish!.price * r.qty} ج.م</div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 glass rounded-xl p-1">
                      <button onClick={() => setQty(r.id, r.qty - 1)} className="h-8 w-8 rounded-lg hover:bg-[oklch(0.84_0.16_84/0.1)] flex items-center justify-center" aria-label="نقص"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-7 text-center font-bold">{r.qty}</span>
                      <button onClick={() => setQty(r.id, r.qty + 1)} className="h-8 w-8 rounded-lg hover:bg-[oklch(0.84_0.16_84/0.1)] flex items-center justify-center" aria-label="زيادة"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="font-bold text-gold min-w-16 text-end tabular-nums">{r.dish!.price * r.qty}</div>
                  </div>
                  <button onClick={() => remove(r.id)} className="h-9 w-9 shrink-0 rounded-lg hover:bg-[oklch(0.55_0.22_28/0.15)] text-[oklch(0.7_0.2_28)] flex items-center justify-center self-start sm:self-center" aria-label="حذف"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>

            <aside className="glass-strong rounded-3xl p-6 h-fit sticky top-28">
              <h3 className="font-poster text-2xl mb-5">ملخص الطلب</h3>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {(["delivery", "pickup"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition ${
                      type === t ? "bg-gradient-gold text-[oklch(0.1_0.012_40)] shadow-gold" : "glass hover:border-[var(--gold)]"
                    }`}
                  >
                    {t === "delivery" ? "توصيل منزلي" : "استلام من الفرع"}
                  </button>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <Row label="المجموع الفرعي" value={`${subtotal} ج.م`} />
                <Row label="رسوم التوصيل" value={delivery ? `${delivery} ج.م` : "مجاناً"} />
                <div className="border-t border-border my-2" />
                <Row label="الإجمالي" value={`${total} ج.م`} bold />
              </div>
              <button
                onClick={submit}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] font-bold shadow-gold hover:scale-[1.02] transition-transform"
              >
                تأكيد الطلب
              </button>
              <a
                href={`https://wa.me/201120016502?text=${encodeURIComponent(
                  "طلب جديد من موقع أنوار المدينة:\n" +
                    rows.map((r) => `- ${r.dish!.name} × ${r.qty}`).join("\n") +
                    `\nالإجمالي: ${total} ج.م`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center w-full mt-3 py-3 rounded-xl glass text-sm hover:border-[var(--gold)] transition"
              >
                إرسال عبر واتساب
              </a>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-lg font-bold" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={bold ? "text-gold" : ""}>{value}</span>
    </div>
  );
}