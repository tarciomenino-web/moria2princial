import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/AuthForms";
import { getCurrentUser } from "@/lib/session";

export default async function EntrarPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.role === "equipe" ? "/equipe" : "/conta");

  return (
    <>
      <SiteHeader />
      <main className="wine-aurora flex-1">
        <div className="mx-auto max-w-md px-4 py-16">
          <h1 className="font-display text-3xl font-bold text-cream">Entrar</h1>
          <p className="mt-2 text-cream/60">Acesse sua conta pra acompanhar seus serviços.</p>
          <div className="card mt-8 p-6">
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}
