import { NavBar } from "./NavBar";
import { getCurrentUser } from "@/lib/session";

export async function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const user = await getCurrentUser();
  return (
    <>
      <NavBar
        user={user ? { name: user.name, role: user.role } : null}
        transparent={transparent}
      />
      {!transparent && <div className="h-[60px]" aria-hidden />}
    </>
  );
}
