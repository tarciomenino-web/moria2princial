"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Antes/depois com foto real: as duas imagens saem do mesmo clique da bancada, então
// mão, luz e enquadramento batem — a divisória correndo lê como o reparo acontecendo.
// Com offset ["start start","end end"] o progresso vai de 0 a 1 exatamente enquanto o
// sticky segura, então dá pra usar a janela quase inteira. O reparo fecha em 0.8 e
// sobra um respiro com a tela nova antes da seção liberar.
const INICIO = 0.1;
const FIM = 0.8;

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 0 = tela estilhaçada, 100 = tela nova
  const reparo = useTransform(scrollYProgress, [INICIO, FIM], [0, 100], { clamp: true });

  // inset(topo direita baixo esquerda): a direita recua de 100% a 0%, revelando a tela
  // nova da esquerda pra direita conforme o reparo avança.
  const clipDepois = useTransform(reparo, (p) => `inset(0 ${100 - p}% 0 0)`);
  const divisoriaX = useTransform(reparo, (p) => `${p}%`);
  const larguraBarra = useTransform(reparo, (p) => `${p}%`);

  // nas pontas a divisória encostaria na borda e viraria um contorno parado
  const opacidadeDivisoria = useTransform(reparo, [0, 8, 92, 100], [0, 1, 1, 0]);
  const opacidadeAntes = useTransform(reparo, [0, 45], [1, 0]);
  const opacidadeDepois = useTransform(reparo, [55, 100], [0, 1]);
  // o brilho da tela nova acende junto com o fim do reparo
  const brilho = useTransform(reparo, [40, 100], [0, 0.55]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="wine-aurora absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              Transformação
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
              Devolvemos a <span className="gold-text">vida</span> ao seu aparelho.
            </h2>
            <p className="mt-5 max-w-md text-cream/60">
              Tela estilhaçada de manhã, aparelho como novo na saída. Role e acompanhe a
              troca acontecer.
            </p>

            <div className="mt-8 max-w-xs">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div className="gold-gradient h-full" style={{ width: larguraBarra }} />
              </div>
              <div className="mt-3 flex justify-between text-xs uppercase tracking-widest">
                <motion.span style={{ opacity: opacidadeAntes }} className="text-cream/50">
                  Tela estilhaçada
                </motion.span>
                <motion.span style={{ opacity: opacidadeDepois }} className="text-gold-400">
                  Como nova
                </motion.span>
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <div className="relative aspect-[490/760] w-[240px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] sm:w-[300px]">
              {/* estado inicial: tela quebrada */}
              <Image
                src="/img/reparo-antes.webp"
                alt="Aparelho com a tela estilhaçada, na bancada da Moriá"
                fill
                sizes="(max-width: 640px) 240px, 300px"
                className="object-cover"
              />

              {/* estado final: revelado da esquerda pra direita conforme o scroll */}
              <motion.div style={{ clipPath: clipDepois }} className="absolute inset-0">
                <Image
                  src="/img/reparo-depois.webp"
                  alt="O mesmo aparelho com a tela nova, já reparado"
                  fill
                  sizes="(max-width: 640px) 240px, 300px"
                  className="object-cover"
                />
                <motion.div
                  style={{ opacity: brilho }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,180,90,0.45),transparent_65%)]"
                />
              </motion.div>

              {/* a linha que corre: é o corte do reparo */}
              <motion.div
                style={{ left: divisoriaX, opacity: opacidadeDivisoria }}
                className="absolute inset-y-0 w-px -translate-x-1/2 bg-gold-400/80 shadow-[0_0_18px_2px_rgba(240,216,136,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
