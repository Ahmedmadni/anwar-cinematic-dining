import { useEffect, useState } from "react";

export function Embers({ count = 30 }: { count?: number }) {
  const [embers, setEmbers] = useState<Array<{ left: number; delay: number; duration: number; size: number; opacity: number }>>([]);
  useEffect(() => {
    setEmbers(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        size: 2 + Math.random() * 4,
        opacity: 0.4 + Math.random() * 0.6,
      }))
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${e.left}%`,
            bottom: `-10px`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            opacity: e.opacity,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
