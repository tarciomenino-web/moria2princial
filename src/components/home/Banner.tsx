"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

// Banner "celular quebrado não combina com espera" — a arte já traz o texto embutido,
// então ele aparece só de sm pra cima: num celular a proporção 2.7:1 deixaria a
// tipografia ilegível. No mobile a mesma mensagem vem em texto, logo abaixo.
export function Banner() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <div className="hairline mx-auto max-w-6xl" />

      <Reveal>
        <div className="relative mx-auto mt-10 hidden max-w-[1600px] px-0 sm:block">
          <Image
            src="/img/banner-espera.webp"
            alt="Celular quebrado não combina com espera: diagnóstico na hora, orçamento transparente e o seu celular de volta funcionando."
            width={1900}
            height={687}
            sizes="100vw"
            className="h-auto w-full [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
          />
        </div>
      </Reveal>

      {/* Versão de texto pro mobile */}
      <div className="px-5 sm:hidden">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
          Por que a Moriá
        </p>
        <h2 className="text-center text-3xl font-semibold leading-tight tracking-tight text-cream">
          Celular quebrado não <span className="gold-text">combina com espera</span>.
        </h2>
        <div className="mt-7 space-y-3">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3.5">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/40">
              Do jeito antigo
            </p>
            <p className="text-sm text-cream/60">
              Aparelho parado na gaveta ou numa fila sem previsão de volta.
            </p>
          </div>
          <div className="rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] px-4 py-3.5">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              Do jeito Moriá
            </p>
            <p className="text-sm text-cream/80">
              <strong className="font-semibold text-cream">Diagnóstico na hora</strong>, orçamento
              transparente e o seu celular de volta funcionando.
            </p>
          </div>
        </div>
      </div>

      <div className="hairline mx-auto mt-10 max-w-6xl sm:mt-16" />
    </section>
  );
}
