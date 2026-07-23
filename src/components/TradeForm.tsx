"use client";

import { useActionState } from "react";
import { Field, Select, SubmitButton } from "./FormElements";
import { createTradeAction } from "@/lib/order-actions";
import { BRANDS, CONDITIONS } from "@/lib/constants";

type State = { error?: string } | null;

export function TradeForm() {
  const [state, action] = useActionState<State, FormData>(createTradeAction, null);

  return (
    <form action={action} className="space-y-4">
      <Select
        label="Marca do seu aparelho atual"
        name="currentBrand"
        required
        options={BRANDS.map((b) => ({ value: b, label: b }))}
      />
      <Field label="Modelo atual" name="currentModel" required placeholder="Ex: iPhone 11, Galaxy A15" />
      <Select label="Estado do aparelho" name="currentCondition" required options={CONDITIONS} />
      <Field
        label="Qual modelo você quer levar? (opcional)"
        name="desiredModel"
        placeholder="Ex: iPhone 13, ou só um mais novo"
      />
      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
      <SubmitButton>Pedir avaliação da troca</SubmitButton>
    </form>
  );
}
