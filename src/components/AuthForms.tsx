"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, SubmitButton } from "./FormElements";
import { loginAction, registerAction } from "@/lib/auth-actions";

type State = { error?: string } | null;

export function LoginForm() {
  const [state, action] = useActionState<State, FormData>(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="WhatsApp (com DDD)" name="phone" type="tel" required placeholder="21 90000-0000" autoComplete="tel" />
      <Field label="Senha" name="password" type="password" required autoComplete="current-password" />
      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
      <SubmitButton>Entrar</SubmitButton>
      <p className="text-center text-sm text-cream/60">
        Não tem conta?{" "}
        <Link href="/cadastro" className="text-gold-400 hover:underline">
          Criar agora
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action] = useActionState<State, FormData>(registerAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="Seu nome" name="name" required placeholder="Como podemos te chamar" autoComplete="name" />
      <Field label="WhatsApp (com DDD)" name="phone" type="tel" required placeholder="21 90000-0000" autoComplete="tel" />
      <Field label="E-mail (opcional)" name="email" type="email" placeholder="voce@email.com" autoComplete="email" />
      <Field label="Crie uma senha" name="password" type="password" required autoComplete="new-password" />
      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
      <SubmitButton>Criar conta</SubmitButton>
      <p className="text-center text-sm text-cream/60">
        Já tem conta?{" "}
        <Link href="/entrar" className="text-gold-400 hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
