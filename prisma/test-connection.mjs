// Testa a conexão com o Supabase pelo mesmo caminho que o app usa (DATABASE_URL).
// Faz um roundtrip real de escrita/leitura e limpa tudo no fim. Rode: npm run db:test
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ok = (m) => console.log(`  OK   ${m}`);

const t0 = Date.now();
try {
  await prisma.$connect();
  ok(`conectou via DATABASE_URL (${Date.now() - t0} ms)`);

  const [{ version }] = await prisma.$queryRaw`SELECT version()`;
  ok(`servidor: ${version.split(" on ")[0]}`);

  const tables = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
  ok(`tabelas em public: ${tables.map((t) => t.tablename).join(", ")}`);

  const applied = await prisma.$queryRaw`
    SELECT migration_name FROM _prisma_migrations ORDER BY finished_at`;
  for (const m of applied) ok(`migration aplicada: ${m.migration_name}`);

  console.log("\n  --- roundtrip de escrita/leitura ---");
  const phone = `teste-conexao-${Date.now()}`;
  const user = await prisma.user.create({
    data: { name: "Teste de Conexão", phone, password: "x" },
  });
  ok(`INSERT  User id=${user.id} role=${user.role}`);

  const order = await prisma.serviceOrder.create({
    data: {
      number: Math.floor(Math.random() * 1e9),
      userId: user.id,
      deviceBrand: "Apple",
      deviceModel: "iPhone 13",
      problem: "tela trincada",
      serviceType: "tela",
      mode: "loja",
    },
  });
  ok(`INSERT  ServiceOrder n=${order.number} status=${order.status}`);

  const found = await prisma.user.findUnique({
    where: { phone },
    include: { serviceOrders: true },
  });
  ok(`SELECT  join trouxe ${found.serviceOrders.length} ordem(ns) — FK funcionando`);

  await prisma.serviceOrder.delete({ where: { id: order.id } });
  await prisma.user.delete({ where: { id: user.id } });
  ok("DELETE  registros de teste removidos");

  const counts = {
    User: await prisma.user.count(),
    ServiceOrder: await prisma.serviceOrder.count(),
    TradeInRequest: await prisma.tradeInRequest.count(),
  };
  ok(`contagem final: ${JSON.stringify(counts)}`);

  console.log("\nTUDO CERTO — conexão, schema e CRUD validados.");
} catch (e) {
  console.error("\nFALHOU:", e.code ?? "", e.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
