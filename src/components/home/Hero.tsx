"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Iphone } from "./Iphone";
import { Particles } from "./Particles";
import { LOJA } from "@/lib/constants";

const pills = ["Peças premium", "Garantia total", "Especialistas", "Atendimento rápido"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const textBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const textFilter = useTransform(textBlur, (b) => `blur(${b}px)`);

  const phoneScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.18]);
  const phoneY = useTransform(scrollYProgress, [0, 0.6, 1], [0, -30, -140]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  return (
    // min-h em svh (e não h-screen): com altura fixa o conteúdo do celular estourava a
    // tela e o overflow-hidden cortava o título. Assim a seção cresce se precisar.
    // O pt maior reserva espaço pra navbar fixa; o pb, pra dica de scroll.
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pb-28 pt-24 sm:pb-24 sm:pt-20"
    >
      {/* fundo */}
      <motion.div style={{ opacity: auroraOpacity }} className="wine-aurora absolute inset-0" />
      <div className="mesh absolute inset-0 opacity-60" />
      <Particles count={22} />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="grid w-full items-center gap-10 md:grid-cols-2">
          {/* texto */}
          <motion.div style={{ opacity: textOpacity, y: textY, filter: textFilter }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
            >
              Especialistas em celulares
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.125rem] font-semibold leading-[1.08] tracking-tight text-cream sm:text-5xl md:text-6xl"
            >
              O cuidado que
              <br />
              <span className="gold-text">seu celular</span> merece.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.9 }}
              className="mt-6 max-w-md text-base leading-relaxed text-cream/60"
            >
              Assistência técnica especializada com peças premium, garantia em todos os
              serviços e atendimento rápido. Abra sua ordem online e acompanhe cada etapa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.9 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/conta/nova-os"
                className="gold-gradient rounded-full px-7 py-3.5 text-sm font-semibold text-wine-950 transition hover:scale-[1.03]"
              >
                Solicitar orçamento
              </Link>
              <a
                href={`https://wa.me/${LOJA.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-cream transition hover:border-gold-500/50"
              >
                Falar no WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 1 }}
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-cream/45"
            >
              {pills.map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold-500" />
                  {p}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* iPhone */}
          <motion.div
            style={{ scale: phoneScale, y: phoneY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            // O mockup é decorativo e tem 457px de altura: num celular comia metade da
            // tela e empurrava o título pra fora. Some abaixo de sm.
            className="hidden justify-center sm:flex"
          >
            <Iphone
              tilt
              screen={
                <div className="text-center">
                  <div className="text-2xl font-semibold tracking-[0.3em] gold-text">M</div>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>

      {/* dica de scroll */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="mx-auto flex h-8 w-5 items-start justify-center rounded-full border border-cream/25 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold-400"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/40">Role para descobrir</p>
      </motion.div>
    </section>
  );
}
