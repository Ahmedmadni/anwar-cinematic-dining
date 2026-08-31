import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none">
        <div
          className="h-full bg-gradient-gold transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="العودة للأعلى"
        className={`fixed bottom-24 end-4 z-40 h-11 w-11 rounded-xl glass-strong flex items-center justify-center transition-all duration-300 ${
          pct > 12 ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
        }`}
      >
        <ArrowUp className="h-4 w-4 text-[var(--gold)]" />
      </button>
    </>
  );
}
