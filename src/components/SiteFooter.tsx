import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { LOJA } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-wine-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3">
        <div>
          <Wordmark asLink={false} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/50">
            Assistência técnica especializada em celulares. Conserto com garantia, orçamento
            transparente e atendimento pessoal.
          </p>
        </div>
        <div className="text-sm text-cream/55">
          <p className="mb-3 font-semibold text-cream">Loja</p>
          <p className="leading-relaxed">{LOJA.endereco}</p>
        </div>
        <div className="text-sm text-cream/55">
          <p className="mb-3 font-semibold text-cream">Contato</p>
          <a
            href={`https://wa.me/${LOJA.whatsapp}`}
            className="block transition hover:text-gold-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {LOJA.whatsappLabel}
          </a>
          <a
            href={`https://instagram.com/${LOJA.instagram}`}
            className="block transition hover:text-gold-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            {LOJA.instagramLabel}
          </a>
          <Link href="/entrar" className="mt-3 block transition hover:text-gold-400">
            Área do cliente
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-cream/35">
        © {new Date().getFullYear()} Moriá Celulares & Assistência Técnica.
      </div>
    </footer>
  );
}
