"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { getCurrentUser } from "./session";
import { OS_STATUS, TRADE_STATUS } from "./constants";

async function nextNumber(kind: "os" | "trade") {
  if (kind === "os") {
    const last = await prisma.serviceOrder.findFirst({ orderBy: { number: "desc" } });
    return (last?.number ?? 1000) + 1;
  }
  const last = await prisma.tradeInRequest.findFirst({ orderBy: { number: "desc" } });
  return (last?.number ?? 2000) + 1;
}

export async function createOrderAction(_prev: unknown, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");

  const deviceBrand = String(formData.get("deviceBrand") ?? "").trim();
  const deviceModel = String(formData.get("deviceModel") ?? "").trim();
  const serviceType = String(formData.get("serviceType") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const mode = String(formData.get("mode") ?? "loja").trim();
  const address = String(formData.get("address") ?? "").trim();

  if (!deviceBrand || !deviceModel) return { error: "Diga a marca e o modelo do aparelho." };
  if (!serviceType) return { error: "Escolha o tipo de serviço." };
  if (mode === "delivery" && address.length < 8)
    return { error: "Pra retirada em casa, precisamos do endereço completo." };

  const number = await nextNumber("os");
  await prisma.serviceOrder.create({
    data: {
      number,
      userId: user.id,
      deviceBrand,
      deviceModel,
      serviceType,
      problem,
      mode,
      address: mode === "delivery" ? address : null,
    },
  });

  revalidatePath("/conta");
  redirect("/conta?ok=os");
}

export async function createTradeAction(_prev: unknown, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");

  const currentBrand = String(formData.get("currentBrand") ?? "").trim();
  const currentModel = String(formData.get("currentModel") ?? "").trim();
  const currentCondition = String(formData.get("currentCondition") ?? "").trim();
  const desiredModel = String(formData.get("desiredModel") ?? "").trim();

  if (!currentBrand || !currentModel) return { error: "Diga a marca e o modelo do seu aparelho atual." };
  if (!currentCondition) return { error: "Escolha o estado do aparelho." };

  const number = await nextNumber("trade");
  await prisma.tradeInRequest.create({
    data: {
      number,
      userId: user.id,
      currentBrand,
      currentModel,
      currentCondition,
      desiredModel: desiredModel || null,
    },
  });

  revalidatePath("/conta");
  redirect("/conta?ok=troca");
}

// ---- Ações da equipe ----

async function requireTeam() {
  const user = await getCurrentUser();
  if (!user || user.role !== "equipe") redirect("/entrar");
  return user;
}

export async function updateOrderAction(formData: FormData) {
  await requireTeam();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const quotedRaw = String(formData.get("quotedPrice") ?? "").replace(",", ".");
  const note = String(formData.get("note") ?? "").trim();

  if (!OS_STATUS.includes(status as (typeof OS_STATUS)[number])) return;

  const quotedPrice = quotedRaw ? Number(quotedRaw) : null;

  await prisma.serviceOrder.update({
    where: { id },
    data: {
      status,
      quotedPrice: Number.isFinite(quotedPrice as number) ? quotedPrice : null,
      note: note || null,
    },
  });
  revalidatePath("/equipe");
}

export async function updateTradeAction(formData: FormData) {
  await requireTeam();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const offerRaw = String(formData.get("offerValue") ?? "").replace(",", ".");
  const note = String(formData.get("note") ?? "").trim();

  if (!TRADE_STATUS.includes(status as (typeof TRADE_STATUS)[number])) return;

  const offerValue = offerRaw ? Number(offerRaw) : null;

  await prisma.tradeInRequest.update({
    where: { id },
    data: {
      status,
      offerValue: Number.isFinite(offerValue as number) ? offerValue : null,
      note: note || null,
    },
  });
  revalidatePath("/equipe");
}
