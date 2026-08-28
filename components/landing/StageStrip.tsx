import Shell from "@/components/ui/Shell";
import { STAGE_ORDER, STAGE_LABELS, STAGE_MEANING } from "@/lib/claims";

/**
 * Takes the place a logo wall would occupy on a commercial site. Rather than
 * borrowing credibility from brands this prototype has no relationship with,
 * it spends the space explaining the five stages every claim passes through.
 */
export default function StageStrip() {
  return (
    <section className="defer-paint border-b border-line bg-canvas">
      <Shell>
        <p className="meta py-7 text-center text-ink-400">
          Every withdrawal claim moves through the same five stages
        </p>
      </Shell>

      <div className="border-t border-line">
        <Shell>
          <div className="grid divide-y divide-line border-x border-line sm:grid-cols-2 sm:divide-x lg:grid-cols-5 lg:divide-y-0">
            {STAGE_ORDER.map((key, i) => (
              <div key={key} className="h-full bg-surface px-5 py-7">
                  <span className="tnum meta text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3.5 text-[15px] leading-snug font-semibold text-ink-950">
                    {STAGE_LABELS[key]}
                  </h3>
                  <p className="pretty mt-2 text-[12.5px] leading-relaxed text-ink-500">
                    {STAGE_MEANING[key]}
                  </p>
              </div>
            ))}
          </div>
        </Shell>
      </div>
    </section>
  );
}
