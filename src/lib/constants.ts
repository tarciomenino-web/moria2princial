export const OS_STATUS = [
  "Recebido",
  "Diagnóstico",
  "Orçamento",
  "Aprovação",
  "Reparo",
  "Testes",
  "Pronto",
  "Entregue",
] as const;

export const TRADE_STATUS = [
  "Recebido",
  "Avaliação",
  "Proposta enviada",
  "Fechado",
  "Recusado",
] as const;

export const SERVICE_TYPES: { value: string; label: string }[] = [
  { value: "tela", label: "Troca de tela" },
  { value: "bateria", label: "Troca de bateria" },
  { value: "conector", label: "Conector de carga" },
  { value: "molhado", label: "Aparelho molhado" },
  { value: "desbloqueio", label: "Desbloqueio de conta" },
  { value: "outro", label: "Outro / não sei" },
];

export const BRANDS = ["iPhone", "Samsung", "Motorola", "Xiaomi", "Realme", "Outra"];

export const CONDITIONS: { value: string; label: string }[] = [
  { value: "otimo", label: "Ótimo — sem marcas de uso" },
  { value: "bom", label: "Bom — pequenas marcas" },
  { value: "regular", label: "Regular — bem usado" },
  { value: "quebrado", label: "Com defeito / quebrado" },
];

export function serviceLabel(value: string) {
  return SERVICE_TYPES.find((s) => s.value === value)?.label ?? value;
}

export function conditionLabel(value: string) {
  return CONDITIONS.find((c) => c.value === value)?.label ?? value;
}

// Loja — dados reais
export const LOJA = {
  nome: "Moriá — Celulares & Assistência Técnica",
  whatsapp: "5521987410298",
  whatsappLabel: "(21) 98741-0298",
  instagram: "moria.cell",
  instagramLabel: "@moria.cell",
  endereco: "Rua Carmem de Freitas Salgado, 279 — Califórnia, Nova Iguaçu - RJ, CEP 26220-470",
  enderecoCurto: "Califórnia, Nova Iguaçu - RJ",
  mapsQuery: "Rua Carmem de Freitas Salgado 279 Califórnia Nova Iguaçu RJ 26220-470",
};
