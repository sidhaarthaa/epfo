"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/ui/Icons";

export default function CopyButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard access can be blocked by the browser. The message is on
      // screen either way, so a failed copy does not need an error state.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-ink-950 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}
