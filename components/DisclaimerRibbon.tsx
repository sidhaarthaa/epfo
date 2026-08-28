import Shell from "./ui/Shell";

/**
 * Persistent statement that this is not an official service. Sits above
 * everything, on every page.
 */
export default function DisclaimerRibbon() {
  return (
    <div className="bg-ink-950">
      <Shell>
        <p className="meta flex flex-wrap items-center gap-x-2.5 gap-y-1 py-2.5 text-white/45">
          <span className="text-white/85">Independent hackathon prototype</span>
          <span aria-hidden="true" className="h-2.5 w-px bg-white/20" />
          <span>Not affiliated with EPFO or the Government of India</span>
          <span aria-hidden="true" className="hidden h-2.5 w-px bg-white/20 sm:block" />
          <span className="hidden sm:block">All data synthetic</span>
        </p>
      </Shell>
    </div>
  );
}
