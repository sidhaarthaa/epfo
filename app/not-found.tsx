import Link from "next/link";
import Shell from "@/components/ui/Shell";
import MetaTag from "@/components/ui/MetaTag";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { DEMO_SHORTCUTS, getClaim } from "@/lib/claims";
import { TONE } from "@/lib/tone";

export default function NotFound() {
  return (
    <Shell className="py-16 lg:py-24">
      <MetaTag accent="bg-warn-600" segments={["No claim found"]} />
      <h1 className="display balance mt-6 max-w-[22ch] text-[34px] text-ink-950 sm:text-[48px]">
        That claim reference does not exist here.
      </h1>
      <p className="pretty mt-6 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-500">
        This is a prototype with exactly five invented claims in it. There is no
        real EPFO data behind it, so any other reference will come up empty.
        Pick one of the five below and you will see the full thing.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {DEMO_SHORTCUTS.map((s) => {
          const claim = getClaim(s.claimId);
          const tone = TONE[s.tone];
          return (
            <Link
              key={s.claimId}
              href={`/claim/${s.claimId}`}
              className="lift group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
            >
              <span className={`h-1 w-full ${tone.fill}`} aria-hidden="true" />
              <span className="flex flex-1 flex-col p-5">
                <span className={`meta ${tone.heading}`}>
                  {claim?.statusLabel}
                </span>
                <span className="mt-3.5 block flex-1 text-[15px] leading-snug font-semibold text-ink-950">
                  {s.label}
                </span>
                <span className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
                  <span className="tnum font-mono text-[12px] text-ink-400">
                    {claim?.id}
                  </span>
                  <ArrowRight className="text-ink-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-600" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent-600 hover:text-accent-700"
      >
        <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        Back to the home page
      </Link>
    </Shell>
  );
}
