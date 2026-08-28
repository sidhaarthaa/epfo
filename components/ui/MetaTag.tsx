import type { ReactNode } from "react";

/**
 * A bordered label split into segments by hairline dividers, in the style of
 * a drawing-sheet title block. Used for section labels and claim metadata.
 */
export default function MetaTag({
  segments,
  accent,
  tone = "default",
}: {
  segments: ReactNode[];
  /** Optional colour swatch shown in the first segment. */
  accent?: string;
  tone?: "default" | "inverse";
}) {
  const shell =
    tone === "inverse"
      ? "border-white/20 text-white/70"
      : "border-line text-ink-500";
  const divider = tone === "inverse" ? "bg-white/20" : "bg-line";

  return (
    <span
      className={`inline-flex items-stretch overflow-hidden rounded-pill border ${shell}`}
    >
      {segments.map((seg, i) => (
        <span key={i} className="flex items-stretch">
          {i > 0 && <span className={`w-px ${divider}`} aria-hidden="true" />}
          <span className="meta flex items-center gap-1.5 px-3 py-[7px]">
            {i === 0 && accent && (
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${accent}`}
                aria-hidden="true"
              />
            )}
            {seg}
          </span>
        </span>
      ))}
    </span>
  );
}
