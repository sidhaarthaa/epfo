import type { ClaimTone } from "./claims";

export interface ToneStyle {
  /** Small solid swatch, used inside meta tags and next to labels. */
  swatch: string;
  /** Tinted surface for the action panel. */
  surface: string;
  /** Heading text colour on the tinted surface. */
  heading: string;
  /** Body text colour on the tinted surface. */
  body: string;
  /** Progress and timeline fill colour. */
  fill: string;
  /** Numbered-step chip. */
  chip: string;
  /** Icon tile tint. */
  tile: string;
  /** Deep solid block that carries white text. */
  block: string;
}

/**
 * Class strings are written out in full, never composed at runtime, so the
 * Tailwind scanner can see every one of them.
 */
export const TONE: Record<ClaimTone, ToneStyle> = {
  on_track: {
    swatch: "bg-accent-600",
    surface: "bg-accent-50",
    heading: "text-accent-700",
    body: "text-accent-700/85",
    fill: "bg-accent-600",
    chip: "bg-accent-100 text-accent-700",
    tile: "bg-accent-100 text-accent-700",
    block: "bg-accent-600",
  },
  needs_you: {
    swatch: "bg-warn-600",
    surface: "bg-warn-50",
    heading: "text-warn-700",
    body: "text-warn-700/85",
    fill: "bg-warn-600",
    chip: "bg-warn-100 text-warn-700",
    tile: "bg-warn-100 text-warn-700",
    block: "bg-warn-700",
  },
  needs_employer: {
    swatch: "bg-info-600",
    surface: "bg-info-50",
    heading: "text-info-700",
    body: "text-info-700/85",
    fill: "bg-info-600",
    chip: "bg-info-100 text-info-700",
    tile: "bg-info-100 text-info-700",
    block: "bg-info-700",
  },
  delayed: {
    swatch: "bg-alert-600",
    surface: "bg-alert-50",
    heading: "text-alert-700",
    body: "text-alert-700/85",
    fill: "bg-alert-600",
    chip: "bg-alert-100 text-alert-700",
    tile: "bg-alert-100 text-alert-700",
    block: "bg-alert-700",
  },
  completed: {
    swatch: "bg-accent-600",
    surface: "bg-accent-50",
    heading: "text-accent-700",
    body: "text-accent-700/85",
    fill: "bg-accent-600",
    chip: "bg-accent-100 text-accent-700",
    tile: "bg-accent-100 text-accent-700",
    block: "bg-accent-600",
  },
};
