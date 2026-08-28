import type { Claim } from "@/lib/claims";
import { TONE } from "@/lib/tone";

/** An honest one line read on where this claim sits against the normal window. */
const PROGRESS_LABEL: Record<Claim["tone"], string> = {
  on_track: "Inside the normal window",
  needs_you: "Paused, waiting on you",
  needs_employer: "Paused, waiting on your employer",
  delayed: "Past the normal window",
  completed: "Settled",
};

export default function EtaCard({ claim }: { claim: Claim }) {
  const tone = TONE[claim.tone];
  const off = claim.tone !== "on_track" && claim.tone !== "completed";

  return (
    <section
      aria-label="Expected timing"
      className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
    >
      <div className="border-b border-line px-6 py-3.5">
        <h2 className="meta text-ink-400">
          {claim.tone === "completed" ? "How long it took" : "When to expect it"}
        </h2>
      </div>

      <div className="px-6 py-6">
        <p className="text-[17.5px] leading-snug font-semibold tracking-[-0.02em] text-ink-950">
          {claim.eta.headline}
        </p>
        <p className="pretty mt-3 max-w-[54ch] text-[13.5px] leading-relaxed text-ink-500">
          {claim.eta.detail}
        </p>

        <div className="mt-6">
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className={`anim-grow-x h-full rounded-full ${tone.fill}`}
              style={
                {
                  width: `${claim.eta.elapsedPct}%`,
                  "--d": "260ms",
                } as React.CSSProperties
              }
            />
          </div>
          <div className="mt-2.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[12px] text-ink-400">
            <span className="tnum">
              Filed {claim.daysSinceSubmission} days ago
            </span>
            <span className={off ? `font-semibold ${tone.heading}` : ""}>
              {PROGRESS_LABEL[claim.tone]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
