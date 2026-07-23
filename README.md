# Site da Moriá

Site da Moriá — Celulares & Assistência Técnica. O cliente cria conta, abre ordem de
serviço (pra levar na loja ou pra vocês buscarem em casa), acompanha o status do reparo
e pede a troca do aparelho usado. A família acompanha e atualiza tudo pelo painel interno.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind 4 · Prisma · **Supabase (PostgreSQL)**

---

## Estrutura da pasta

```
dist/         saída do build (gerada pelo npm run build — não vai pro git)
prisma/       schema do banco + migrations + seed da conta da equipe
public/       imagens públicas (logos) e public/fotos (fotos da loja e do Instagram)
scripts/      utilitários avulsos (tratar fotos, tirar fundo, gerar preview)
src/app/      páginas: home, /entrar, /cadastro, /conta, /equipe
src/components/  componentes da home e dos formulários
src/lib/      acesso ao banco (prisma.ts), sessão/login (session.ts) e ações (server actions)
.env          segredos locais — NÃO vai pro git
.env.example  molde do .env pra quem for rodar o projeto
```

---

## Ligando o Supabase (uma vez só)

1. Criar o projeto em [supabase.com](https://supabase.com/dashboard) — região **South America (São Paulo)**
   deixa o site mais rápido pra Nova Iguaçu. Guardar a senha do banco que ele pedir.
2. No painel do projeto, clicar em **Connect** (no topo) → aba **ORMs** → **Prisma**.
   Ele mostra as duas URLs prontas.
3. Copiar o `.env.example` pra `.env` e colar as duas URLs:
   - `DATABASE_URL` → a da porta **6543** (pooler, usada pelo site rodando)
   - `DIRECT_URL` → a da porta **5432** (direta, usada pelas migrations)
   - trocar `[YOUR-PASSWORD]` pela senha do banco em ambas.
4. Criar as tabelas no Supabase:

```
npm run db:deploy
```

   (Se preferir, dá pra colar o conteúdo de
   `prisma/migrations/20260723000000_init/migration.sql` direto no **SQL Editor**
   do painel do Supabase — o resultado é o mesmo.)

5. Criar a conta da equipe:

```
npm run db:seed
```

---

## Rodando no seu computador

```
npm install
npm run dev
```

Abrir http://localhost:3000.

## Login da equipe (família)

Painel interno pra ver e atualizar as ordens dos clientes:

- Acessar **/entrar**
- Telefone: `1234`
- Senha: `moria2026`

Trocar essa senha depois. Pra recriar a conta (ex: banco novo), rodar `npm run db:seed`.

---

## Comandos do banco

| Comando | O que faz |
| --- | --- |
| `npm run db:deploy` | aplica no Supabase as migrations que já existem (usar em produção) |
| `npm run db:migrate` | cria uma migration nova depois de mexer no `prisma/schema.prisma` |
| `npm run db:studio` | abre uma telinha pra ver/editar os dados do banco |
| `npm run db:seed` | recria a conta de acesso da equipe |

Dá pra ver e editar os mesmos dados pelo **Table Editor** do painel do Supabase.

---

## O que já funciona

- Página inicial (marketing) na identidade vinho/dourado da Moriá
- Cadastro e login de cliente (telefone + senha)
- Abertura de ordem de serviço (levar na loja **ou** retirada em casa/delivery)
- Acompanhamento do status: Recebido → Diagnóstico → Orçamento → Aprovação →
  Reparo → Testes → Pronto → Entregue
- Pedido de troca de aparelho usado (com avaliação e proposta)
- Painel da equipe pra atualizar status, orçamento/proposta e deixar recado pro cliente

## Pendências antes de publicar

- Gerar um `SESSION_SECRET` novo pra produção:
  `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
- Trocar a senha da conta da equipe (hoje é a do seed).
- Confirmar prazo de garantia, razão social e depoimentos reais no conteúdo da home.
- Na hospedagem (Vercel/Netlify), cadastrar `DATABASE_URL`, `DIRECT_URL` e `SESSION_SECRET`
  nas variáveis de ambiente do painel.

> A versão antiga (one-page em HTML puro + banco SQLite) continua na pasta
> `Moriá/site` da área de trabalho, versionada no git, caso precise consultar.
