import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { OrderForm } from "@/components/OrderForm";
import { getCurrentUser } from "@/lib/session";

export default async function NovaOsPage() {
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
            Nova ordem de serviço
          </h1>
          <p className="mt-2 text-cream/60">
            Conta pra gente o que seu aparelho precisa. Sem compromisso: o orçamento vem antes do conserto.
          </p>
          <div className="card mt-8 p-6">
            <OrderForm />
          </div>
        </div>
      </main>
    </>
  );
}
