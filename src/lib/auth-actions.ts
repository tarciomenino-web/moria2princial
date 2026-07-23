"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { createSession, destroySession } from "./session";

function onlyDigits(v: string) {
  return (v ?? "").replace(/\D/g, "");
}

export async function registerAction(_prev: unknown, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = onlyDigits(String(formData.get("phone") ?? ""));
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { error: "Escreva seu nome completo." };
  if (phone.length < 10) return { error: "Coloque um WhatsApp válido com DDD." };
  if (password.length < 4) return { error: "A senha precisa ter pelo menos 4 caracteres." };

  const hash = await bcrypt.hash(password, 10);

  // Uma query só: tenta criar e trata o número duplicado pelo erro P2002 do banco.
  // Antes eram duas idas ao banco (checar + criar); com o pooler longe, cada ida
  // custa ~0,7s, então isso corta o tempo pela metade.
  let user;
  try {
    user = await prisma.user.create({
      data: { name, phone, email: email || null, password: hash },
    });
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") {
      return { error: "Já existe uma conta com esse número. Tente entrar." };
    }
    console.error("registerAction:", e);
    return { error: "Não conseguimos criar sua conta agora. Tente de novo em instantes." };
  }

  await createSession(user.id, user.role);
  // fora do try: redirect() funciona lançando NEXT_REDIRECT, que precisa propagar.
  redirect("/conta");
}

export async function loginAction(_prev: unknown, formData: FormData) {
  const phone = onlyDigits(String(formData.get("phone") ?? ""));
  const password = String(formData.get("password") ?? "");

  // Falha de conexão vira mensagem no form, não página de erro do servidor.
  let user;
  try {
    user = await prisma.user.findUnique({ where: { phone } });
  } catch (e) {
    console.error("loginAction:", e);
    return { error: "Não conseguimos conectar agora. Tente de novo em instantes." };
  }
  if (!user) return { error: "Número não encontrado. Confira ou crie uma conta." };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return { error: "Senha incorreta." };

  await createSession(user.id, user.role);
  redirect(user.role === "equipe" ? "/equipe" : "/conta");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
