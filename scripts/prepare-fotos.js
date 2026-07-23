// prepare-fotos.js — redimensiona e comprime as fotos reais pra JPEG leve (e otimiza o logo PNG)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const fotosDir = "C:\\Users\\SAMSUNG\\Downloads\\prompts\\SITE\\fotos";
const assetsDir = path.join(__dirname, "assets");

// [arquivo de origem, saída, largura máx, qualidade, base]
const jobs = [
  ["troca de tela 1.png", "foto-hero.jpg", 1200, 0.82, fotosDir],
  ["Entrega de smartphone 9.png", "foto-loja.jpg", 1300, 0.82, fotosDir],
  ["troque o velho pelo novo 10.png", "foto-troca.jpg", 1300, 0.82, fotosDir],
  ["Orçamento e sua aprovação 8.png", "ig-1.jpg", 820, 0.8, fotosDir],
  ["Troca de bateria 2.png", "ig-2.jpg", 820, 0.8, fotosDir],
  ["Conector de carga 3.png", "ig-3.jpg", 820, 0.8, fotosDir],
  ["Aparelho molhado 4.png", "ig-4.jpg", 820, 0.8, fotosDir],
  ["Desbloqueio de conta 5.png", "ig-5.jpg", 820, 0.8, fotosDir],
  ["Acessórios e recondicionados 6.png", "ig-6.jpg", 820, 0.8, fotosDir],
  // otimiza o logo transparente (mantém PNG)
  ["logo-transparente.png", "logo-transparente.png", 560, 1, assetsDir],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [srcName, outName, w, q, baseDir] of jobs) {
    const srcPath = path.join(baseDir, srcName);
    if (!fs.existsSync(srcPath)) { console.log("PULOU (não achei):", srcName); continue; }
    const ext = outName.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
    const dataUrl = "data:image/png;base64," + fs.readFileSync(srcPath).toString("base64");
    const result = await page.evaluate(async ({ dataUrl, w, q, ext }) => {
      const img = new Image();
      await new Promise((r, j) => { img.onload = r; img.onerror = j; img.src = dataUrl; });
      const scale = Math.min(1, w / img.width);
      const cw = Math.round(img.width * scale), ch = Math.round(img.height * scale);
      const c = document.createElement("canvas"); c.width = cw; c.height = ch;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, cw, ch);
      return c.toDataURL(ext, q);
    }, { dataUrl, w, q, ext });
    const outPath = path.join(assetsDir, outName);
    fs.writeFileSync(outPath, Buffer.from(result.split(",")[1], "base64"));
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`OK ${outName} (${kb} KB)`);
  }
  await browser.close();
  console.log("Concluído.");
})().catch((e) => { console.error("Falha:", e && e.message ? e.message : e); process.exit(1); });
