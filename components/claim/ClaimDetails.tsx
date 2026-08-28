"use client";

import { useState } from "react";
import type { Claim } from "@/lib/claims";
import { formatDate, formatRupees } from "@/lib/format";
import { Chevron } from "@/components/ui/Icons";

export default function ClaimDetails({ claim }: { claim: Claim }) {
  const [open, setOpen] = useState(false);

  const rows: { label: string; value: string; hint?: string }[] = [
    { label: "Claim reference", value: claim.id },
    { label: "UAN", value: claim.uan, hint: "Universal Account Number" },
    { label: "Member name", value: claim.memberName },
    {
      label: "PF account number",
      value: claim.pfNumber,
      hint: "Office code, establishment, member",
    },
    { label: "Employer", value: `${claim.employer}, ${claim.employerCity}` },
    { label: "Claim type", value: claim.formName, hint: claim.formPlain },
    { label: "Reason given", value: claim.purpose },
    { label: "Amount claimed", value: formatRupees(claim.amount) },
    {
      label: "Payment account",
      value: claim.bankMasked,
      hint: "Masked. Full numbers are never shown or stored",
    },
    { label: "Filed on", value: formatDate(claim.submittedOn) },
    { label: "Handled by", value: claim.officeName },
  ];

  return (
    <section className="overflow-hidden rounded-panel border border-line bg-surface shadow-panel">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-canvas sm:px-7"
      >
        <span>
          <span className="block text-[15.5px] font-semibold tracking-[-0.015em] text-ink-950">
            Full claim details
          </span>
          <span className="mt-1 block text-[13.5px] text-ink-500">
            Claim reference, PF number, amount and dates
          </span>
        </span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-tile border border-line text-ink-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <Chevron size={13} />
        </span>
      </button>

      {/* Collapse is a CSS grid-row transition, so nothing is measured in JS. */}
      <div className="collapse" data-open={open}>
        <div>
          <dl className="border-t border-line">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex flex-col gap-1 border-b border-line px-6 py-3.5 sm:flex-row sm:items-baseline sm:gap-6 sm:px-7"
              >
                <dt className="meta shrink-0 pt-1 text-ink-400 sm:w-44">
                  {r.label}
                </dt>
                <dd className="min-w-0 flex-1">
                  <span className="tnum block text-[14.5px] font-medium break-words text-ink-950">
                    {r.value}
                  </span>
                  {r.hint && (
                    <span className="pretty mt-1 block text-[12.5px] leading-relaxed text-ink-400">
                      {r.hint}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="bg-warn-50 px-6 py-4 sm:px-7">
            <p className="pretty max-w-[70ch] text-[13px] leading-relaxed text-warn-700">
              <span className="font-semibold">
                Demo data for prototype purposes.
              </span>{" "}
              This member, employer, UAN, PF number and amount are invented. No
              Aadhaar number, PAN, OTP or real bank detail exists anywhere in
              this app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
