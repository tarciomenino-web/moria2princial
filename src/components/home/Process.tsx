"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Cada etapa tem foto: diagnóstico, orçamento e entrega usam as artes de mesmo nome;
// aprovação, reparo e testes reaproveitam as fotos do balcão e da bancada.
const steps = [
  {
    n: "01",
    t: "Diagnóstico",
    d: "Avaliamos o aparelho e identificamos o problema real. Sem custo.",
    img: "/img/processo-diagnostico.webp",
  },
  {
    n: "02",
    t: "Orçamento",
    d: "Você recebe o valor antes, sem compromisso e sem surpresa.",
    img: "/img/processo-orcamento.webp",
  },
  {
    n: "03",
    t: "Aprovação",
    d: "Só começamos depois do seu ok. Você no controle.",
    img: "/img/loja-balcao.webp",
  },
  {
    n: "04",
    t: "Reparo",
    d: "Mão de obra cuidadosa e peças de qualidade.",
    img: "/img/servico-tela.webp",
  },
  {
    n: "05",
    t: "Testes",
    d: "Testamos tudo pra garantir o funcionamento perfeito.",
    img: "/img/loja-bancada.webp",
  },
  {
    n: "06",
    t: "Entrega",
    d: "Aparelho pronto, com garantia. Na loja ou na sua casa.",
    img: "/img/processo-entrega.webp",
  },
];

// Com offset ["start start","end end"] o progresso 0→1 cobre exatamente o trecho em que
// o sticky segura. O trilho termina em 0.9 pra o último card ficar parado um instante
// antes de a seção liberar.
const FIM_DO_TRILHO = 0.9;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Quanto o trilho precisa andar pra revelar o último card, medido de verdade.
  // Com uma porcentagem fixa o card 06 ficava cortado fora do desktop.
  const [percurso, setPercurso] = useState(0);

  useEffect(() => {
    const el = trilhoRef.current;
    if (!el) return;
    const medir = () => {
      const folga = 24; // respiro à direita do último card
      setPercurso(Math.max(0, el.scrollWidth - window.innerWidth + folga));
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, FIM_DO_TRILHO], [0, -percurso]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-wine-900">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-6xl px-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Como funciona
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
            Um processo simples e <span className="gold-text">transparente</span>.
          </h2>
        </div>

        <motion.div
          ref={trilhoRef}
          style={{ x }}
          className="flex gap-6 px-5 pl-[max(1.25rem,calc((100vw-72rem)/2))]"
        >
          {steps.map((s) => (
            <div
              key={s.n}
              className="glass relative w-[80vw] shrink-0 overflow-hidden sm:w-[360px]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.t}
                  fill
                  sizes="(max-width: 640px) 80vw, 360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/35 to-transparent" />
                <span className="absolute left-5 top-4 rounded-full bg-wine-950/70 px-2.5 py-1 text-xs font-bold tracking-widest text-gold-400 backdrop-blur-sm">
                  {s.n}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-cream">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">{s.d}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
