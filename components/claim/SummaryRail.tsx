"use client";

import { motion } from "framer-motion";
import type { Claim } from "@/lib/claims";
import { STAGE_LABELS, STAGE_ORDER, stageState } from "@/lib/claims";
import { buildTrack } from "@/lib/track";
import { TONE } from "@/lib/tone";
import { formatRupees, formatDate } from "@/lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The at-a-glance card: the amount stated large on white, then the three
 * numbers that answer "how is this going" stacked in a solid block coloured by
 * the claim's state.
 */
export default function SummaryRail({ claim }: { claim: Claim }) {
  const tone = TONE[claim.tone];
  const track = buildTrack(claim);

  const currentIndex = STAGE_ORDER.indexOf(claim.currentStage);
  const nextStage =
    claim.tone === "completed" ? null : STAGE_ORDER[currentIndex + 1];
  const blocked = stageState(claim, claim.currentStage) === "blocked";

  const stats: { value: string; label: string }[] = [
    {
      value: `${claim.daysSinceSubmission}`,
      label: claim.tone === "completed" ? "Days start to finish" : "Days elapsed",
    },
    {
      value: `${track.clearedCount} of 5`,
      label: "Stages cleared",
    },
    {
      value:
        claim.tone === "completed"
          ? "Settled"
          : blocked
            ? "Blocked"
            : nextStage
              ? STAGE_LABELS[nextStage]
              : "Disbursement",
      label: claim.tone === "completed" ? "Outcome" : "Next checkpoint",
    },
  ];

  return (
    <section className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel">
      <div className="px-6 pt-6 pb-7">
        <p className="meta text-ink-400">Amount claimed</p>
        <p className="tnum display mt-3 text-[42px] text-ink-950">
          {formatRupees(claim.amount)}
        </p>
        <p className="mt-2.5 text-[13.5px] text-ink-500">
          {claim.memberName}
          <span className="mx-1.5 text-ink-200">/</span>
          {claim.formName}
        </p>
        <p className="tnum mt-1 text-[13px] text-ink-400">
          Filed {formatDate(claim.submittedOn)}
        </p>
      </div>

      {/* Solid stat block. White figures, hairline rules between them. */}
      <div className={`${tone.block} px-6 py-2`}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }}
            className="border-b border-white/20 py-4 last:border-b-0"
          >
            <p className="tnum display text-[30px] leading-none text-white">
              {s.value}
            </p>
            <p className="meta mt-2.5 text-white/65">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-line px-6 py-3.5">
        <p className="truncate text-[12.5px] text-ink-500">
          {claim.employer}
          <span className="mx-1.5 text-ink-200">/</span>
          {claim.employerCity}
        </p>
      </div>
    </section>
  );
}
