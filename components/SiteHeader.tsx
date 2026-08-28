import Link from "next/link";
import Logo from "./Logo";
import Shell from "./ui/Shell";

/**
 * Floating pill. Sits below the disclaimer ribbon in normal flow, then sticks
 * a few pixels off the top edge so content scrolls underneath it.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-3 z-40 pt-3 pb-1">
      <Shell>
        <div className="flex h-14 items-center justify-between gap-3 rounded-pill border border-line bg-canvas pr-2 pl-2 shadow-float sm:pl-5 lg:bg-canvas/80 lg:backdrop-blur-xl">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded-pill px-2 py-1.5 sm:px-0"
            aria-label="EPFO Saathi, home"
          >
            <Logo />
            <span className="display text-[16px] tracking-[-0.02em] text-ink-950">
              EPFO Saathi
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-1">
            <Link
              href="/about"
              className="hidden min-h-11 items-center rounded-pill px-4 py-2.5 text-[13.5px] font-medium text-ink-500 transition-colors duration-200 hover:bg-ink-950/[0.06] hover:text-ink-950 sm:flex"
            >
              How this works
            </Link>
            <Link
              href="/track"
              className="inline-flex min-h-11 items-center rounded-pill bg-ink-950 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-ink-900"
            >
              Track a claim
            </Link>
          </nav>
        </div>
      </Shell>
    </header>
  );
}
