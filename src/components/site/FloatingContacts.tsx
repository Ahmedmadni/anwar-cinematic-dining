const buttons = [
  { href: "https://wa.me/201120016502", label: "واتساب", color: "bg-emerald-500", icon: "💬" },
  { href: "tel:01120016502", label: "اتصل", color: "bg-gradient-gold", icon: "📞" },
  { href: "https://www.facebook.com/elmadni1998", label: "فيسبوك", color: "bg-blue-500", icon: "f" },
];

export function FloatingContacts() {
  return (
    <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3">
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noreferrer"
          aria-label={b.label}
          className={`group relative h-12 w-12 sm:h-14 sm:w-14 rounded-full ${b.color} text-white shadow-cinematic flex items-center justify-center text-lg sm:text-xl hover:scale-110 transition-transform`}
        >
          <span>{b.icon}</span>
          <span className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping" />
        </a>
      ))}
    </div>
  );
}
