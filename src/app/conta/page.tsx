import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { StatusTimeline } from "@/components/StatusTimeline";
import { getCurrentUser } from "@/lib/session";
import { logoutAction } from "@/lib/auth-actions";
import { prisma } from "@/lib/prisma";
import { OS_STATUS, TRADE_STATUS, serviceLabel, conditionLabel } from "@/lib/constants";

function brl(v: number | null) {
  if (v == null) return null;
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ContaPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");
  if (user.role === "equipe") redirect("/equipe");

  const { ok } = await searchParams;

  const [orders, trades] = await Promise.all([
    prisma.serviceOrder.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    prisma.tradeInRequest.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-bold text-cream">
                Olá, {user.name.split(" ")[0]}
              </h1>
              <p className="mt-1 text-cream/60">Acompanhe seus serviços e pedidos por aqui.</p>
            </div>
            <form action={logoutAction}>
              <button className="rounded-full border border-gold-500/30 px-4 py-1.5 text-sm text-cream/80 hover:bg-gold-500/10">
                Sair
              </button>
            </form>
          </div>

          {ok === "os" && (
            <p className="mt-6 rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
              Ordem de serviço aberta! A gente já vai começar o diagnóstico.
            </p>
          )}
          {ok === "troca" && (
            <p className="mt-6 rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
              Pedido de troca enviado! Vamos avaliar e te mandar uma proposta.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/conta/nova-os"
              className="gold-gradient rounded-full px-5 py-2.5 font-semibold text-wine-900 hover:opacity-90"
            >
              + Nova ordem de serviço
            </Link>
            <Link
              href="/conta/trocar-aparelho"
              className="rounded-full border border-gold-500/40 px-5 py-2.5 font-semibold text-cream hover:bg-gold-500/10"
            >
              + Trocar meu aparelho
            </Link>
          </div>

          {/* Ordens de serviço */}
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-gold-400">
              Minhas ordens de serviço
            </h2>
            {orders.length === 0 ? (
              <p className="mt-3 text-sm text-cream/50">
                Você ainda não abriu nenhuma. Que tal começar agora?
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-cream">
                          OS #{o.number} · {o.deviceBrand} {o.deviceModel}
                        </p>
                        <p className="text-sm text-cream/60">
                          {serviceLabel(o.serviceType)} ·{" "}
                          {o.mode === "delivery" ? "Retirada em casa" : "Levar na loja"}
                        </p>
                      </div>
                      {brl(o.quotedPrice) && (
                        <span className="text-sm font-semibold text-gold-300">
                          Orçamento: {brl(o.quotedPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <StatusTimeline steps={OS_STATUS} current={o.status} />
                    </div>
                    {o.note && (
                      <p className="mt-3 rounded-lg bg-wine-900/50 px-3 py-2 text-sm text-cream/70">
                        {o.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Trocas */}
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-gold-400">
              Meus pedidos de troca
            </h2>
            {trades.length === 0 ? (
              <p className="mt-3 text-sm text-cream/50">Nenhum pedido de troca ainda.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {trades.map((t) => (
                  <div key={t.id} className="card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-cream">
                          Troca #{t.number} · {t.currentBrand} {t.currentModel}
                        </p>
                        <p className="text-sm text-cream/60">
                          Estado: {conditionLabel(t.currentCondition)}
                          {t.desiredModel ? ` · Quer: ${t.desiredModel}` : ""}
                        </p>
                      </div>
                      {brl(t.offerValue) && (
                        <span className="text-sm font-semibold text-gold-300">
                          Proposta: {brl(t.offerValue)}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <StatusTimeline steps={TRADE_STATUS} current={t.status} />
                    </div>
                    {t.note && (
                      <p className="mt-3 rounded-lg bg-wine-900/50 px-3 py-2 text-sm text-cream/70">
                        {t.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
