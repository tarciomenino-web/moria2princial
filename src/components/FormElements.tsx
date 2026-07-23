"use client";

import { useFormStatus } from "react-dom";

export function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-cream/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-3 py-2.5 text-cream placeholder:text-cream/30 focus:border-gold-500 focus:outline-none"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  required = false,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-cream/80">{label}</span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-3 py-2.5 text-cream placeholder:text-cream/30 focus:border-gold-500 focus:outline-none"
      />
    </label>
  );
}

export function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-cream/80">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-lg border border-gold-500/25 bg-wine-900/60 px-3 py-2.5 text-cream focus:border-gold-500 focus:outline-none"
      >
        <option value="" disabled className="text-wine-900">
          Selecione...
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-wine-900">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="gold-gradient w-full rounded-full px-6 py-3 font-semibold text-wine-900 transition hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Enviando..." : children}
    </button>
  );
}
