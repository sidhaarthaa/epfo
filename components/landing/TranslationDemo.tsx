"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/ui/Shell";
import MetaTag from "@/components/ui/MetaTag";

const EXAMPLES = [
  {
    portal: "Claim Form-31 Under Process at Field Office",
    plain:
      "An EPFO officer is checking your service history and how much you are allowed to take out. It has been 5 working days. This step normally takes 5 to 10.",
    verdict: "Nothing for you to do",
    tint: "bg-accent-100 text-accent-700",
  },
  {
    portal: "Claim Form-19 Rejected / Returned, KYC Not Approved",
    plain:
      "Your bank account name does not exactly match your PF record, so an officer stopped the claim. Nobody will call you about this. You have to fix it yourself.",
    verdict: "You need to act",
    tint: "bg-warn-100 text-warn-700",
  },
  {
    portal: "Claim Form-31 Pending for Attestation by Employer",
    plain:
      "EPFO has not received your claim yet. It is sitting in your company's portal, waiting for whoever holds the digital signature key to click approve.",
    verdict: "Message your HR",
    tint: "bg-info-100 text-info-700",
  },
];

const DWELL = 5200;

export default function TranslationDemo() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % EXAMPLES.length), DWELL);
    return () => clearTimeout(t);
  }, [i, paused]);

  const ex = EXAMPLES[i];

  return (
    <section className="defer-paint border-b border-line bg-canvas">
      <Shell className="py-14 lg:py-18">
        <MetaTag segments={["The difference"]} />

        <div
          className="mt-8 overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid md:grid-cols-2">
            {/* ---------------------------------------------- what you get now */}
            <div className="border-b border-line bg-canvas px-6 py-9 sm:px-9 sm:py-11 md:border-r md:border-b-0">
              <p className="meta text-ink-400">What the portal shows you</p>
              <div className="mt-7 min-h-[136px]">
                <div key={ex.portal} className="anim-rise">
                  <p className="font-mono text-[15px] leading-relaxed text-ink-700 sm:text-[16.5px]">
                    {ex.portal}
                  </p>
                  <p className="pretty mt-6 max-w-[44ch] text-[13.5px] leading-relaxed text-ink-400">
                    That is the whole message. No reason, no next step, no way
                    to tell whether you should wait or worry.
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- what we say */}
            <div className="px-6 py-9 sm:px-9 sm:py-11">
              <p className="meta text-accent-600">What EPFO Saathi says</p>
              <div className="mt-7 min-h-[136px]">
                <div
                  key={ex.plain}
                  style={{ "--d": "50ms" } as React.CSSProperties}
                  className="anim-rise"
                >
                  <p className="pretty max-w-[48ch] text-[15.5px] leading-relaxed text-ink-900 sm:text-[17px]">
                    {ex.plain}
                  </p>
                  <span
                    className={`meta mt-6 inline-flex items-center rounded-tile px-2.5 py-1.5 ${ex.tint}`}
                  >
                    {ex.verdict}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------ selector */}
          <div className="flex items-center gap-2 border-t border-line px-6 sm:px-9">
            {EXAMPLES.map((e, n) => (
              <button
                key={e.portal}
                onClick={() => setI(n)}
                aria-label={`Show example ${n + 1}`}
                className="group flex min-h-11 flex-1 items-center py-5"
              >
                <span className="relative h-1 w-full overflow-hidden rounded-full bg-line transition-colors group-hover:bg-ink-200">
                  {n === i && (
                    <span
                      key={`${i}-${paused}`}
                      style={
                        {
                          animationDuration: paused ? "0.25s" : `${DWELL}ms`,
                        } as React.CSSProperties
                      }
                      className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent-600 [animation-fill-mode:both] [animation-name:grow-x] [animation-timing-function:linear]"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
