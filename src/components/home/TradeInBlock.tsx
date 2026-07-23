"use client";

import Link from "next/link";
import { Reveal, RevealWords } from "./Reveal";

export function TradeInBlock() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="glass relative overflow-hidden p-10 sm:p-14">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(155,39,64,0.4),transparent)] blur-2xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              Troca inteligente
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
              <RevealWords text="Troque seu usado por um mais novo." />
            </h2>
            <p className="mt-5 max-w-md text-cream/60">
              Manda os dados do seu aparelho atual. A gente avalia e te faz uma proposta
              justa pra você levar um modelo mais recente, sem complicação.
            </p>
            <Link
              href="/conta/trocar-aparelho"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-wine-950 transition hover:scale-[1.03]"
            >
              Avaliar meu aparelho
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5z" />
              </svg>
            </Link>
          </div>
          <div className="space-y-4">
            {[
              "Avaliação sem compromisso",
              "Proposta transparente",
              "Acompanhe tudo pela sua conta",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  </span>
                  <span className="text-sm text-cream/80">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
