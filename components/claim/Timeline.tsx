import {
  STAGE_LABELS,
  STAGE_MEANING,
  stageState,
  type Claim,
  type StageDetail,
  type StageState,
} from "@/lib/claims";
import { buildTrack, type StageBar } from "@/lib/track";
import { TONE, type ToneStyle } from "@/lib/tone";
import { formatDateShort, formatDate } from "@/lib/format";
import { Check, Bang, ArrowRight } from "@/components/ui/Icons";

/**
 * Track geometry. The label and note columns are fixed widths so the grid
 * lines behind the bars can be positioned with the same arithmetic, and the
 * axis reserves a gutter on the right so a bar running to 100% still has room
 * to park its duration chip inside the panel.
 */
const LABEL_COL = 168;
const NOTE_COL = 230;
const CHIP_GUTTER = 78;
const GAP = 16;
const PAD = 28;

const ROW_GRID = `grid grid-cols-[${LABEL_COL}px_minmax(0,1fr)] gap-4 lg:grid-cols-[${LABEL_COL}px_minmax(0,1fr)_${NOTE_COL}px]`;

/**
 * Submission is an instant, not a span, so it gets a word rather than a
 * duration. Everything else reports how long it took, or has been waiting.
 */
function dayLabel(bar: StageBar) {
  if (bar.key === "submitted") return "Filed";
  if (bar.days === 0) return "same day";
  return `${bar.days} ${bar.days === 1 ? "day" : "days"}`;
}

function Node({
  state,
  toneFill,
  delay,
  size = 34,
}: {
  state: StageState;
  toneFill: string;
  delay: number;
  size?: number;
}) {
  const shell = "relative grid place-items-center rounded-full anim-pop";
  const style = {
    width: size,
    height: size,
    "--d": `${delay}ms`,
  } as React.CSSProperties;

  if (state === "done") {
    return (
      <span style={style} className={`${shell} bg-accent-600 text-white`}>
        <Check size={15} />
      </span>
    );
  }

  if (state === "blocked") {
    return (
      <span style={style} className={`${shell} ${toneFill} text-white`}>
        <Bang size={15} />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span
        style={style}
        className={`${shell} bg-surface ring-2 ring-accent-600`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent-600" />
      </span>
    );
  }

  return (
    <span style={style} className={`${shell} bg-canvas ring-1 ring-line`}>
      <span className="h-1.5 w-1.5 rounded-full bg-ink-200" />
    </span>
  );
}

/* ------------------------------------------------------------------ rows */

function TrackRow({
  bar,
  tone,
  index,
}: {
  bar: StageBar;
  tone: ToneStyle;
  index: number;
}) {
  const live = bar.state === "current" || bar.state === "blocked";
  const done = bar.state === "done";
  const d = 60 + index * 70;

  return (
    <div
      className={`${ROW_GRID} items-center px-5 py-2.5 sm:px-7 ${
        live ? tone.surface : ""
      }`}
    >
      {/* Pill label. The live stage is the only filled one. */}
      <span
        style={{ "--d": `${d}ms` } as React.CSSProperties}
        className={`anim-fade inline-flex min-w-0 items-center gap-1.5 rounded-pill px-3 py-1.5 text-[12.5px] font-semibold ${
          live
            ? `${tone.block} text-white`
            : done
              ? "bg-canvas text-ink-900"
              : "bg-canvas text-ink-400"
        }`}
      >
        {live && <Bang size={12} className="shrink-0 opacity-90" />}
        {done && <Check size={12} className="shrink-0 text-accent-600" />}
        <span className="truncate">{bar.label}</span>
      </span>

      {/* Axis cell. The bar sits on the shared scale, the chip in the gutter. */}
      <div className="relative h-7">
        <div
          className="absolute inset-y-0 left-0"
          style={{ right: CHIP_GUTTER }}
        >
          {bar.hasBar ? (
            <div
              className="absolute top-1/2 flex -translate-y-1/2 items-center"
              style={{ left: `${bar.startPct}%`, width: `${bar.widthPct}%` }}
            >
              <span
                style={{ "--d": `${d}ms` } as React.CSSProperties}
                className={`anim-grow-x h-2.5 w-full rounded-full ${
                  live ? tone.fill : "bg-ink-200"
                }`}
              />
              <span
                style={{ "--d": `${d + 380}ms` } as React.CSSProperties}
                className={`tnum anim-fade absolute left-full ml-2 rounded-pill border px-2 py-[3px] text-[11px] font-semibold whitespace-nowrap ${
                  live
                    ? `border-transparent ${tone.block} text-white`
                    : "border-line bg-surface text-ink-500"
                }`}
              >
                {dayLabel(bar)}
              </span>
            </div>
          ) : (
            <span className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full border border-dashed border-line" />
          )}
        </div>
      </div>

      {/* Annotation, on wide screens only. */}
      <p
        className={`pretty hidden text-[11.5px] leading-snug lg:block ${
          bar.state === "upcoming"
            ? "text-ink-400"
            : live
              ? `font-medium ${tone.heading}`
              : "text-ink-500"
        }`}
      >
        {bar.note}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ component */

export default function Timeline({ claim }: { claim: Claim }) {
  const tone = TONE[claim.tone];
  const track = buildTrack(claim);
  const liveStage = claim.stages.find((s) => {
    const st = stageState(claim, s.key);
    return st === "current" || st === "blocked";
  });

  return (
    <section
      aria-label="Claim progress"
      className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-3.5 sm:px-7">
        <h2 className="meta text-ink-400">Where your claim is</h2>
        <span className="tnum text-[12.5px] text-ink-400">
          Filed {formatDate(claim.submittedOn)}, day {claim.daysSinceSubmission}
        </span>
      </div>

      {/* ---------------------------------------------- desktop: the track */}
      <div className="relative hidden md:block">
        {/* Construction columns, sitting behind every row. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 hidden lg:block"
          style={{
            left: PAD + LABEL_COL + GAP,
            right: PAD + NOTE_COL + GAP + CHIP_GUTTER,
          }}
        >
          {track.ticks.map((t) => (
            <span
              key={t.pct}
              className="absolute top-0 bottom-0 w-px bg-line"
              style={{ left: `${t.pct}%` }}
            />
          ))}
        </div>

        <div className="relative py-4">
          {track.bars.map((bar, i) => (
            <TrackRow key={bar.key} bar={bar} tone={tone} index={i} />
          ))}
        </div>

        {/* Date axis. */}
        <div className={`${ROW_GRID} border-t border-line px-5 py-2.5 sm:px-7`}>
          <span className="meta text-ink-400">Timeline</span>
          <div className="relative h-4">
            <div
              className="absolute inset-y-0 left-0"
              style={{ right: CHIP_GUTTER }}
            >
              {track.ticks.map((t, i) => (
                <span
                  key={t.pct}
                  className={`tnum absolute top-0 text-[10.5px] whitespace-nowrap text-ink-400 ${
                    i === 0
                      ? "translate-x-0"
                      : i === track.ticks.length - 1
                        ? "-translate-x-full"
                        : "-translate-x-1/2"
                  }`}
                  style={{ left: `${t.pct}%` }}
                >
                  {formatDateShort(t.label)}
                </span>
              ))}
            </div>
          </div>
          <span className="tnum hidden text-right text-[10.5px] text-ink-400 lg:block">
            {track.totalDays} days tracked
          </span>
        </div>

        {/* What the live stage means, said once and said clearly. */}
        {liveStage && (
          <div
            className={`border-t border-line px-5 py-5 sm:px-7 ${tone.surface}`}
          >
            <p className={`meta ${tone.heading}`}>
              Right now: {STAGE_LABELS[liveStage.key].toLowerCase()}
            </p>
            <p
              className={`pretty mt-2.5 max-w-[86ch] text-[13.5px] leading-relaxed ${tone.body}`}
            >
              {STAGE_MEANING[liveStage.key]}
            </p>
          </div>
        )}
      </div>

      {/* ------------------------------------------------ mobile: vertical */}
      <ol className="px-5 py-6 md:hidden">
        {claim.stages.map((stage, i) => (
          <MobileStage
            key={stage.key}
            stage={stage}
            bar={track.bars[i]}
            state={stageState(claim, stage.key)}
            tone={tone}
            index={i}
            isLast={i === claim.stages.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}

/* --------------------------------------------------------------- mobile */

function MobileStage({
  stage,
  bar,
  state,
  tone,
  index,
  isLast,
}: {
  stage: StageDetail;
  bar: StageBar;
  state: StageState;
  tone: ToneStyle;
  index: number;
  isLast: boolean;
}) {
  const live = state === "current" || state === "blocked";
  const done = state === "done";
  const d = 50 + index * 60;

  return (
    <li className="relative flex gap-3.5 pb-5 last:pb-0">
      {!isLast && (
        <>
          <span className="absolute top-8 bottom-0 left-[13px] w-[3px] rounded-full bg-line" />
          {done && (
            <span
              style={{ "--d": `${d}ms` } as React.CSSProperties}
              className="anim-grow-y absolute top-8 bottom-0 left-[13px] w-[3px] rounded-full bg-accent-600"
            />
          )}
        </>
      )}

      <div className="relative z-10 shrink-0">
        <Node state={state} toneFill={tone.fill} delay={d} size={32} />
      </div>

      <div
        style={{ "--d": `${d + 40}ms` } as React.CSSProperties}
        className="anim-fade min-w-0 flex-1 pt-0.5"
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p
            className={`text-[14.5px] leading-snug font-semibold ${
              state === "upcoming" ? "text-ink-400" : "text-ink-950"
            }`}
          >
            {STAGE_LABELS[stage.key]}
          </p>
          {bar.hasBar && (
            <span
              className={`tnum rounded-pill px-2 py-[2px] text-[10.5px] font-semibold ${
                live ? `${tone.block} text-white` : "bg-canvas text-ink-500"
              }`}
            >
              {dayLabel(bar)}
            </span>
          )}
          {stage.date && (
            <span className="tnum ml-auto shrink-0 font-mono text-[11px] text-ink-400">
              {formatDateShort(stage.date)}
            </span>
          )}
        </div>

        {/* This stage's share of the whole tracked window. */}
        {bar.hasBar && (
          <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <span
              style={
                {
                  left: `${bar.startPct}%`,
                  width: `${bar.widthPct}%`,
                  "--d": `${d + 60}ms`,
                } as React.CSSProperties
              }
              className={`anim-grow-x absolute inset-y-0 rounded-full ${
                live ? tone.fill : "bg-ink-200"
              }`}
            />
          </div>
        )}

        <p className="pretty mt-2 text-[13px] leading-relaxed text-ink-500">
          {stage.note}
        </p>

        {live && (
          <p
            className={`pretty mt-2.5 flex gap-2 rounded-tile px-3 py-2.5 text-[12.5px] leading-relaxed ${tone.surface} ${tone.body}`}
          >
            <ArrowRight size={13} className="mt-0.5 shrink-0" />
            <span>{STAGE_MEANING[stage.key]}</span>
          </p>
        )}
      </div>
    </li>
  );
}
