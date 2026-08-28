import {
  DEMO_TODAY,
  stageState,
  STAGE_LABELS,
  type Claim,
  type StageKey,
  type StageState,
} from "./claims";

const DAY = 86_400_000;

const t = (iso: string) => Date.parse(iso + "T00:00:00Z");
const daysBetween = (a: string, b: string) => Math.round((t(b) - t(a)) / DAY);
const addDays = (iso: string, n: number) =>
  new Date(t(iso) + n * DAY).toISOString().slice(0, 10);

export interface StageBar {
  key: StageKey;
  label: string;
  state: StageState;
  /** Left edge, as a percentage of the tracked window. */
  startPct: number;
  /** Width, as a percentage of the tracked window. */
  widthPct: number;
  /** Whole days this stage has occupied so far. */
  days: number;
  /** False for stages that have not started, which get no bar. */
  hasBar: boolean;
  note: string;
}

export interface TrackModel {
  bars: StageBar[];
  ticks: { label: string; pct: number }[];
  totalDays: number;
  clearedCount: number;
}

/**
 * Turns a claim into a Gantt-style model.
 *
 * A stage that is finished ran from the previous stage's event date up to its
 * own. A stage that is live runs from its own date (or the previous one, when
 * it has not been stamped yet) up to today. Stages that have not started get
 * no bar at all.
 *
 * Read against the demo data, this reproduces the durations quoted in the
 * written copy exactly: employer took 2 days on EPF-2026-88421, the Hyderabad
 * office has held EPF-2026-90233 for 25 days, and so on.
 */
export function buildTrack(claim: Claim): TrackModel {
  const start = claim.submittedOn;
  const lastDated = [...claim.stages].reverse().find((s) => s.date)?.date;
  const end =
    claim.tone === "completed" && lastDated ? lastDated : DEMO_TODAY;

  // Guard against a zero-width window on a claim filed today.
  const totalDays = Math.max(1, daysBetween(start, end));
  const pct = (iso: string) =>
    Math.min(100, Math.max(0, (daysBetween(start, iso) / totalDays) * 100));

  const bars: StageBar[] = claim.stages.map((stage, i) => {
    const state = stageState(claim, stage.key);
    const live = state === "current" || state === "blocked";
    const prevDate =
      claim.stages
        .slice(0, i)
        .reverse()
        .find((s) => s.date)?.date ?? start;

    let from: string | null = null;
    let to: string | null = null;

    if (state === "upcoming") {
      from = null;
    } else if (live) {
      from = stage.date ?? prevDate;
      to = end;
    } else {
      // Finished. The first stage is an instant, not a span.
      from = i === 0 ? (stage.date ?? start) : prevDate;
      to = stage.date ?? prevDate;
    }

    if (!from || !to) {
      return {
        key: stage.key,
        label: STAGE_LABELS[stage.key],
        state,
        startPct: 0,
        widthPct: 0,
        days: 0,
        hasBar: false,
        note: stage.note,
      };
    }

    const startPct = pct(from);
    const days = Math.max(0, daysBetween(from, to));

    return {
      key: stage.key,
      label: STAGE_LABELS[stage.key],
      state,
      startPct,
      // Never smaller than a visible nub, never past the right edge.
      widthPct: Math.min(100 - startPct, Math.max(1.5, pct(to) - startPct)),
      days,
      hasBar: true,
      note: stage.note,
    };
  });

  const TICKS = 5;
  const ticks = Array.from({ length: TICKS }, (_, i) => {
    const p = (i / (TICKS - 1)) * 100;
    return {
      pct: p,
      label: addDays(start, Math.round((p / 100) * totalDays)),
    };
  });

  return {
    bars,
    ticks,
    totalDays,
    clearedCount: bars.filter((b) => b.state === "done").length,
  };
}
