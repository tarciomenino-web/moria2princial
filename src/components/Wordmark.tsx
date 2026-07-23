import Link from "next/link";

export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <span
        className={`font-display font-extrabold tracking-[0.18em] gold-text ${
          small ? "text-lg" : "text-xl"
        }`}
      >
        MORIÁ
      </span>
    </Link>
  );
}
