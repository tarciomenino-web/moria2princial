// bg-remove.js — remove o fundo (flood-fill a partir das bordas) e salva PNG transparente.
// Uso: NODE_PATH="<site>/node_modules" node bg-remove.js entrada.png saida.png [tolerancia]
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const [, , inp, out, tolArg] = process.argv;
  if (!inp || !out) { console.error("Uso: node bg-remove.js entrada.png saida.png [tol]"); process.exit(1); }
  const tol = Number(tolArg || 72);

  const dataUrl = "data:image/png;base64," + fs.readFileSync(inp).toString("base64");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const result = await page.evaluate(async ({ dataUrl, tol }) => {
    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = dataUrl; });
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const id = ctx.getImageData(0, 0, c.width, c.height);
    const d = id.data, W = c.width, H = c.height;
    const at = (x, y) => (y * W + x) * 4;
    const corners = [[0,0],[W-1,0],[0,H-1],[W-1,H-1]].map(([x,y]) => { const i=at(x,y); return [d[i],d[i+1],d[i+2]]; });
    const bg = [0,1,2].map((k) => Math.round(corners.reduce((s,c)=>s+c[k],0)/4));
    const near = (i) => { const r=d[i]-bg[0], g=d[i+1]-bg[1], b=d[i+2]-bg[2]; return Math.sqrt(r*r+g*g+b*b) < tol; };
    const visited = new Uint8Array(W*H);
    const stack = [];
    for (let x=0;x<W;x++){ stack.push(x,0, x,H-1); }
    for (let y=0;y<H;y++){ stack.push(0,y, W-1,y); }
    while (stack.length) {
      const y = stack.pop(), x = stack.pop();
      if (x<0||y<0||x>=W||y>=H) continue;
      const k = y*W+x; if (visited[k]) continue; visited[k]=1;
      const i = k*4; if (!near(i)) continue;
      d[i+3]=0;
      stack.push(x+1,y, x-1,y, x,y+1, x,y-1);
    }
    // segunda passada: remove areas brancas/cinza FECHADAS (miolo do "O", "A", etc.)
    // so mexe em pixel quase-branco e SEM saturacao (nao toca no dourado, que e amarelo saturado)
    for (let p = 0; p < W * H; p++) {
      const i = p * 4;
      if (d[i + 3] === 0) continue;
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (lum > 200 && sat < 26) d[i + 3] = 0;
    }
    ctx.putImageData(id, 0, 0);
    return c.toDataURL("image/png");
  }, { dataUrl, tol });

  fs.writeFileSync(out, Buffer.from(result.split(",")[1], "base64"));
  await browser.close();
  console.log("OK ->", out, "(tol " + tol + ")");
})().catch((e) => { console.error("Falha:", e && e.message ? e.message : e); process.exit(1); });
