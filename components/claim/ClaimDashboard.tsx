"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Claim } from "@/lib/claims";
import { DEMO_SHORTCUTS, getClaim } from "@/lib/claims";
import { TONE } from "@/lib/tone";
import Shell from "@/components/ui/Shell";
import ClaimTopBar from "./ClaimTopBar";
import VerdictPanel from "./VerdictPanel";
import SummaryRail from "./SummaryRail";
import Timeline from "./Timeline";
import ActionCard from "./ActionCard";
import EtaCard from "./EtaCard";
import EscalationCard from "./EscalationCard";
import ClaimDetails from "./ClaimDetails";

const ease = [0.16, 1, 0.3, 1] as const;

function Rise({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Two-column workspace. The narrative runs down the main column, and the
 * context that you want visible while reading it lives in a rail that sticks
 * as you scroll. On narrow screens the rail folds under the timeline, so the
 * summary and the timing still come before the long-form details.
 */
export default function ClaimDashboard({ claim }: { claim: Claim }) {
  const others = DEMO_SHORTCUTS.filter((s) => s.claimId !== claim.id);

  return (
    <>
      <ClaimTopBar claim={claim} />

      <Shell className="py-7 sm:py-9">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_366px] lg:gap-7">
          {/* ------------------------------------------------ main column */}
          <div className="flex min-w-0 flex-col gap-5">
            <VerdictPanel claim={claim} />

            <Rise delay={0.12}>
              <Timeline claim={claim} />
            </Rise>

            {/* On mobile the rail folds in here, above the long content. */}
            <div className="flex flex-col gap-5 lg:hidden">
              <Rise delay={0.16}>
                <SummaryRail claim={claim} />
              </Rise>
              <Rise delay={0.2}>
                <EtaCard claim={claim} />
              </Rise>
            </div>

            <Rise delay={0.22}>
              <ActionCard claim={claim} />
            </Rise>

            <div className="lg:hidden">
              <Rise delay={0.26}>
                <EscalationCard claim={claim} />
              </Rise>
            </div>

            <Rise delay={0.3}>
              <ClaimDetails claim={claim} />
            </Rise>

            {/* No dead ends. Always offer the next scenario. */}
            <Rise delay={0.36}>
              <section className="rounded-panel border border-dashed border-ink-200 px-6 py-6">
                <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-ink-950">
                  See a different situation
                </h2>
                <p className="mt-1 text-[13.5px] text-ink-500">
                  Four other demo claims, each stuck in its own way.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {others.map((s) => {
                    const c = getClaim(s.claimId);
                    const tone = TONE[s.tone];
                    return (
                      <Link
                        key={s.claimId}
                        href={`/claim/${s.claimId}`}
                        className="lift inline-flex items-center gap-2 rounded-pill border border-line bg-surface py-2 pr-3.5 pl-2.5 text-[13px] font-medium text-ink-700"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-[3px] ${tone.swatch}`}
                          aria-hidden="true"
                        />
                        {c?.statusLabel}
                      </Link>
                    );
                  })}
                </div>
              </section>
            </Rise>
          </div>

          {/* -------------------------------------------------- sticky rail */}
          <aside className="hidden flex-col gap-5 lg:sticky lg:top-[156px] lg:flex">
            <Rise delay={0.08}>
              <SummaryRail claim={claim} />
            </Rise>
            <Rise delay={0.14}>
              <EtaCard claim={claim} />
            </Rise>
            <Rise delay={0.2}>
              <EscalationCard claim={claim} />
            </Rise>
          </aside>
        </div>
      </Shell>
    </>
  );
}
