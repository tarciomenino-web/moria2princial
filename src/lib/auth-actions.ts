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

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) return { error: "Já existe uma conta com esse número. Tente entrar." };

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, phone, email: email || null, password: hash },
  });

  await createSession(user.id, user.role);
  redirect("/conta");
}

export async function loginAction(_prev: unknown, formData: FormData) {
  const phone = onlyDigits(String(formData.get("phone") ?? ""));
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { phone } });
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
