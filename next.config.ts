import type { NextConfig } from "next";

// Sem distDir: o build sai na .next/ padrão. A Vercel procura exatamente essa pasta
// e falha com "Output Directory .next not found" se a saída for renomeada.
const nextConfig: NextConfig = {};

export default nextConfig;
