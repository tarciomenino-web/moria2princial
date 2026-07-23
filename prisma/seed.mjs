import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Conta interna da equipe (família) pra acessar o painel /equipe.
// Login: use o "telefone" 1234 e a senha abaixo. Troque depois.
const TEAM_PHONE = "1234";
const TEAM_PASSWORD = "moria2026";

async function main() {
  const hash = await bcrypt.hash(TEAM_PASSWORD, 10);
  await prisma.user.upsert({
    where: { phone: TEAM_PHONE },
    update: { role: "equipe" },
    create: {
      name: "Equipe Moriá",
      phone: TEAM_PHONE,
      password: hash,
      role: "equipe",
    },
  });
  console.log(`Conta da equipe pronta. Login: ${TEAM_PHONE} / senha: ${TEAM_PASSWORD}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
