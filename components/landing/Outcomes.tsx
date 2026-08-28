"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Shell from "@/components/ui/Shell";
import { ArrowRight, Check, Bang } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/* --------------------------------------------------- flat mini visuals */

/** A miniature of the claim tracker. */
function TrackerMini() {
  const rows = [
    { w: 26, x: 0, live: false },
    { w: 34, x: 26, live: false },
    { w: 40, x: 60, live: true },
    { w: 0, x: 0, live: false },
  ];
  return (
    <svg viewBox="0 0 200 96" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={56 + i * 34}
          y1="10"
          x2={56 + i * 34}
          y2="86"
          stroke="currentColor"
          strokeWidth="1"
          className="text-line"
        />
      ))}
      {rows.map((r, i) => (
        <g key={i}>
          <rect
            x="10"
            y={16 + i * 18}
            width="38"
            height="10"
            rx="5"
            className="fill-canvas"
          />
          {r.w > 0 && (
            <rect
              x={56 + (r.x / 100) * 136}
              y={17 + i * 18}
              width={(r.w / 100) * 136}
              height="8"
              rx="4"
              className={r.live ? "fill-ink-950" : "fill-ink-200"}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

/** A miniature of the plain-language verdict card. */
function VerdictMini() {
  return (
    <svg viewBox="0 0 200 96" className="h-full w-full" aria-hidden="true">
      <rect
        x="10"
        y="12"
        width="180"
        height="72"
        rx="8"
        className="fill-surface stroke-line"
        strokeWidth="1"
      />
      <rect x="24" y="26" width="42" height="7" rx="3.5" className="fill-ink-200" />
      <rect x="24" y="42" width="140" height="9" rx="4.5" className="fill-ink-950" />
      <rect x="24" y="57" width="104" height="9" rx="4.5" className="fill-ink-950" />
      <rect x="136" y="57" width="30" height="9" rx="4.5" className="fill-ink-200" />
    </svg>
  );
}

/** A miniature of the copy-for-HR message block. */
function MessageMini() {
  return (
    <svg viewBox="0 0 200 96" className="h-full w-full" aria-hidden="true">
      <rect
        x="10"
        y="10"
        width="140"
        height="52"
        rx="8"
        className="fill-surface stroke-line"
        strokeWidth="1"
      />
      <rect x="24" y="24" width="112" height="6" rx="3" className="fill-ink-200" />
      <rect x="24" y="36" width="92" height="6" rx="3" className="fill-ink-200" />
      <rect x="24" y="48" width="60" height="6" rx="3" className="fill-ink-200" />
      <rect x="96" y="66" width="94" height="22" rx="11" className="fill-ink-950" />
      <rect x="110" y="75" width="48" height="5" rx="2.5" className="fill-surface" />
      <circle cx="170" cy="77" r="3" className="fill-surface" />
    </svg>
  );
}

/** A miniature of the escalation state. */
function EscalateMini() {
  return (
    <svg viewBox="0 0 200 96" className="h-full w-full" aria-hidden="true">
      <rect x="10" y="14" width="180" height="1" className="fill-line" />
      <rect x="10" y="44" width="180" height="1" className="fill-line" />
      <rect x="10" y="74" width="180" height="1" className="fill-line" />
      <rect x="18" y="22" width="86" height="14" rx="7" className="fill-ink-200" />
      <rect x="18" y="52" width="132" height="14" rx="7" className="fill-ink-200" />
      <rect x="18" y="82" width="60" height="10" rx="5" className="fill-ink-950" />
      <circle cx="168" cy="59" r="11" className="fill-ink-950" />
      <path
        d="M164 59h8m0 0-3-3m3 3-3 3"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- data */

const CARDS = [
  {
    visual: VerdictMini,
    lead: "It tells you why,",
    rest: "not just what, in one plain sentence at the top of the page.",
    tag: "The verdict",
    span: true,
  },
  {
    visual: TrackerMini,
    lead: "It shows which desk",
    rest: "your file is sitting on, and how many days it has been there.",
    tag: "The tracker",
  },
  {
    visual: MessageMini,
    lead: "It writes the message",
    rest: "to your HR, with your claim reference already in it.",
    tag: "The nudge",
  },
  {
    visual: EscalateMini,
    lead: "It says when to escalate,",
    rest: "and just as clearly when escalating would be a waste of your time.",
    tag: "The last resort",
  },
];

/* ----------------------------------------------------------- component */

export default function Outcomes() {
  return (
    <section className="border-b border-line">
      <Shell className="py-14 lg:py-20">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <h2 className="display max-w-[13ch] text-[32px] text-ink-950 sm:text-[44px]">
            What you<br />
            <span className="text-ink-400">actually get</span>
          </h2>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <p className="pretty max-w-[36ch] text-[13.5px] leading-relaxed text-ink-500 sm:text-right">
              Four things the official portal does not do, on every one of the
              five demo claims.
            </p>
            <Link
              href="/track"
              className="group inline-flex items-center gap-2 rounded-pill bg-ink-950 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
            >
              Open a claim
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => {
            const Visual = c.visual;
            return (
              <motion.article
                key={c.lead}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className={`flex flex-col overflow-hidden rounded-panel border border-line bg-surface ${
                  c.span ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`border-b border-line bg-canvas ${
                    c.span ? "h-52" : "h-40"
                  }`}
                >
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="pretty flex-1 text-[16.5px] leading-snug text-ink-400">
                    <ArrowRight
                      size={14}
                      className="mr-1.5 mb-0.5 inline-block text-ink-950"
                    />
                    <span className="font-semibold text-ink-950">{c.lead}</span>{" "}
                    {c.rest}
                  </p>
                  <p className="meta mt-6 text-ink-400">{c.tag}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
