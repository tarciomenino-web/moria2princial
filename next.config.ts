import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Saída do build vai pra pasta dist/ em vez da .next/ padrão.
  // Vale pro `npm run build` e também pro `npm run dev`.
  distDir: "dist",
};

export default nextConfig;
