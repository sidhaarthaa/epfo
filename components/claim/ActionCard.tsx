import type { Claim } from "@/lib/claims";
import { TONE } from "@/lib/tone";
import CopyButton from "./CopyButton";
import IconTile from "@/components/ui/IconTile";
import { Check, Bang } from "@/components/ui/Icons";

export default function ActionCard({ claim }: { claim: Claim }) {
  const tone = TONE[claim.tone];
  const settled = claim.tone === "on_track" || claim.tone === "completed";

  return (
    <section
      aria-label="What you should do"
      className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
    >
      <div className={`px-6 py-8 sm:px-9 sm:py-10 ${tone.surface}`}>
        <div className="flex items-center gap-3">
          <IconTile tint={tone.tile} size="sm">
            {settled ? <Check size={14} /> : <Bang size={14} />}
          </IconTile>
          <h2 className={`meta ${tone.heading}`}>What should I do?</h2>
        </div>

        <p
          className={`display balance mt-5 max-w-[28ch] text-[24px] sm:text-[31px] ${tone.heading}`}
        >
          {claim.action.title}
        </p>
        <p
          className={`pretty mt-4 max-w-[62ch] text-[15.5px] leading-relaxed ${tone.body}`}
        >
          {claim.action.body}
        </p>
      </div>

      {/* Steps sit on white so they read as a checklist, not decoration. */}
      <ol className="border-t border-line">
        {claim.action.steps.map((step, i) => (
          <li
            key={step.text}
            style={{ "--d": `${60 + i * 55}ms` } as React.CSSProperties}
            className="anim-fade flex gap-4 border-b border-line px-6 py-4 last:border-b-0 sm:px-9 sm:py-5"
          >
            <span
              className={`tnum mt-px grid h-6 w-6 shrink-0 place-items-center rounded-tile text-[11.5px] font-bold ${tone.chip}`}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="pretty block max-w-[72ch] text-[14.5px] leading-relaxed text-ink-900">
                {step.text}
              </span>
              {step.meta && (
                <span className="meta mt-2 inline-block text-ink-400">
                  {step.meta}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>

      {claim.action.copyMessage && (
        <div className="border-t border-line bg-canvas px-6 py-6 sm:px-9">
          <p className="meta text-ink-400">Ready to send</p>
          <p className="pretty mt-4 max-w-[76ch] border-l-2 border-ink-200 pl-4 text-[14px] leading-relaxed text-ink-700">
            {claim.action.copyMessage.text}
          </p>
          <div className="mt-5">
            <CopyButton
              text={claim.action.copyMessage.text}
              label={claim.action.copyMessage.label}
            />
          </div>
        </div>
      )}
    </section>
  );
}
