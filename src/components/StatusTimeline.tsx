export function StatusTimeline({
  steps,
  current,
}: {
  steps: readonly string[];
  current: string;
}) {
  const isDone = current === "Entregue" || current === "Fechado";
  const isRefused = current === "Recusado";
  const idx = steps.indexOf(current);

  return (
    <div className="flex flex-wrap gap-1.5">
      {steps.map((step, i) => {
        const reached = idx >= 0 && i <= idx;
        return (
          <span
            key={step}
            className={`rounded-full px-2.5 py-1 text-xs ${
              reached
                ? isRefused
                  ? "bg-red-500/20 text-red-200"
                  : "gold-gradient text-wine-900 font-semibold"
                : "bg-wine-900/60 text-cream/40"
            }`}
          >
            {step}
          </span>
        );
      })}
      {isDone && <span className="sr-only">Concluído</span>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Entregue" || status === "Fechado"
      ? "bg-green-500/20 text-green-200"
      : status === "Recusado"
      ? "bg-red-500/20 text-red-200"
      : "bg-gold-500/20 text-gold-300";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}
