"use client";

import { useEffect, useState } from "react";

type Dot = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

// Partículas luminosas douradas, discretas, movimento lento.
// Geradas só no cliente (após montar) pra evitar mismatch de hidratação.
export function Particles({ count = 26 }: { count?: number }) {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 6,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-400"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            boxShadow: "0 0 8px 1px rgba(240,216,136,0.6)",
            animation: `floaty ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
