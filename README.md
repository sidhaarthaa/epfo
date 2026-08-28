# EPFO Saathi

A plain-language status tracker for EPFO (Employees' Provident Fund) withdrawal
claims in India.

**This is an independent hackathon prototype. It is not affiliated with,
endorsed by, or connected to EPFO, the Ministry of Labour and Employment, or
the Government of India. Every piece of data in it is invented.**

---

## The problem

When you withdraw your PF, the official member portal shows you a status line
like this:

```
Claim Form-19 Rejected / Returned, KYC Not Approved
```

That is the whole message. It does not tell you what went wrong, who can fix
it, whether you should wait or act, or how long it should take. Millions of
people withdrawing their own savings are left guessing whether their claim is
stuck on a KYC mismatch, an employer who has not signed, a bank verification
failure, or nothing at all. So they call the helpline, and file the claim
again, which makes it worse.

## What this does

It takes the same underlying claim state and explains it the way a well
informed friend would:

- **Where it is.** A five stage timeline: submitted, verified by employer,
  processed by EPFO, approved, amount disbursed. The current stage is
  highlighted and the progress animates in.
- **Why it is there.** A plain-language explanation naming the actual blocker
  and who controls it.
- **What to do.** One clear instruction, which is sometimes "nothing, just
  wait". Where a message to HR is needed, the app writes it for you with the
  claim reference already filled in.
- **When to expect it.** A realistic window, with an honest note when a claim
  is already past the normal one.
- **How to escalate.** A grievance route that only opens when raising one would
  actually help, with the reasoning shown either way.

Jargon is never used bare. "Form 19" is always paired with a clause explaining
that it is the form for closing your PF account and taking the balance out.

## Demo

There is no login, because there is no real data to protect. Five claims are
built in, covering the situations people actually hit:

| Reference | Situation |
| --- | --- |
| `EPF-2026-88421` | Moving normally. Nothing needed from the member. |
| `EPF-2026-73310` | Stuck on a bank KYC name mismatch. Needs member action. |
| `EPF-2026-51907` | Stuck waiting on employer attestation. Needs HR. |
| `EPF-2026-90233` | 31 days at the field office with no query raised. Escalate. |
| `EPF-2026-64158` | Settled and credited. |

Each claim also has a UAN that works as a lookup key. Search is forgiving about
spaces, dashes and case.

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

To build and run the production bundle:

```bash
npm run build
npm start
```

## Deploying

The app is Vercel ready with no configuration. Import the repository and
deploy, or:

```bash
npx vercel
```

Every route is prerendered at build time (`generateStaticParams` covers all
five claim pages), so it also works on any static or serverless host. There are
no environment variables, no database, and no API keys.

## What is real and what is mocked

**Grounded in how EPFO actually works:**

- The five claim stages and the order they happen in.
- The real reasons claims stall: employer attestation, KYC and name mismatches,
  and plain queue backlog at the field office.
- The rough processing windows, and EPFO's own 20 day service standard for
  final settlements.
- The escalation route through EPFiGMS, and the fact that a formal grievance is
  the lever that reliably moves a stalled file.

**Entirely mocked:**

- Every claim, member name, employer, UAN, PF number, amount and date.
- The lookup itself. Nothing leaves the browser. There is no server, no
  database, and no network call of any kind.
- The "raise a grievance" button, which sets a UI state and files nothing
  anywhere.
- The status strings attributed to the EPFO portal. These are written in the
  style of real portal messages, not copied from one.

**Deliberately absent:** there are no Aadhaar numbers, no PAN, no OTPs and no
real bank details anywhere in the codebase. Bank references are masked
placeholders like "HDFC Bank, account ending 4471".

## Tech

- Next.js 15 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion for the timeline and page transitions
- Inter and Plus Jakarta Sans via `next/font`

## Layout

```
app/
  layout.tsx              root shell, persistent disclaimer ribbon
  page.tsx                landing
  track/page.tsx          claim lookup and demo shortcuts
  claim/[id]/page.tsx     dashboard, prerendered per claim
  claim/[id]/loading.tsx  route level skeleton
  about/page.tsx          what is real, what is mocked, glossary
  not-found.tsx           unknown reference, offers the five demo claims
components/
  ui/                     Shell, MetaTag, IconTile, Icons
  landing/                Hero, StageStrip, Manifesto, TranslationDemo,
                          ScenarioStack, Outcomes
  track/                  TrackForm
  claim/                  ClaimTopBar, VerdictPanel, SummaryRail, Timeline,
                          ActionCard, EtaCard, EscalationCard, ClaimDetails,
                          LoadingState
lib/
  claims.ts               all mock data and the copy for every scenario
  track.ts                turns a claim into Gantt bar geometry
  tone.ts                 status to colour mapping
  format.ts               rupee and date formatting
```

All the writing lives in `lib/claims.ts`. To add a scenario, add an object to
the `CLAIMS` array and, if you want it on the landing page, an entry in
`DEMO_SHORTCUTS`. Nothing else needs to change.

## Design

Warm off-white canvas, white panels, hairline rules used as dividers, and one
deep green accent reserved for status and progress. Near-black for primary
actions. Navigation is a floating pill that sticks a few pixels off the top
edge, with a second pill carrying claim context on the dashboard. Controls,
chips and meta tags are all capsule shaped; panels use a 22px corner. There are no colour gradients anywhere: the only
`linear-gradient` declarations in the stylesheet are hard 1px stops that draw
the tick rules and the construction grid.

The home page is editorial and flat, built from hairline-bordered cells: a
large two tone headline, a spec row split by rules, the five stages laid out
like a credentials strip, an oversized statement with the four things the
product does picked out in near-black, an expandable stack of the five demo
scenarios, and a grid of outcome cards illustrated with flat inline SVG rather
than imagery. Application surfaces carry a soft shadow to sit above the canvas;
marketing surfaces stay flat.

The layout is full width rather than a narrow centred column: line length is
controlled per block with character caps, so the page fills a laptop or desktop
display instead of leaving dead margins. The claim dashboard is a two column
workspace, with the narrative in the main column and a sticky context rail
carrying the summary, timing and escalation. The summary states the amount
large, then stacks the running figures in a solid block coloured by the claim's
state. Below the large breakpoint the
rail folds into the main column, directly under the timeline, so the summary
still arrives before the long form content. The timeline runs vertically on
narrow screens and becomes a Gantt style tracker from the medium breakpoint up:
one capsule bar per stage laid on a shared date axis, a duration chip at the end
of each bar, and the live stage filled and tinted. The bar geometry is derived
from the claim dates in `lib/track.ts`, so the durations it draws match the
durations the written copy quotes.

## Licence and disclaimer

Prototype code, provided as is. Nothing in this app is legal or financial
advice. For your real claim, use the official EPFO member portal.
