"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      className="inline-flex items-center gap-2 rounded-lg bg-ink-950 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.16 }}
            className="inline-flex items-center gap-2"
          >
            <Check size={13} />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.16 }}
            className="inline-flex items-center gap-2"
          >
            <Copy size={13} />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
