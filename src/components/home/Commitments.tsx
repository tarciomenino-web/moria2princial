"use client";

import { Reveal } from "./Reveal";

const commitments = [
  { t: "Garantia", d: "em todos os serviços" },
  { t: "Orçamento", d: "sempre antes do conserto" },
  { t: "Delivery", d: "buscamos na sua casa" },
  { t: "Marcas", d: "iPhone, Samsung, Xiaomi e mais" },
];

const brands = ["iPhone", "Samsung", "Motorola", "Xiaomi", "Realme"];

export function Commitments() {
  return (
    <section className="relative border-y border-white/5 bg-wine-900/50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-semibold gold-text sm:text-4xl">{c.t}</p>
                <p className="mt-2 text-sm text-cream/55">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* marcas */}
        <div className="relative mt-16 overflow-hidden">
          <div className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-cream/40">
            Atendemos as principais marcas
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {brands.map((b) => (
              <span
                key={b}
                className="text-lg font-semibold text-cream/45 transition hover:text-gold-400"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
