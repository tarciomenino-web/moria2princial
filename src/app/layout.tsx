import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Moriá — Assistência Técnica Especializada em Celulares",
  description:
    "O cuidado que seu celular merece. Assistência técnica especializada em Nova Iguaçu: troca de tela, bateria, conector e mais, com garantia. Abra sua ordem de serviço online, acompanhe o reparo e peça retirada em casa.",
  openGraph: {
    title: "Moriá — Assistência Técnica Especializada",
    description:
      "O cuidado que seu celular merece. Reparo com garantia, ordem de serviço online e retirada em casa.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
