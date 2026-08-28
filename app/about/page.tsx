import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/ui/Shell";
import MetaTag from "@/components/ui/MetaTag";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "How this works, EPFO Saathi",
  description:
    "What EPFO Saathi is, what is real, what is mocked, and where the plain English explanations come from.",
};

const JARGON = [
  {
    term: "UAN",
    plain:
      "Universal Account Number. One 12 digit number that stays with you across every job and ties all your PF accounts together.",
  },
  {
    term: "Form 19",
    plain:
      "The form you file to close your PF account and withdraw the whole balance, usually after leaving a job or retiring.",
  },
  {
    term: "Form 10C",
    plain:
      "The form for the pension portion of your PF. Usually filed alongside Form 19.",
  },
  {
    term: "Form 31",
    plain:
      "A partial withdrawal. You take out some money for a specific reason like a house, medical treatment or a wedding, and stay a PF member.",
  },
  {
    term: "Attestation",
    plain:
      "Your employer digitally signing your claim to confirm it is genuine. Without it, EPFO never receives the claim.",
  },
  {
    term: "Field office",
    plain:
      "The regional EPFO office that actually processes your file. Which one you get depends on where your employer is registered.",
  },
  {
    term: "EPFiGMS",
    plain:
      "EPFO's official complaints portal. Filing there puts your claim on a tracked list with a response deadline.",
  },
];

const REAL = [
  "The five claim stages, and the order they happen in.",
  "The reasons claims actually get stuck: employer attestation, KYC and name mismatches, and plain queue backlog.",
  "The rough processing windows, and EPFO's own 20 day service standard for final settlements.",
  "The escalation route through EPFiGMS, and the fact that it is the lever that reliably moves a stalled file.",
];

const MOCKED = [
  "Every claim, member name, employer, UAN, PF number, amount and date.",
  "The lookup itself. Nothing leaves your browser, and there is no server or database.",
  "The grievance button, which sets a UI state and files nothing anywhere.",
  "The status text attributed to the EPFO portal, written in the style of real portal messages rather than copied from one.",
];

export default function AboutPage() {
  return (
    <>
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
            <span className="font-medium text-ink-950">How this works</span>
          </nav>
        </Shell>
      </div>

      <Shell className="py-14 lg:py-20">
        <MetaTag segments={["About"]} />
        <h1 className="display mt-6 max-w-[20ch] text-[36px] text-ink-950 sm:text-[52px]">
          What this is,
          <br />
          <span className="text-ink-400">and what it is not.</span>
        </h1>
        <p className="pretty mt-6 max-w-[68ch] text-[17px] leading-[1.7] text-ink-500">
          EPFO Saathi is a hackathon prototype. It takes the claim status
          information a PF member already has access to and rewrites it the way
          a person would explain it: what stage you are at, why you are there,
          how long it should take, and what to do about it. That is the whole
          idea. No new data, just a translation layer.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="h-full rounded-panel border border-accent-100 bg-accent-50 p-7 sm:p-8">
            <h2 className="meta text-accent-700">
              Grounded in how it really works
            </h2>
            <ul className="mt-6 space-y-4">
              {REAL.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent-600" />
                  <span className="pretty text-[14.5px] leading-relaxed text-accent-700/90">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full rounded-panel border border-warn-100 bg-warn-50 p-7 sm:p-8">
            <h2 className="meta text-warn-700">Entirely mocked</h2>
            <ul className="mt-6 space-y-4">
              {MOCKED.map((m) => (
                <li key={m} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-warn-600" />
                  <span className="pretty text-[14.5px] leading-relaxed text-warn-700/90">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ----------------------------------------------------- jargon list */}
        <section className="mt-16">
          <MetaTag segments={["Glossary"]} />
          <h2 className="display mt-6 text-[30px] text-ink-950 sm:text-[38px]">
            The jargon,
            <span className="text-ink-400"> decoded</span>
          </h2>
          <p className="pretty mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-ink-500">
            Terms the official portal uses without ever explaining them.
          </p>

          <dl className="mt-8 overflow-hidden rounded-panel border border-line bg-surface shadow-panel">
            {JARGON.map((j) => (
              <div
                key={j.term}
                className="flex flex-col gap-1.5 border-b border-line px-6 py-5 last:border-b-0 sm:flex-row sm:gap-10 sm:px-8"
              >
                <dt className="shrink-0 text-[14.5px] font-semibold text-ink-950 sm:w-44">
                  {j.term}
                </dt>
                <dd className="pretty max-w-[74ch] flex-1 text-[14.5px] leading-relaxed text-ink-500">
                  {j.plain}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <div className="rounded-panel border border-line bg-canvas p-7 sm:p-10">
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-ink-950">
              A word on trust
            </h2>
            <p className="pretty mt-4 max-w-[68ch] text-[15.5px] leading-relaxed text-ink-500">
              An app that talks confidently about somebody's savings has to be
              careful. So: this prototype asks for nothing, stores nothing, and
              sends nothing anywhere. There is no login because there is nothing
              to log into. The timings it quotes are typical ranges rather than
              promises. Your real claim can move faster or slower, and only the
              official EPFO member portal can tell you what it is actually
              doing.
            </p>
            <Link
              href="/track"
              className="group mt-8 inline-flex items-center gap-2 rounded-pill bg-accent-600 px-6 py-3 text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-accent-700"
            >
              Try the demo claims
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </Shell>
    </>
  );
}
