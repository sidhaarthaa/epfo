import type { Metadata } from "next";
import TrackForm from "@/components/track/TrackForm";

export const metadata: Metadata = {
  title: "Track a claim, EPFO Saathi",
  description:
    "Enter a demo claim reference or UAN, or pick one of five ready made scenarios.",
};

export default function TrackPage() {
  return <TrackForm />;
}
