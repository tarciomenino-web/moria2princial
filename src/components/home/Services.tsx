"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, RevealWords } from "./Reveal";

const services = [
  "Troca de tela",
  "Troca de bateria",
  "Reparo de placa",
  "Conector de carga",
  "Face ID / biometria",
  "Câmeras",
  "Aparelho molhado",
  "Desbloqueio de conta",
  "Software / sistema",
];

function TiltCard({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 15 });

  function move(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <Reveal delay={index * 0.05}>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
        className="glass glass-hover flex items-center justify-between p-6"
      >
        <span className="text-base font-medium text-cream">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition group-hover:bg-gold-500/10">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z" />
          </svg>
        </span>
      </motion.div>
    </Reveal>
  );
}

export function Services() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Nossos serviços
          </p>
        </Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
          <RevealWords text="Soluções completas para o seu aparelho." />
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <TiltCard key={s} label={s} index={i} />
        ))}
      </div>
    </section>
  );
}
