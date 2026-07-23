"use client";

import { useActionState, useState } from "react";
import { Field, TextArea, Select, SubmitButton } from "./FormElements";
import { createOrderAction } from "@/lib/order-actions";
import { SERVICE_TYPES, BRANDS } from "@/lib/constants";

type State = { error?: string } | null;

export function OrderForm() {
  const [state, action] = useActionState<State, FormData>(createOrderAction, null);
  const [mode, setMode] = useState<"loja" | "delivery">("loja");

  return (
    <form action={action} className="space-y-4">
      <Select
        label="Marca do aparelho"
        name="deviceBrand"
        required
        options={BRANDS.map((b) => ({ value: b, label: b }))}
      />
      <Field label="Modelo" name="deviceModel" required placeholder="Ex: iPhone 11, Galaxy A15" />
      <Select label="Tipo de serviço" name="serviceType" required options={SERVICE_TYPES} />
      <TextArea
        label="Conta o que houve (opcional)"
        name="problem"
        placeholder="Ex: caiu e a tela trincou, não dá mais imagem"
      />

      <div>
        <span className="mb-2 block text-sm text-cream/80">Como você prefere?</span>
        <input type="hidden" name="mode" value={mode} />
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode("loja")}
            className={`rounded-lg border px-4 py-3 text-sm ${
              mode === "loja"
                ? "border-gold-500 bg-gold-500/10 text-cream"
                : "border-gold-500/25 text-cream/60"
            }`}
          >
            Levar na loja
          </button>
          <button
            type="button"
            onClick={() => setMode("delivery")}
            className={`rounded-lg border px-4 py-3 text-sm ${
              mode === "delivery"
                ? "border-gold-500 bg-gold-500/10 text-cream"
                : "border-gold-500/25 text-cream/60"
            }`}
          >
            Buscar em casa
          </button>
        </div>
      </div>

      {mode === "delivery" && (
        <TextArea
          label="Endereço para retirada"
          name="address"
          required
          placeholder="Rua, número, bairro, complemento e ponto de referência"
        />
      )}

      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
      <SubmitButton>Abrir ordem de serviço</SubmitButton>
    </form>
  );
}
