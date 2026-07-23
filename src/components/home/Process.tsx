"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { n: "01", t: "Diagnóstico", d: "Avaliamos o aparelho e identificamos o problema real." },
  { n: "02", t: "Orçamento", d: "Você recebe o valor antes, sem compromisso e sem surpresa." },
  { n: "03", t: "Aprovação", d: "Só começamos depois do seu ok. Você no controle." },
  { n: "04", t: "Reparo", d: "Mão de obra cuidadosa e peças de qualidade." },
  { n: "05", t: "Testes", d: "Testamos tudo pra garantir o funcionamento perfeito." },
  { n: "06", t: "Entrega", d: "Aparelho pronto, com garantia. Na loja ou na sua casa." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-wine-900">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-12 w-full max-w-6xl px-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Como funciona
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
            Um processo simples e <span className="gold-text">transparente</span>.
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-5 pl-[max(1.25rem,calc((100vw-72rem)/2))]">
          {steps.map((s) => (
            <div
              key={s.n}
              className="glass relative w-[80vw] shrink-0 p-8 sm:w-[360px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-4xl font-bold text-gold-500/40">{s.n}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
              </div>
              <h3 className="text-xl font-semibold text-cream">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{s.d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
