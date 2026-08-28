import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllClaims, getClaim } from "@/lib/claims";
import ClaimDashboard from "@/components/claim/ClaimDashboard";

type Props = { params: Promise<{ id: string }> };

/** Every demo claim is prerendered. The app ships with no backend at all. */
export function generateStaticParams() {
  return getAllClaims().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const claim = getClaim(id);
  if (!claim) return { title: "Claim not found, EPFO Saathi" };
  return {
    title: `${claim.statusLabel}, ${claim.id}, EPFO Saathi`,
    description: claim.headline,
  };
}

export default async function ClaimPage({ params }: Props) {
  const { id } = await params;
  const claim = getClaim(id);
  if (!claim) notFound();
  return <ClaimDashboard claim={claim} />;
}
