import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_AR = `أنت "نور" — المساعد الرسمي لمطعم "أنوار المدينة" في مغاغة، محافظة المنيا، التابع لشركة المدني العالمية للاستثمار.

معلومات المطعم:
- التخصص: مشويات على الفحم، طواجن، كشري، حلويات شرقية فاخرة.
- الفروع: ٥ فروع في مغاغة، المنيا.
- التواصل: 01120016502 / واتساب: wa.me/201120016502 / فيسبوك: elmadni1998
- يوجد توصيل خلال ٣٠ دقيقة وحجز طاولات أونلاين.

مهمتك: ساعد العميل بطريقة دافئة وراقية. أجب باختصار (٢-٤ أسطر). شجّعه على تصفح المنيو أو الحجز. أجب دائمًا بنفس لغة العميل (عربي/إنجليزي).`;

const SYSTEM_EN = SYSTEM_AR; // bilingual instructions already inside

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: Msg[]; lang?: "ar" | "en" }) => {
    if (!Array.isArray(data?.messages)) throw new Error("messages required");
    return data;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "⚠️ المساعد غير مفعّل حاليًا. يرجى التواصل عبر واتساب: wa.me/201120016502" };
    }
    const system = data.lang === "en" ? SYSTEM_EN : SYSTEM_AR;
    const messages = [{ role: "system", content: system }, ...data.messages.slice(-12)];
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages,
        }),
      });
      if (!res.ok) {
        if (res.status === 429) return { reply: "تم تجاوز عدد الطلبات، حاول بعد قليل." };
        if (res.status === 402) return { reply: "نفدت رصيد المساعد، يرجى المحاولة لاحقًا." };
        return { reply: "تعذّر الاتصال بالمساعد الآن، حاول مرة أخرى." };
      }
      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const reply = json.choices?.[0]?.message?.content?.trim() || "...";
      return { reply };
    } catch {
      return { reply: "حدث خطأ في الاتصال. تواصل معنا عبر واتساب: wa.me/201120016502" };
    }
  });