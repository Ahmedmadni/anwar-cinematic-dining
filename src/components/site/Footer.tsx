import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-[hsl(0_0%_8%)] font-bold shadow-gold">أم</span>
            <div>
              <div className="font-display text-2xl text-gold">أنوار المدينة</div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground">شركة المدني العالمية للاستثمار</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            تجربة طعام مصرية فاخرة في قلب مغاغة — محافظة المنيا.
            خمسة فروع · توصيل سريع · حجوزات فورية.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg text-[var(--gold)] mb-4">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="tel:01120016502" className="hover:text-[var(--gold)]">01120016502</a></li>
            <li><a href="https://wa.me/201120016502" className="hover:text-[var(--gold)]">واتساب مباشر</a></li>
            <li><a href="https://www.facebook.com/elmadni1998" className="hover:text-[var(--gold)]">فيسبوك</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-[var(--gold)] mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-[var(--gold)]">المنيو</Link></li>
            <li><Link to="/branches" className="hover:text-[var(--gold)]">الفروع</Link></li>
            <li><Link to="/reservation" className="hover:text-[var(--gold)]">الحجوزات</Link></li>
            <li><Link to="/about" className="hover:text-[var(--gold)]">قصتنا</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-border text-center text-xs text-muted-foreground tracking-wider">
        © {new Date().getFullYear()} أنوار المدينة · جميع الحقوق محفوظة لـ شركة المدني العالمية للاستثمار
      </div>
    </footer>
  );
}
