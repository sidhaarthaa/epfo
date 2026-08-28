import Link from "next/link";
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

/**
 * One grid, three blocks, placed rather than duplicated.
 *
 * An earlier version rendered the rail twice, once for narrow screens and once
 * for wide, with one copy hidden. That doubled the DOM on the phones least able
 * to afford it. Here every panel is rendered exactly once: on a phone the three
 * blocks stack in source order, so a phone reads verdict, timeline and what to
 * do before it reaches the supporting numbers; from the large breakpoint the
 * rail moves into its own column and sticks.
 */
export default function ClaimDashboard({ claim }: { claim: Claim }) {
  const others = DEMO_SHORTCUTS.filter((s) => s.claimId !== claim.id);

  return (
    <>
      <ClaimTopBar claim={claim} />

      <Shell className="py-6 sm:py-9">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_366px] lg:items-start lg:gap-7">
          <div className="flex min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-1">
            <VerdictPanel claim={claim} />
            <Timeline claim={claim} />
            <ActionCard claim={claim} />
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-[156px] lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <SummaryRail claim={claim} />
            <EtaCard claim={claim} />
            <EscalationCard claim={claim} />
          </aside>

          <div className="flex min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-2">
            <ClaimDetails claim={claim} />

            {/* No dead ends. Always offer the next scenario. */}
            <section className="rounded-panel border border-dashed border-ink-200 px-5 py-6 sm:px-6">
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
                      className="lift inline-flex min-h-11 items-center gap-2 rounded-pill border border-line bg-surface py-2 pr-4 pl-3 text-[13px] font-medium text-ink-700"
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
          </div>
        </div>
      </Shell>
    </>
  );
}
