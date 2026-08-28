"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { DEMO_SHORTCUTS, getClaim, lookupClaim } from "@/lib/claims";
import { TONE } from "@/lib/tone";
import Shell from "@/components/ui/Shell";
import MetaTag from "@/components/ui/MetaTag";
import { ArrowRight, Search, Bang } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

export default function TrackForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [, startTransition] = useTransition();

  function go(id: string) {
    startTransition(() => router.push(`/claim/${id}`));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!value.trim()) {
      setError("Enter a claim reference or UAN, or just pick one below.");
      return;
    }

    // Simulated lookup. Nothing leaves the browser, there is no backend.
    setChecking(true);
    setTimeout(() => {
      const claim = lookupClaim(value);
      setChecking(false);
      if (claim) {
        go(claim.id);
      } else {
        setError(
          "No claim matches that. This prototype has five demo claims in it, so pick one of them to see how it works."
        );
      }
    }, 450);
  }

  return (
    <>
      {/* ------------------------------------------------------- breadcrumb */}
      <div className="border-b border-line bg-canvas">
        <Shell>
          <nav className="flex h-12 items-center gap-2 text-[13px]">
            <Link
              href="/"
              className="text-ink-400 transition-colors hover:text-ink-900"
            >
              EPFO Saathi
            </Link>
            <span className="text-ink-200">/</span>
            <span className="font-medium text-ink-950">Track a claim</span>
          </nav>
        </Shell>
      </div>

      <Shell className="py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          <h1 className="display max-w-[16ch] text-[36px] text-ink-950 sm:text-[48px]">
            Track your claim
          </h1>
          <p className="pretty mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-500">
            Enter the reference from your withdrawal, or your UAN, the 12 digit
            number that follows you from job to job. No password, no OTP, and
            nothing you type here is sent anywhere.
          </p>
        </motion.div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-8">
          {/* -------------------------------------------------------- search */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease }}
            className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
          >
            <form onSubmit={onSubmit} className="p-6 sm:p-8">
              <label
                htmlFor="claim-input"
                className="block text-[15.5px] font-semibold text-ink-950"
              >
                Claim reference or UAN
              </label>
              <p className="mt-1.5 text-[13.5px] text-ink-500">
                Try EPF-2026-88421, or any of the five references beside this.
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-400">
                    <Search size={15} />
                  </span>
                  <input
                    id="claim-input"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Search a claim reference or UAN"
                    autoComplete="off"
                    spellCheck={false}
                    className="tnum w-full rounded-pill border border-line bg-canvas py-3 pr-4 pl-10 text-[15px] text-ink-950 transition-colors duration-200 placeholder:text-ink-400 focus:border-accent-600 focus:bg-surface focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={checking}
                  className="shrink-0 rounded-pill bg-ink-950 px-6 py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink-900 disabled:opacity-60"
                >
                  {checking ? "Checking" : "Check status"}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.26, ease }}
                  >
                    <p className="pretty mt-4 flex gap-2.5 rounded-tile border border-warn-100 bg-warn-50 px-4 py-3 text-[13.5px] leading-relaxed text-warn-700">
                      <Bang size={15} className="mt-px shrink-0" />
                      <span>{error}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="border-t border-line bg-canvas px-6 py-5 sm:px-8">
              <p className="pretty max-w-[54ch] text-[13px] leading-relaxed text-ink-500">
                <span className="font-semibold text-ink-950">
                  Why there is no login:
                </span>{" "}
                this prototype has no connection to any EPFO system. Everything
                is synthetic data generated inside the app, so there is nothing
                to authenticate against, and nothing of yours to leak.
              </p>
            </div>
          </motion.section>

          {/* ----------------------------------------------------- scenarios */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease }}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[15.5px] font-semibold text-ink-950">
                Or open a ready made scenario
              </h2>
              <MetaTag segments={["Demo data"]} />
            </div>
            <p className="mt-1.5 text-[13.5px] text-ink-500">
              One click each. Between them they cover every situation this app
              handles.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {DEMO_SHORTCUTS.map((s) => {
                const claim = getClaim(s.claimId);
                const tone = TONE[s.tone];
                return (
                  <button
                    key={s.claimId}
                    onClick={() => go(s.claimId)}
                    className="lift group flex flex-col rounded-panel border border-line bg-surface p-5 text-left shadow-panel"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-[3px] ${tone.swatch}`}
                        aria-hidden="true"
                      />
                      <span className={`meta ${tone.heading}`}>
                        {claim?.statusLabel}
                      </span>
                    </span>
                    <span className="mt-3.5 block text-[15px] leading-snug font-semibold text-ink-950">
                      {s.label}
                    </span>
                    <span className="pretty mt-1.5 block flex-1 text-[13.5px] leading-relaxed text-ink-500">
                      {s.blurb}
                    </span>
                    <span className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
                      <span className="tnum font-mono text-[12px] text-ink-400">
                        {claim?.id}
                      </span>
                      <ArrowRight className="text-ink-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-600" />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.section>
        </div>
      </Shell>
    </>
  );
}
