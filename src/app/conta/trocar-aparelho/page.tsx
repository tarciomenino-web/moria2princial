import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { TradeForm } from "@/components/TradeForm";
import { getCurrentUser } from "@/lib/session";

export default async function TrocarAparelhoPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-10">
          <Link href="/conta" className="text-sm text-cream/60 hover:text-gold-400">
            ← Voltar pra minha conta
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-cream">
            Trocar meu aparelho
          </h1>
          <p className="mt-2 text-cream/60">
            Manda os dados do seu aparelho atual. A gente avalia e te faz uma proposta pra
            você levar um modelo mais novo.
          </p>
          <div className="card mt-8 p-6">
            <TradeForm />
          </div>
        </div>
      </main>
    </>
  );
}
