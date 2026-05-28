"use client";

import { useState } from "react";

type ShareButtonProps = {
  url: string;
  title: string;
  label: string;
  className?: string;
};

export function ShareButton({ url, title, label, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ url, title });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — open WhatsApp share as last resort
      const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
      window.open(wa, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={label}
      data-testid="share-button"
      className={
        className ??
        "flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]"
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {copied ? "✓" : label}
    </button>
  );
}
