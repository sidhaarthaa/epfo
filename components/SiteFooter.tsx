import Link from "next/link";
import Logo from "./Logo";
import Shell from "./ui/Shell";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-canvas">
      <Shell>
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr]">
          <div className="max-w-[42ch]">
            <div className="group flex items-center gap-2.5">
              <Logo size={22} />
              <span className="display text-[14.5px] text-ink-950">
                EPFO Saathi
              </span>
            </div>
            <p className="pretty mt-4 text-[14.5px] leading-relaxed text-ink-500">
              A hackathon prototype showing what PF withdrawal tracking could
              look like if it bothered to explain itself.
            </p>
          </div>

          <nav className="flex flex-col items-start gap-3">
            <span className="meta text-ink-400">Pages</span>
            <Link
              href="/"
              className="text-[14px] text-ink-700 transition-colors hover:text-accent-600"
            >
              Home
            </Link>
            <Link
              href="/track"
              className="text-[14px] text-ink-700 transition-colors hover:text-accent-600"
            >
              Track a claim
            </Link>
            <Link
              href="/about"
              className="text-[14px] text-ink-700 transition-colors hover:text-accent-600"
            >
              How this works
            </Link>
          </nav>
        </div>

        <div className="ticks-dense w-full" aria-hidden="true" />

        <div className="border-t border-line py-6">
          <p className="pretty max-w-[110ch] text-[12.5px] leading-relaxed text-ink-400">
            <span className="font-semibold text-ink-500">
              Independent hackathon prototype. Not affiliated with, endorsed by,
              or connected to EPFO, the Ministry of Labour and Employment, or
              the Government of India.
            </span>{" "}
            Every claim, name, employer, UAN and amount in this app is invented
            demo data generated in the browser. No government API, portal or
            live system is contacted. Nothing here is legal or financial advice.
            For your real claim, always check the official EPFO member portal.
          </p>
        </div>
      </Shell>
    </footer>
  );
}
