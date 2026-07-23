"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Particles } from "./Particles";
import { LOJA } from "@/lib/constants";

export function FinalCta() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    LOJA.mapsQuery
  )}`;

  return (
    <>
      {/* Localização */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="glass grid gap-8 p-8 sm:p-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
              Onde estamos
            </p>
            <h3 className="text-2xl font-semibold text-cream">Passa na loja</h3>
            <p className="mt-3 text-cream/60">{LOJA.endereco}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-cream transition hover:border-gold-500/50"
              >
                Como chegar
              </a>
              <a
                href={`https://instagram.com/${LOJA.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-cream transition hover:border-gold-500/50"
              >
                {LOJA.instagramLabel}
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <a href={`tel:+${LOJA.whatsapp}`} className="group flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.2 2.4.56 3.5a1 1 0 01-.24 1l-2.22 2.3z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-cream/45">Ligar / WhatsApp</p>
                <p className="text-cream group-hover:text-gold-400">{LOJA.whatsappLabel}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div className="wine-aurora absolute inset-0" />
        <div className="mesh absolute inset-0 opacity-40" />
        <Particles count={20} />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold-400">
              Pronto para começar?
            </p>
          </Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-semibold leading-tight tracking-tight text-cream sm:text-6xl"
          >
            Seu celular nas <span className="gold-text">melhores mãos</span>.
          </motion.h2>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/conta/nova-os"
                className="gold-gradient rounded-full px-8 py-4 text-sm font-semibold text-wine-950 transition hover:scale-[1.03]"
              >
                Solicitar orçamento
              </Link>
              <a
                href={`https://wa.me/${LOJA.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-cream transition hover:border-gold-500/50"
              >
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
