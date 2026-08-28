import Link from "next/link";
import type { Claim } from "@/lib/claims";
import { TONE } from "@/lib/tone";
import Shell from "@/components/ui/Shell";
import { formatRupees } from "@/lib/format";

/**
 * Claim context, as a second floating pill under the nav. Keeps the reference,
 * amount and status in view on a long scroll.
 */
export default function ClaimTopBar({ claim }: { claim: Claim }) {
  const tone = TONE[claim.tone];

  return (
    <div className="z-30 py-2 lg:sticky lg:top-[84px]">
      <Shell>
        <div className="flex h-12 items-center justify-between gap-4 rounded-pill border border-line bg-canvas pr-2 pl-5 shadow-float lg:bg-canvas/80 lg:backdrop-blur-xl">
          <nav className="flex min-w-0 items-center gap-2 text-[13px]">
            <Link
              href="/track"
              className="-ml-2 flex min-h-11 shrink-0 items-center px-2 text-ink-400 transition-colors hover:text-ink-900"
            >
              Claims
            </Link>
            <span className="shrink-0 text-ink-200">/</span>
            <span className="tnum truncate font-mono font-medium text-ink-950">
              {claim.id}
            </span>
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <span className="tnum hidden text-[13px] text-ink-500 sm:block">
              {formatRupees(claim.amount)}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[12px] font-semibold ${tone.chip}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${tone.swatch}`}
                aria-hidden="true"
              />
              {claim.statusLabel}
            </span>
          </div>
        </div>
      </Shell>
    </div>
  );
}
