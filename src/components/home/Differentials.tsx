"use client";

import { Reveal, RevealWords } from "./Reveal";

const items = [
  {
    title: "Especialistas",
    desc: "Técnicos dedicados, focados em fazer certo da primeira vez.",
    icon: (
      <path d="M12 2l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4L7.4 15.7l.9-5L4.7 7.2l5-.7L12 2z" />
    ),
  },
  {
    title: "Garantia em tudo",
    desc: "Todo serviço sai com garantia. Sem letra miúda.",
    icon: <path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3zm-1 13l6-6-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z" />,
  },
  {
    title: "Peças premium",
    desc: "Componentes de qualidade, testados antes de entregar.",
    icon: <path d="M12 2l9 6.5-3.4 10.5H6.4L3 8.5 12 2zm0 3.2L6.3 9.4l1.9 6h7.6l1.9-6L12 5.2z" />,
  },
  {
    title: "Diagnóstico honesto",
    desc: "Avaliamos e passamos o orçamento antes de qualquer conserto.",
    icon: <path d="M11 3a8 8 0 105.3 14l4 4 1.4-1.4-4-4A8 8 0 0011 3zm0 2a6 6 0 110 12 6 6 0 010-12z" />,
  },
];

export function Differentials() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Por que a Moriá
          </p>
        </Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
          <RevealWords text="Confiança construída em cada detalhe." />
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.12}>
            <div className="glass glass-hover group h-full p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/5">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-gold-400" aria-hidden>
                  {it.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-cream">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
