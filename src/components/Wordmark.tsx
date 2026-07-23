import Link from "next/link";
import Image from "next/image";

// Marca da Moriá: a montanha dourada (recortada do logo original) + o nome.
// `asLink` fica falso no rodapé, que já não é navegável.
export function Wordmark({
  small = false,
  asLink = true,
}: {
  small?: boolean;
  asLink?: boolean;
}) {
  const inner = (
    <>
      <Image
        src="/img/logo-marca.png"
        alt=""
        width={240}
        height={155}
        className={`w-auto transition-transform duration-500 group-hover:scale-105 ${
          small ? "h-6" : "h-7"
        }`}
        priority
      />
      <span
        className={`font-display font-extrabold tracking-[0.18em] gold-text ${
          small ? "text-base" : "text-lg"
        }`}
      >
        MORIÁ
      </span>
    </>
  );

  if (!asLink) {
    return <div className="flex items-center gap-2.5">{inner}</div>;
  }

  return (
    <Link href="/" className="group flex items-center gap-2.5">
      {inner}
    </Link>
  );
}
