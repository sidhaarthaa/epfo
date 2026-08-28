"use client";

import { motion } from "framer-motion";
import type { Claim } from "@/lib/claims";
import { TONE } from "@/lib/tone";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The answer, first. Big plain-language headline, the reasoning under it, and
 * the raw portal string tucked at the bottom for anyone who wants to compare.
 */
export default function VerdictPanel({ claim }: { claim: Claim }) {
  const tone = TONE[claim.tone];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
    >
      <div className="px-6 pt-8 pb-7 sm:px-9 sm:pt-10">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2 w-2 rounded-full ${tone.swatch}`}
            aria-hidden="true"
          />
          <span className={`meta ${tone.heading}`}>{claim.statusLabel}</span>
        </div>

        <h1 className="display balance mt-5 max-w-[22ch] text-[30px] text-ink-950 sm:text-[40px] lg:text-[46px]">
          {claim.headline}
        </h1>

        <p className="pretty mt-6 max-w-[70ch] text-[16px] leading-[1.7] text-ink-700 sm:text-[17.5px]">
          {claim.explanation}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-line bg-canvas px-6 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-9">
        <p className="meta shrink-0 text-ink-400">On the portal this reads</p>
        <p className="font-mono text-[13px] leading-relaxed text-ink-700">
          {claim.portalStatus}
        </p>
      </div>
    </motion.section>
  );
}
