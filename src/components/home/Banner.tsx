"use client";

import { Reveal } from "./Reveal";

// Antes o texto vinha "queimado" dentro da imagem banner-espera.webp — não dava pra
// editar e ficava ilegível no mobile. Agora é texto real: nítido, responsivo e editável.
export function Banner() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="wine-aurora absolute inset-0 opacity-40" />
      <div className="hairline mx-auto max-w-6xl" />

      <div className="relative mx-auto max-w-3xl px-5 pt-12 text-center sm:pt-16">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Sem espera
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-cream sm:text-4xl md:text-5xl">
            Porque na Moriá seu mundo <span className="gold-text">não pode esperar</span>.
          </h2>
        </Reveal>
      </div>

      {/* Contraste: do jeito antigo → do jeito Moriá */}
      <div className="relative mx-auto mt-12 grid max-w-4xl items-stretch gap-4 px-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
        <Reveal>
          <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 5.7 18.3l-1.4-1.4L10.6 12 4.3 5.7l1.4-1.4L12 10.6l4.9-4.9z" />
                </svg>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                Do jeito antigo
              </p>
            </div>
            <p className="text-sm leading-relaxed text-cream/60">
              Aparelho parado na gaveta ou numa fila sem previsão de volta.
            </p>
          </div>
        </Reveal>

        {/* seta de transição — vira pra baixo no mobile */}
        <Reveal delay={0.1} className="flex items-center justify-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 text-gold-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-90 fill-current sm:rotate-0" aria-hidden>
              <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z" />
            </svg>
          </span>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="h-full rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] px-6 py-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                Do jeito Moriá
              </p>
            </div>
            <p className="text-sm leading-relaxed text-cream/80">
              <strong className="font-semibold text-cream">Diagnóstico na hora</strong>, orçamento
              transparente e o seu celular de volta funcionando.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="hairline mx-auto mt-14 max-w-6xl sm:mt-20" />
    </section>
  );
}
