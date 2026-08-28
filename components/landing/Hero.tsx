"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Shell from "@/components/ui/Shell";
import { ArrowRight } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="border-b border-line">
      {/* Construction grid, drawn in hairlines. No fills, no gradients. */}
      <div className="blueprint relative border-b border-line">
        <Shell>
          <div className="pt-20 pb-12 lg:pt-32 lg:pb-16">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="meta flex items-center gap-2 text-ink-400"
            >
              <ArrowRight size={12} />
              Independent prototype
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease }}
              className="display mt-7 max-w-[16ch] text-[44px] text-ink-950 sm:text-[64px] lg:text-[76px] xl:text-[88px]"
            >
              Your PF claim status,
              <br />
              <span className="text-ink-400">explained in plain English</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease }}
              className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            >
              <Link
                href="/track"
                className="group inline-flex items-center justify-center gap-2 rounded-pill bg-ink-950 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
              >
                Track your claim
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-pill border border-line bg-surface px-7 py-3.5 text-[15px] font-semibold text-ink-700 transition-colors duration-200 hover:border-ink-200 hover:text-ink-950"
              >
                How this works
              </Link>
            </motion.div>
          </div>
        </Shell>
      </div>

      {/* Supporting row, split by hairlines like a spec sheet. */}
      <Shell>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26, ease }}
          className="grid divide-y divide-line md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] md:divide-x md:divide-y-0"
        >
          <div className="py-6 md:pr-8">
            <p className="pretty max-w-[38ch] text-[13.5px] leading-relaxed text-ink-500">
              The official portal tells you{" "}
              <span className="font-mono text-ink-900">
                Claim Under Process at Field Office
              </span>
              . That is all you get.
            </p>
          </div>

          <div className="hidden items-center px-8 md:flex">
            <ArrowRight size={18} className="text-ink-400" />
          </div>

          <div className="py-6 md:px-8">
            <p className="pretty max-w-[38ch] text-[13.5px] leading-relaxed text-ink-500">
              We tell you which desk your file is on, why it stopped, who can
              unblock it, and exactly what to say to them.
            </p>
          </div>

          <div className="py-6 md:pl-8">
            <p className="tnum display text-[26px] text-ink-950">5</p>
            <p className="meta mt-2 text-ink-400">Demo claims, no login</p>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
