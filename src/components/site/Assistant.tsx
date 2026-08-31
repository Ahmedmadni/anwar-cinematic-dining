import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { askAssistant } from "@/lib/ai-chat.functions";
import { usePrefs } from "@/lib/preferences";

type Msg = { role: "user" | "assistant"; content: string };

export function Assistant() {
  const { t, lang } = usePrefs();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = useServerFn(askAssistant);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t("ai.welcome") }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await ask({ data: { messages: next, lang } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "..." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 ltr:right-6 rtl:left-6 z-40 h-14 w-14 rounded-full bg-gradient-gold text-[oklch(0.1_0.012_40)] shadow-gold flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={t("ai.button")}
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 ltr:right-6 rtl:left-6 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-8rem))] glass-strong rounded-3xl flex flex-col overflow-hidden border border-[var(--gold)]/30"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--gold)]/20 bg-gradient-gold/10">
              <div className="flex items-center gap-2">
                <span className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center text-[oklch(0.1_0.012_40)]">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-sm text-[var(--gold)]">{t("ai.title")}</div>
                  <div className="text-[10px] text-muted-foreground">online · AI</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-lg glass flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-gold text-[oklch(0.1_0.012_40)] px-4 py-2.5 text-sm font-medium"
                        : "max-w-[85%] text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 text-[var(--gold)] text-xs">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse" style={{ animationDelay: "150ms" }}>●</span>
                  <span className="animate-pulse" style={{ animationDelay: "300ms" }}>●</span>
                  <span className="ms-2 text-muted-foreground">{t("ai.thinking")}</span>
                </div>
              )}
            </div>

            <form onSubmit={send} className="border-t border-[var(--gold)]/20 p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai.placeholder")}
                className="flex-1 bg-muted border border-[var(--gold)]/20 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--gold)]/60"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 w-11 rounded-xl bg-gradient-gold text-[oklch(0.1_0.012_40)] flex items-center justify-center disabled:opacity-50 shadow-gold"
                aria-label={t("ai.send")}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}