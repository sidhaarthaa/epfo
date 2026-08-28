"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Claim } from "@/lib/claims";
import { ArrowRight, Check, Clock } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

const shell =
  "overflow-hidden rounded-panel border border-line bg-surface shadow-panel";

export default function EscalationCard({ claim }: { claim: Claim }) {
  const [raised, setRaised] = useState(false);
  const { eligible, note, daysUntilEligible } = claim.escalation;

  /* ---------------------------------------------- settled, or not yet due */
  if (claim.tone === "completed" || !eligible) {
    const settled = claim.tone === "completed";
    return (
      <section className={shell}>
        <div className="border-b border-line px-6 py-3.5">
          <h2 className="meta text-ink-400">Escalation</h2>
        </div>
        <div className="px-6 py-6">
          <p className="text-[17.5px] font-semibold tracking-[-0.02em] text-ink-950">
            {settled ? "Nothing left to escalate" : "Not worth escalating yet"}
          </p>
          <p className="pretty mt-3 max-w-[54ch] text-[13.5px] leading-relaxed text-ink-500">
            {note}
          </p>
          {!settled && (
            <span className="tnum mt-5 inline-flex items-center gap-2 rounded-pill border border-line bg-canvas px-3 py-2 text-[12.5px] font-medium text-ink-500">
              <Clock size={13} />
              Opens in {daysUntilEligible}{" "}
              {daysUntilEligible === 1 ? "day" : "days"}
            </span>
          )}
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------- worth raising */
  return (
    <section
      aria-label="Escalation"
      className="overflow-hidden rounded-panel bg-ink-950 shadow-ink"
    >
      <div className="border-b border-white/10 px-6 py-3.5">
        <h2 className="meta text-white/40">Escalation</h2>
      </div>

      <div className="px-6 py-6">
        <p className="display text-[21px] text-white">
          Still stuck? Raise a grievance.
        </p>
        <p className="pretty mt-3.5 max-w-[54ch] text-[13.5px] leading-relaxed text-white/55">
          {note}
        </p>

        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            {!raised ? (
              <motion.button
                key="cta"
                onClick={() => setRaised(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-white px-5 py-3 text-[14px] font-semibold text-ink-950 transition-colors duration-200 hover:bg-accent-50"
              >
                Raise a grievance
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="rounded-panel border border-white/10 bg-white/[0.05] p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-500 text-white">
                    <Check size={12} />
                  </span>
                  <p className="text-[14.5px] font-semibold text-white">
                    Grievance drafted, demo only
                  </p>
                </div>
                <p className="pretty mt-3 text-[13px] leading-relaxed text-white/55">
                  In a working version this would file a grievance against{" "}
                  <span className="font-mono text-white/85">{claim.id}</span> on
                  EPFiGMS, hand you a registration number, and start a 7 day
                  response clock you could watch from this page.
                </p>
                <p className="pretty mt-3 rounded-tile bg-white/[0.05] px-3.5 py-2.5 text-[12px] leading-relaxed text-white/45">
                  Nothing was submitted anywhere. This prototype has no
                  connection to EPFiGMS or any government system. To file a real
                  grievance, use the official EPFiGMS portal.
                </p>
                <button
                  onClick={() => setRaised(false)}
                  className="mt-4 text-[13px] font-medium text-white/45 underline underline-offset-4 transition-colors hover:text-white/80"
                >
                  Reset this demo state
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
