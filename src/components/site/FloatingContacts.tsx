import { MessageCircle, Phone, Facebook } from "lucide-react";

const buttons = [
  { href: "https://wa.me/201120016502", label: "واتساب", color: "bg-emerald-500", Icon: MessageCircle, primary: true },
  { href: "tel:01120016502", label: "اتصل", color: "bg-gradient-gold text-[oklch(0.1_0.012_40)]", Icon: Phone, primary: false },
  { href: "https://www.facebook.com/elmadni1998", label: "فيسبوك", color: "bg-blue-500", Icon: Facebook, primary: false },
];

export function FloatingContacts() {
  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3">
      {buttons.map((b) => {
        const Icon = b.Icon;
        return (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noreferrer"
            aria-label={b.label}
            className={`group relative h-11 w-11 sm:h-14 sm:w-14 rounded-full ${b.color} text-white shadow-cinematic ${b.primary ? "flex" : "hidden sm:flex"} items-center justify-center hover:scale-110 transition-transform`}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        );
      })}
    </div>
  );
}
