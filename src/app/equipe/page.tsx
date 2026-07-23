import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { StatusBadge } from "@/components/StatusTimeline";
import { getCurrentUser } from "@/lib/session";
import { logoutAction } from "@/lib/auth-actions";
import { updateOrderAction, updateTradeAction } from "@/lib/order-actions";
import { prisma } from "@/lib/prisma";
import { OS_STATUS, TRADE_STATUS, serviceLabel, conditionLabel } from "@/lib/constants";

export default async function EquipePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");
  if (user.role !== "equipe") redirect("/conta");

  const [orders, trades] = await Promise.all([
    prisma.serviceOrder.findMany({ orderBy: { createdAt: "desc" }, include: { user: true } }),
    prisma.tradeInRequest.findMany({ orderBy: { createdAt: "desc" }, include: { user: true } }),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-bold text-cream">Painel da Moriá</h1>
              <p className="mt-1 text-cream/60">Ordens de serviço e pedidos de troca dos clientes.</p>
            </div>
            <form action={logoutAction}>
              <button className="rounded-full border border-gold-500/30 px-4 py-1.5 text-sm text-cream/80 hover:bg-gold-500/10">
                Sair
              </button>
            </form>
          </div>

          {/* Ordens de serviço */}
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-gold-400">
              Ordens de serviço ({orders.length})
            </h2>
            <div className="mt-4 space-y-4">
              {orders.length === 0 && (
                <p className="text-sm text-cream/50">Nenhuma ordem ainda.</p>
              )}
              {orders.map((o) => (
                <div key={o.id} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-cream">
                        OS #{o.number} · {o.deviceBrand} {o.deviceModel}
                      </p>
                      <p className="text-sm text-cream/60">
                        {serviceLabel(o.serviceType)} ·{" "}
                        {o.mode === "delivery" ? "Retirada em casa" : "Levar na loja"}
                      </p>
                      <p className="mt-1 text-sm text-cream/60">
                        Cliente: {o.user.name} · {o.user.phone}
                      </p>
                      {o.problem && (
                        <p className="mt-1 text-sm text-cream/50">“{o.problem}”</p>
                      )}
                      {o.address && (
                        <p className="mt-1 text-sm text-cream/50">Endereço: {o.address}</p>
                      )}
                    </div>
                    <StatusBadge status={o.status} />
                  </div>

                  <form
                    action={updateOrderAction}
                    className="mt-4 grid gap-3 border-t border-gold-500/15 pt-4 sm:grid-cols-4"
                  >
                    <input type="hidden" name="id" value={o.id} />
                    <label className="text-sm">
                      <span className="mb-1 block text-cream/70">Status</span>
                      <select
                        name="status"
                        defaultValue={o.status}
                        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-2 py-2 text-cream focus:border-gold-500 focus:outline-none"
                      >
                        {OS_STATUS.map((s) => (
                          <option key={s} value={s} className="text-wine-900">
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm">
                      <span className="mb-1 block text-cream/70">Orçamento (R$)</span>
                      <input
                        name="quotedPrice"
                        defaultValue={o.quotedPrice ?? ""}
                        placeholder="0,00"
                        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-2 py-2 text-cream focus:border-gold-500 focus:outline-none"
                      />
                    </label>
                    <label className="text-sm sm:col-span-2">
                      <span className="mb-1 block text-cream/70">Observação pro cliente</span>
                      <input
                        name="note"
                        defaultValue={o.note ?? ""}
                        placeholder="Ex: peça chega quarta"
                        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-2 py-2 text-cream focus:border-gold-500 focus:outline-none"
                      />
                    </label>
                    <div className="sm:col-span-4">
                      <button className="gold-gradient rounded-full px-5 py-2 text-sm font-semibold text-wine-900 hover:opacity-90">
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </section>

          {/* Trocas */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-gold-400">
              Pedidos de troca ({trades.length})
            </h2>
            <div className="mt-4 space-y-4">
              {trades.length === 0 && (
                <p className="text-sm text-cream/50">Nenhum pedido de troca ainda.</p>
              )}
              {trades.map((t) => (
                <div key={t.id} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-cream">
                        Troca #{t.number} · {t.currentBrand} {t.currentModel}
                      </p>
                      <p className="text-sm text-cream/60">
                        Estado: {conditionLabel(t.currentCondition)}
                        {t.desiredModel ? ` · Quer: ${t.desiredModel}` : ""}
                      </p>
                      <p className="mt-1 text-sm text-cream/60">
                        Cliente: {t.user.name} · {t.user.phone}
                      </p>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>

                  <form
                    action={updateTradeAction}
                    className="mt-4 grid gap-3 border-t border-gold-500/15 pt-4 sm:grid-cols-4"
                  >
                    <input type="hidden" name="id" value={t.id} />
                    <label className="text-sm">
                      <span className="mb-1 block text-cream/70">Status</span>
                      <select
                        name="status"
                        defaultValue={t.status}
                        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-2 py-2 text-cream focus:border-gold-500 focus:outline-none"
                      >
                        {TRADE_STATUS.map((s) => (
                          <option key={s} value={s} className="text-wine-900">
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm">
                      <span className="mb-1 block text-cream/70">Proposta (R$)</span>
                      <input
                        name="offerValue"
                        defaultValue={t.offerValue ?? ""}
                        placeholder="0,00"
                        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-2 py-2 text-cream focus:border-gold-500 focus:outline-none"
                      />
                    </label>
                    <label className="text-sm sm:col-span-2">
                      <span className="mb-1 block text-cream/70">Observação pro cliente</span>
                      <input
                        name="note"
                        defaultValue={t.note ?? ""}
                        placeholder="Ex: proposta válida por 3 dias"
                        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-2 py-2 text-cream focus:border-gold-500 focus:outline-none"
                      />
                    </label>
                    <div className="sm:col-span-4">
                      <button className="gold-gradient rounded-full px-5 py-2 text-sm font-semibold text-wine-900 hover:opacity-90">
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
