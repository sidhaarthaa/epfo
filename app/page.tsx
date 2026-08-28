import Link from "next/link";
import Shell from "@/components/ui/Shell";
import Hero from "@/components/landing/Hero";
import StageStrip from "@/components/landing/StageStrip";
import TranslationDemo from "@/components/landing/TranslationDemo";
import ScenarioStack from "@/components/landing/ScenarioStack";
import Outcomes from "@/components/landing/Outcomes";
import { ArrowRight } from "@/components/ui/Icons";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StageStrip />
      <TranslationDemo />
      <ScenarioStack />
      <Outcomes />

      {/* -------------------------------------------------------- last CTA */}
      <section className="defer-paint border-b border-line bg-ink-950">
        <Shell className="py-16 lg:py-24">
            <p className="meta flex items-center gap-2 text-white/45">
              <ArrowRight size={12} />
              No login required
            </p>
            <h2 className="display mt-7 max-w-[18ch] text-[34px] text-white sm:text-[48px] lg:text-[60px]">
              It is your money.
              <br />
              <span className="text-white/45">
                You should be able to see where it is.
              </span>
            </h2>
            <p className="pretty mt-7 max-w-[46ch] text-[15.5px] leading-relaxed text-white/50">
              Nothing to install and nothing to sign up for. Open one of the
              five demo claims and you will see the whole thing.
            </p>
            <Link
              href="/track"
              className="group mt-10 inline-flex items-center gap-2 rounded-pill bg-white px-7 py-3.5 text-[15px] font-semibold text-ink-950 transition-colors duration-200 hover:bg-canvas"
            >
              Track a claim
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
        </Shell>
      </section>
    </>
  );
}
