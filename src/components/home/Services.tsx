"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, RevealWords } from "./Reveal";

// Os seis serviços que têm foto própria. Os demais viram a lista de especialidades
// abaixo, pra não misturar card com imagem e card sem.
const services = [
  { label: "Troca de tela", img: "/img/servico-tela.webp", desc: "Display original ou premium, com garantia." },
  { label: "Troca de bateria", img: "/img/servico-bateria.webp", desc: "Bateria nova e saúde restaurada." },
  { label: "Conector de carga", img: "/img/servico-conector.webp", desc: "Voltou a carregar como no primeiro dia." },
  { label: "Aparelho molhado", img: "/img/servico-molhado.webp", desc: "Limpeza técnica e recuperação de placa." },
  { label: "Desbloqueio de conta", img: "/img/servico-desbloqueio.webp", desc: "Conta travada? A gente resolve." },
  { label: "Acessórios e recondicionados", img: "/img/servico-acessorios.webp", desc: "Capas, películas e aparelhos revisados." },
];

const especialidades = [
  "Reparo de placa",
  "Face ID / biometria",
  "Câmeras",
  "Software / sistema",
  "Alto-falante e microfone",
  "Botões e vibração",
];

function ServiceCard({
  label,
  img,
  desc,
  index,
}: {
  label: string;
  img: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 15 });

  function move(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <Reveal delay={index * 0.06}>
      <motion.a
        ref={ref}
        href="/conta/nova-os"
        onMouseMove={move}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
        className="glass glass-hover group relative block overflow-hidden"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={img}
            alt={label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          {/* escurece a base pra tipografia respirar sobre a foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/45 to-transparent" />
        </div>

        <div className="relative -mt-14 flex items-end justify-between gap-3 p-6">
          <div>
            <h3 className="text-base font-semibold text-cream">{label}</h3>
            <p className="mt-1 text-sm leading-relaxed text-cream/55">{desc}</p>
          </div>
          <span className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition group-hover:bg-gold-500/15">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z" />
            </svg>
          </span>
        </div>
      </motion.a>
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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.label} {...s} index={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-cream/40">
            Também fazemos
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {especialidades.map((e) => (
              <span key={e} className="flex items-center gap-2 text-sm text-cream/65">
                <span className="h-1 w-1 rounded-full bg-gold-500" />
                {e}
              </span>
            ))}
          </div>
          <Link
            href="/conta/nova-os"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition hover:text-gold-500"
          >
            Não achou o seu caso? Abra uma ordem e a gente avalia
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
