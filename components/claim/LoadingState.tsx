"use client";

import { motion } from "framer-motion";

function Bar({ w, h = 13 }: { w: string; h?: number }) {
  return (
    <div
      className="animate-pulse rounded-full bg-line"
      style={{ width: w, height: h }}
    />
  );
}

/** Shown by Next while the claim route loads. There is no network call. */
export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-2.5 py-3.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-600" />
        </span>
        <span className="meta text-ink-400">Reading your claim</span>
      </div>

      <div className="mt-4 space-y-4 rounded-panel border border-line bg-surface p-8 shadow-panel">
        <Bar w="130px" h={24} />
        <Bar w="min(100%, 560px)" h={30} />
        <Bar w="min(80%, 430px)" h={30} />
        <div className="space-y-3 pt-3">
          <Bar w="min(100%, 520px)" />
          <Bar w="min(90%, 470px)" />
          <Bar w="min(66%, 360px)" />
        </div>
      </div>

      <div className="mt-5 rounded-panel border border-line bg-surface p-10 shadow-panel">
        <div className="flex items-center justify-between gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-3">
              <div className="h-7 w-7 animate-pulse rounded-full bg-line" />
              <div className="h-2.5 w-full max-w-[74px] animate-pulse rounded-full bg-line" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 h-40 animate-pulse rounded-panel border border-line bg-surface" />
    </motion.div>
  );
}
