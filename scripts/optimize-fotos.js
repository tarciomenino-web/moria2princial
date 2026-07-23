// optimize-fotos.js — converte as PNGs pesadas de public/fotos/ em WebP leve em public/img/.
// O logo ganha fundo transparente por chroma key de luminância (dourado claro sobre vinho escuro).
// Rode: npm run fotos
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "public", "fotos");
const outDir = path.join(__dirname, "..", "public", "img");

// [origem, saída, largura máx, qualidade]
const photos = [
  ["troca de tela 1.png", "servico-tela.webp", 1000, 0.8],
  ["Troca de bateria 2.png", "servico-bateria.webp", 1000, 0.8],
  ["Conector de carga 3.png", "servico-conector.webp", 1000, 0.8],
  ["Aparelho molhado 4.png", "servico-molhado.webp", 1000, 0.8],
  ["Desbloqueio de conta 5.png", "servico-desbloqueio.webp", 1000, 0.8],
  ["Acessórios e recondicionados 6.png", "servico-acessorios.webp", 1000, 0.8],
  ["Diagnóstico grátis 7.png", "processo-diagnostico.webp", 900, 0.8],
  ["Orçamento e sua aprovação 8.png", "processo-orcamento.webp", 900, 0.8],
  ["Entrega de smartphone 9.png", "processo-entrega.webp", 900, 0.8],
  ["troque o velho pelo novo 10.png", "troca-aparelho.webp", 1200, 0.82],
  ["loja 1.png", "loja-balcao.webp", 1400, 0.82],
  ["loja 2.png", "loja-bancada.webp", 1400, 0.82],
];

// Par antes/depois da seção "Transformação": os dois aparelhos saem da MESMA foto,
// então dividem mão, bancada, luz e enquadramento — o que faz a transição de wipe
// ler como um reparo de verdade, e não como duas fotos diferentes.
// [origem, saída, x, y, w, h, largura final, qualidade]
const recortes = [
  ["troca de tela 1.png", "reparo-antes.webp", 300, 140, 490, 760, 620, 0.84],
  ["troca de tela 1.png", "reparo-depois.webp", 780, 95, 490, 760, 620, 0.84],
];

// O logo sai do "logo 2.png" (dourado sobre vinho): recorta no conteúdo e vira PNG transparente.
// Duas variantes: o lockup inteiro (telas grandes) e só a montanha (navbar, onde o
// subtítulo ficaria ilegível). keepTop corta a fração superior do lockup.
const logos = [
  ["logo 2.png", "logo-moria.png", 620, 1],
  ["logo 2.png", "logo-marca.png", 240, 0.64],
];

const encodePhoto = async (page, dataUrl, w, q) =>
  page.evaluate(
    async ({ dataUrl, w, q }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = dataUrl;
      });
      const scale = Math.min(1, w / img.width);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/webp", q);
    },
    { dataUrl, w, q }
  );

const encodeCrop = async (page, dataUrl, box, w, q) =>
  page.evaluate(
    async ({ dataUrl, box, w, q }) => {
      const [sx, sy, sw, sh] = box;
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = dataUrl;
      });
      const scale = Math.min(1, w / sw);
      const c = document.createElement("canvas");
      c.width = Math.round(sw * scale);
      c.height = Math.round(sh * scale);
      const ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
      return c.toDataURL("image/webp", q);
    },
    { dataUrl, box, w, q }
  );

const encodeLogo = async (page, dataUrl, w, keepTop) =>
  page.evaluate(
    async ({ dataUrl, w, keepTop }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = dataUrl;
      });
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Alpha pela luminância: o vinho do fundo some, o dourado e o texto claro ficam.
      const LO = 52;
      const HI = 112;
      const d = ctx.getImageData(0, 0, c.width, c.height);
      const px = d.data;
      let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
      for (let i = 0; i < px.length; i += 4) {
        const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
        const a = Math.max(0, Math.min(1, (lum - LO) / (HI - LO)));
        px[i + 3] = Math.round(a * 255);
        if (a > 0.2) {
          const p = i / 4;
          const x = p % c.width;
          const y = (p / c.width) | 0;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
      ctx.putImageData(d, 0, 0);

      // Só a montanha: corta a fração superior e reencontra os limites laterais,
      // senão sobraria a largura do texto "MORIÁ" como padding vazio dos lados.
      if (keepTop < 1) {
        maxY = minY + Math.round((maxY - minY + 1) * keepTop) - 1;
        minX = c.width;
        maxX = 0;
        for (let y = minY; y <= maxY; y++) {
          for (let x = 0; x < c.width; x++) {
            if (px[(y * c.width + x) * 4 + 3] > 51) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
            }
          }
        }
      }

      // recorta no conteúdo com uma folga pequena e reescala
      const pad = 12;
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(c.width - 1, maxX + pad);
      maxY = Math.min(c.height - 1, maxY + pad);
      const cw = maxX - minX + 1;
      const ch = maxY - minY + 1;
      const scale = Math.min(1, w / cw);
      const out = document.createElement("canvas");
      out.width = Math.round(cw * scale);
      out.height = Math.round(ch * scale);
      const octx = out.getContext("2d");
      octx.imageSmoothingQuality = "high";
      octx.drawImage(c, minX, minY, cw, ch, 0, 0, out.width, out.height);
      return out.toDataURL("image/png");
    },
    { dataUrl, w, keepTop }
  );

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalIn = 0;
  let totalOut = 0;

  const jobs = [
    ...photos.map(([src, out, w, q]) => ({ kind: "photo", src, out, w, q })),
    ...recortes.map(([src, out, x, y, cw, ch, w, q]) => ({
      kind: "crop",
      src,
      out,
      box: [x, y, cw, ch],
      w,
      q,
    })),
    ...logos.map(([src, out, w, keepTop]) => ({ kind: "logo", src, out, w, keepTop })),
  ];

  for (const job of jobs) {
    const { kind, src: srcName, out: outName, w, q } = job;
    const srcPath = path.join(srcDir, srcName);
    if (!fs.existsSync(srcPath)) {
      console.log("PULOU (não achei):", srcName);
      continue;
    }
    const raw = fs.readFileSync(srcPath);
    const dataUrl = "data:image/png;base64," + raw.toString("base64");
    const result =
      kind === "logo"
        ? await encodeLogo(page, dataUrl, w, job.keepTop)
        : kind === "crop"
          ? await encodeCrop(page, dataUrl, job.box, w, q)
          : await encodePhoto(page, dataUrl, w, q);
    const buf = Buffer.from(result.split(",")[1], "base64");
    fs.writeFileSync(path.join(outDir, outName), buf);
    totalIn += raw.length;
    totalOut += buf.length;
    const kb = (n) => Math.round(n / 1024) + " KB";
    console.log(`OK  ${outName.padEnd(28)} ${kb(raw.length).padStart(8)} -> ${kb(buf.length).padStart(7)}`);
  }

  await browser.close();
  const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";
  console.log(`\nTotal: ${mb(totalIn)} -> ${mb(totalOut)} (${Math.round((1 - totalOut / totalIn) * 100)}% menor)`);
})().catch((e) => {
  console.error("Falha:", e?.message ?? e);
  process.exit(1);
});
