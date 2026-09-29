import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const branches = [
  { name: "الفرع الرئيسي", area: "شارع الجمهورية، مغاغة", phone: "01120016502", hours: "12 ظهراً - 2 صباحاً", status: "مفتوح" },
  { name: "فرع كورنيش النيل", area: "كورنيش النيل، مغاغة", phone: "01120016503", hours: "1 ظهراً - 1 صباحاً", status: "مزدحم" },
  { name: "فرع السوق", area: "ميدان السوق، مغاغة", phone: "01120016504", hours: "12 ظهراً - 12 منتصف الليل", status: "مفتوح" },
  { name: "فرع المحطة", area: "شارع المحطة، مغاغة", phone: "01120016505", hours: "2 ظهراً - 2 صباحاً", status: "مفتوح" },
  { name: "فرع المدينة الجديدة", area: "الامتداد العمراني، مغاغة", phone: "01120016506", hours: "1 ظهراً - 12 منتصف الليل", status: "قريباً" },
];

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "فروعنا | أنوار المدينة — مغاغة، المنيا" },
      { name: "description", content: "اعثر على أقرب فرع لأنوار المدينة في مغاغة، محافظة المنيا." },
      { property: "og:title", content: "فروعنا | أنوار المدينة — مغاغة، المنيا" },
      { property: "og:description", content: "اعثر على أقرب فرع لأنوار المدينة في مغاغة، محافظة المنيا." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <main className="pt-28 pb-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.4em] text-[var(--gold)] mb-3">فروعنا</div>
          <h1 className="font-poster text-4xl md:text-5xl">٥ فروع في قلب مغاغة</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            تجربة موحدة من الفخامة والطعم البلدي الأصيل، حيثما كنت في المدينة.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {branches.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-strong rounded-3xl p-6 hover:border-[var(--gold)]/60 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-poster text-2xl">{b.name}</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest ${
                  b.status === "مفتوح" ? "bg-emerald-500/15 text-emerald-300" :
                  b.status === "مزدحم" ? "bg-amber-500/15 text-amber-300" :
                  "bg-muted text-muted-foreground"
                }`}>{b.status}</span>
              </div>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--gold)]" /> {b.area}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[var(--gold)]" /> <a href={`tel:${b.phone}`} className="hover:text-[var(--gold)]">{b.phone}</a></div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--gold)]" /> {b.hours}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}