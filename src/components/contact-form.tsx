"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getLocaleUi } from "@/lib/locale-ui";

type ContactFormProps = {
  locale: Locale;
};

const initialState = {
  name: "",
  phone: "",
  email: "",
  country: "",
  project: "",
  quantity: "",
  message: "",
};

export function ContactForm({ locale }: ContactFormProps) {
  const copy = getLocaleUi(locale);
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setValues(initialState);
      setStatus("success");

      if (typeof window !== "undefined") {
        (window as Window & { dataLayer?: unknown[] }).dataLayer =
          (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
        (window as Window & { dataLayer?: unknown[] }).dataLayer!.push({
          event: "contact_form_submitted",
          locale,
        });
      }
    } catch {
      setStatus("error");
    }
  }

  function updateValue(name: keyof typeof initialState, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <form id="order-form" onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <h3 className="text-3xl font-semibold text-[var(--foreground)]">{copy.formTitle}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy.formText}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span>{copy.nameLabel}</span>
          <input required value={values.name} onChange={(event) => updateValue("name", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span>{copy.phoneLabel}</span>
          <input required value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span>{copy.emailLabel}</span>
          <input type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span>{copy.countryLabel}</span>
          <input value={values.country} onChange={(event) => updateValue("country", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span>{copy.projectLabel}</span>
          <input required value={values.project} onChange={(event) => updateValue("project", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span>{copy.quantityLabel}</span>
          <input value={values.quantity} onChange={(event) => updateValue("quantity", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
        <span>{copy.messageLabel}</span>
        <textarea required rows={6} value={values.message} onChange={(event) => updateValue("message", event.target.value)} className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]" />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "submitting"} className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-70">
          {status === "submitting" ? copy.submittingLabel : copy.submitLabel}
        </button>
        <p className={`text-sm ${status === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {status === "success" ? copy.successMessage : status === "error" ? copy.errorMessage : ""}
        </p>
      </div>
    </form>
  );
}