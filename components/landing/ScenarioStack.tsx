"use client";

import { useState } from "react";
import Link from "next/link";
import Shell from "@/components/ui/Shell";
import { DEMO_SHORTCUTS, getClaim } from "@/lib/claims";
import { TONE } from "@/lib/tone";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * An expandable stack. One scenario is open at a time: it becomes a dark panel
 * with the detail and a dedicated cell to open the claim, while the rest stay
 * as single hairline rows. Surfaces are black and white throughout; the only
 * colour is the small status swatch, which carries meaning.
 */
export default function ScenarioStack() {
  const [open, setOpen] = useState(0);

  return (
    <section className="defer-paint border-b border-line bg-canvas">
      <Shell className="py-14 lg:py-20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="display max-w-[14ch] text-[32px] text-ink-950 sm:text-[44px]">
            See it on a<br />
            <span className="text-ink-400">real claim</span>
          </h2>
          <span className="meta pt-2 text-ink-400">Five scenarios</span>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          {DEMO_SHORTCUTS.map((s, i) => {
            const claim = getClaim(s.claimId);
            const tone = TONE[s.tone];
            const isOpen = i === open;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={s.claimId}
                className={`overflow-hidden rounded-panel border transition-colors duration-300 ${
                  isOpen
                    ? "border-ink-950 bg-ink-950"
                    : "border-line bg-surface hover:border-ink-200"
                }`}
              >
                <button
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-7"
                >
                  <span
                    className={`tnum meta shrink-0 ${
                      isOpen ? "text-white/45" : "text-ink-400"
                    }`}
                  >
                    {num}
                  </span>
                  <ArrowRight
                    size={13}
                    className={`shrink-0 ${
                      isOpen ? "text-white/45" : "text-ink-400"
                    }`}
                  />
                  <span
                    className={`meta min-w-0 flex-1 truncate ${
                      isOpen ? "text-white" : "text-ink-950"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`hidden shrink-0 items-center gap-2 sm:flex ${
                      isOpen ? "text-white/60" : "text-ink-400"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-[3px] ${tone.swatch}`}
                      aria-hidden="true"
                    />
                    <span className="meta">{claim?.statusLabel}</span>
                  </span>
                </button>

                {/* Always mounted, animated open and shut. Unmounting on
                    exit would leave the collapsing panel's link focusable
                    until an animation frame arrives, which a background tab
                    never gets. */}
                <div
                  aria-hidden={!isOpen}
                  data-open={isOpen}
                  className="collapse"
                >
                 <div>
                  <div className="grid border-t border-white/10 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="px-5 py-7 sm:px-7 sm:py-9">
                      <p className="pretty max-w-[48ch] text-[17px] leading-relaxed text-white sm:text-[19px]">
                        {s.blurb}
                      </p>
                      <p className="pretty mt-4 max-w-[54ch] text-[13.5px] leading-relaxed text-white/50">
                        {claim?.headline}
                      </p>
                      <p className="tnum mt-6 font-mono text-[12px] text-white/40">
                        {claim?.id}
                      </p>
                    </div>

                    {/* Its own cell, the way the reference splits the CTA. */}
                    <Link
                      href={`/claim/${s.claimId}`}
                      aria-label={`Open claim ${s.claimId}`}
                      tabIndex={isOpen ? 0 : -1}
                      className="group flex items-center justify-between gap-4 border-t border-white/10 px-5 py-6 transition-colors duration-200 hover:bg-white/5 sm:w-[190px] sm:border-t-0 sm:border-l sm:px-7"
                    >
                      <span className="meta text-white/60 sm:hidden">
                        Open this claim
                      </span>
                      <ArrowRight
                        size={26}
                        className="text-white transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                 </div>
                </div>
              </div>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
