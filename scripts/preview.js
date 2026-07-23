// preview.js — screenshots do index.html (desktop full + hero + mobile)
const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const file = "file://" + path.resolve(__dirname, "index.html");
  const outDir = path.resolve(__dirname, "_preview");
  require("fs").mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();

  // desktop hero (viewport)
  let page = await browser.newPage({ viewport: { width: 1360, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(file, { waitUntil: "networkidle" });
  await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, "desktop-hero.png") });
  // trigger reveals by scrolling then full page
  await page.evaluate(async () => { await new Promise(r => { let y = 0; const t = setInterval(() => { y += 600; window.scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 60); }); });
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "desktop-full.png"), fullPage: true });
  await page.close();

  // mobile
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto(file, { waitUntil: "networkidle" });
  await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, "mobile-hero.png") });
  await page.close();

  await browser.close();
  console.log("previews em _preview/");
})().catch(e => { console.error(e); process.exit(1); });
