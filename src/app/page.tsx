import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Intro } from "@/components/home/Intro";
import { Hero } from "@/components/home/Hero";
import { Differentials } from "@/components/home/Differentials";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Commitments } from "@/components/home/Commitments";
import { TradeInBlock } from "@/components/home/TradeInBlock";
import { FinalCta } from "@/components/home/FinalCta";
import { LOJA } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobilePhoneStore",
  name: "Moriá Celulares & Assistência Técnica",
  description:
    "Assistência técnica especializada em celulares: troca de tela, bateria, conector e mais, com garantia.",
  telephone: "+" + LOJA.whatsapp,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Carmem de Freitas Salgado, 279",
    addressLocality: "Nova Iguaçu",
    addressRegion: "RJ",
    postalCode: "26220-470",
    addressCountry: "BR",
  },
  areaServed: "Nova Iguaçu, RJ",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Intro />
      <SiteHeader transparent />
      <main className="flex-1">
        <Hero />
        <Differentials />
        <BeforeAfter />
        <Services />
        <Process />
        <Commitments />
        <TradeInBlock />
        <FinalCta />
      </main>
      <SiteFooter />
      <WhatsappFloat />
    </>
  );
}
