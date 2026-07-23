"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LOJA } from "@/lib/constants";

type NavUser = { name: string; role: string } | null;

export function NavBar({
  user,
  transparent = false,
}: {
  user: NavUser;
  transparent?: boolean;
}) {
  const [scrolled, setScrolled] = useState(!transparent);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/8 bg-wine-900/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="text-base font-semibold tracking-[0.25em] gold-text">
          MORIÁ
        </Link>

        <nav className="flex items-center gap-2 text-sm sm:gap-4">
          {user ? (
            <>
              {user.role === "equipe" && (
                <Link href="/equipe" className="hidden text-cream/70 hover:text-gold-400 sm:block">
                  Painel
                </Link>
              )}
              <Link
                href="/conta"
                className="rounded-full border border-white/15 px-4 py-1.5 text-cream transition hover:border-gold-500/50"
              >
                Minha conta
              </Link>
            </>
          ) : (
            <>
              <Link href="/entrar" className="hidden text-cream/70 hover:text-gold-400 sm:block">
                Entrar
              </Link>
              <a
                href={`https://wa.me/${LOJA.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-cream transition hover:border-gold-500/50"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#25D366]" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2Z" />
                </svg>
                WhatsApp
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
