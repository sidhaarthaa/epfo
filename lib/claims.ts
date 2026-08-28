/**
 * EPFO Saathi, mock claim data layer.
 *
 * Everything in this file is synthetic demo data. No real EPFO, UMANG or
 * government API is called anywhere in this app. Names, employers, UANs,
 * claim IDs, PF numbers and amounts are invented. Bank references are masked
 * placeholders. There are no Aadhaar or PAN numbers in this file, by design.
 *
 * "Today" for the purposes of this demo is 2026-08-28.
 */

export const DEMO_TODAY = "2026-08-28";

export type StageKey =
  "submitted" | "employer" | "processing" | "approved" | "disbursed";

export const STAGE_ORDER: StageKey[] = [
  "submitted",
  "employer",
  "processing",
  "approved",
  "disbursed",
];

export const STAGE_LABELS: Record<StageKey, string> = {
  submitted: "Submitted",
  employer: "Verified by employer",
  processing: "Processed by EPFO",
  approved: "Approved",
  disbursed: "Amount disbursed",
};

/** One line on what actually happens at each stage, with no jargon in it. */
export const STAGE_MEANING: Record<StageKey, string> = {
  submitted: "You filed the claim online. EPFO has it on record.",
  employer:
    "Your company digitally signs to confirm you worked there and that you qualify.",
  processing:
    "An EPFO officer checks your work history, your ID and bank details, and how much you can withdraw.",
  approved:
    "The claim is cleared and the payment order is signed. Money is queued to be sent.",
  disbursed: "EPFO has released the money to your bank account.",
};

export type ClaimTone =
  /** Moving normally, nothing to do. */
  | "on_track"
  /** Blocked, and only the member can unblock it. */
  | "needs_you"
  /** Blocked, and only the employer can unblock it. */
  | "needs_employer"
  /** Not blocked, but well past the normal window. */
  | "delayed"
  /** Money is in the bank. */
  | "completed";

export type StageState = "done" | "current" | "blocked" | "upcoming";

export interface StageDetail {
  key: StageKey;
  /** ISO date, or null if it has not happened yet. */
  date: string | null;
  /** Short factual note shown under the stage. */
  note: string;
}

export interface ActionStep {
  text: string;
  /** Optional realistic time estimate for this single step. */
  meta?: string;
}

export interface Claim {
  id: string;
  uan: string;
  memberName: string;
  employer: string;
  employerCity: string;
  /** Form name, always paired with a plain-English gloss. */
  formName: string;
  formPlain: string;
  purpose: string;
  amount: number;
  pfNumber: string;
  bankMasked: string;
  officeName: string;
  submittedOn: string;
  daysSinceSubmission: number;

  /** A string of the kind the real member portal shows. */
  portalStatus: string;

  currentStage: StageKey;
  tone: ClaimTone;
  /** Short status pill text. */
  statusLabel: string;

  /** The one line answer to "so what is happening?" */
  headline: string;
  /** Two to four sentences: why it is where it is, in plain language. */
  explanation: string;

  action: {
    title: string;
    body: string;
    steps: ActionStep[];
    /** Optional copy-paste message the member can send to HR. */
    copyMessage?: { label: string; text: string };
  };

  eta: {
    headline: string;
    detail: string;
    /** 0 to 100, how far through the expected total time this claim is. */
    elapsedPct: number;
  };

  stages: StageDetail[];

  escalation: {
    eligible: boolean;
    /** Shown either way, so the rule is always visible. */
    note: string;
    /** Days left until a grievance is worth raising. Zero when eligible. */
    daysUntilEligible: number;
  };
}

export interface DemoShortcut {
  claimId: string;
  label: string;
  blurb: string;
  tone: ClaimTone;
}

const CLAIMS: Claim[] = [
  /* ------------------------------------------------------------------ A */
  {
    id: "EPF-2026-88421",
    uan: "100482910573",
    memberName: "Riya Sharma",
    employer: "Nimbus Retail Pvt Ltd",
    employerCity: "Mumbai",
    formName: "Form 31",
    formPlain:
      "Form 31 is a partial withdrawal, where you take out some of your PF but stay a member",
    purpose: "Part withdrawal towards buying a house",
    amount: 245000,
    pfNumber: "MH/BAN/0043912/000/0018872",
    bankMasked: "HDFC Bank, account ending 8820",
    officeName: "EPFO Regional Office, Bandra, Mumbai",
    submittedOn: "2026-08-21",
    daysSinceSubmission: 7,

    portalStatus: "Claim Form-31 Under Process at Field Office",

    currentStage: "processing",
    tone: "on_track",
    statusLabel: "Moving normally",

    headline: "Everything is moving. There is nothing for you to do.",
    explanation:
      "Nimbus Retail signed off on your claim on 23 August, so that part is done. Your file is now with an officer at the EPFO office in Bandra, who checks your service record and works out exactly how much you can take out for a house purchase. This is the slowest step in the process. A few days of silence here is normal and does not mean anything has gone wrong.",

    action: {
      title: "Nothing. Just wait.",
      body: "This is the stage where most people panic and file again. Do not do that. A second claim goes to the back of the queue and your first one gets rejected as a duplicate.",
      steps: [
        {
          text: "Keep the phone number linked to your UAN switched on. If the officer has a question, an SMS is the only way they will reach you.",
        },
        {
          text: "Do not file the same claim again, and do not pay anyone who offers to push it through faster.",
        },
        {
          text: "Check back around 2 September. If nothing has moved by then, come back here and we will tell you what to do next.",
          meta: "5 days from now",
        },
      ],
    },

    eta: {
      headline: "Approval expected between 2 and 4 September 2026",
      detail:
        "Partial withdrawals where the bank and ID details are already verified clear this stage in 5 to 10 working days. You are on working day 5.",
      elapsedPct: 62,
    },

    stages: [
      {
        key: "submitted",
        date: "2026-08-21",
        note: "Filed online through the member portal.",
      },
      {
        key: "employer",
        date: "2026-08-23",
        note: "Nimbus Retail approved it in 2 days, faster than most employers.",
      },
      {
        key: "processing",
        date: "2026-08-23",
        note: "With the Bandra field office since 23 August. No queries raised so far.",
      },
      { key: "approved", date: null, note: "Not reached yet." },
      { key: "disbursed", date: null, note: "Not reached yet." },
    ],

    escalation: {
      eligible: false,
      note: "Raising a grievance now would not speed anything up, because your claim is inside the normal processing window. It becomes worth doing if nothing has moved by 11 September.",
      daysUntilEligible: 14,
    },
  },

  /* ------------------------------------------------------------------ B */
  {
    id: "EPF-2026-73310",
    uan: "100773451209",
    memberName: "Arjun Mehta",
    employer: "Kavach Logistics Pvt Ltd",
    employerCity: "Pune",
    formName: "Form 19 and Form 10C",
    formPlain:
      "Form 19 closes your PF account, Form 10C takes out the pension portion. They are filed together",
    purpose: "Final settlement after leaving the job",
    amount: 108750,
    pfNumber: "MH/PUN/0021884/000/0009431",
    bankMasked: "HDFC Bank, account ending 4471",
    officeName: "EPFO Regional Office, Pune",
    submittedOn: "2026-08-06",
    daysSinceSubmission: 22,

    portalStatus: "Claim Form-19 Rejected / Returned, KYC Not Approved",

    currentStage: "processing",
    tone: "needs_you",
    statusLabel: "Needs action from you",

    headline:
      "Your claim is paused because your bank account name does not match your PF record.",
    explanation:
      "Before releasing money, EPFO matches the name on your bank account against the name on your PF record. Yours do not match exactly. Your PF record says Arjun Mehta, and the account ending 4471 is in the name of Arjun Kumar Mehta. An officer flagged this on 19 August and stopped the claim there. Nothing will move until you fix it, and EPFO will not call, SMS or email you about it. That is why most people only find out weeks later.",

    action: {
      title:
        "Fix your bank details, then get your employer to approve the change.",
      body: "This is a two part fix. You update the details, then your company has to digitally approve the update. Budget about 15 minutes of your own time, plus 2 to 3 days of waiting on your employer.",
      steps: [
        {
          text: "Log in to the EPFO member portal, go to Manage, then KYC, and re-enter your bank account number and IFSC code exactly as they appear on your passbook.",
          meta: "About 10 minutes",
        },
        {
          text: "Check that the name spelling in your PF profile matches your bank and your Aadhaar-linked records. If the PF profile is the one that is wrong, ask your employer to file a joint declaration, which is a correction form the two of you sign together.",
          meta: "About 5 minutes",
        },
        {
          text: "Message HR at Kavach Logistics and ask them to approve the updated KYC. It sits in their employer portal until somebody clicks approve.",
          meta: "2 to 3 days on their side",
        },
        {
          text: "Once the KYC shows as approved by employer, file the claim again. It picks up from the verification stage, so you are not starting from zero.",
        },
      ],
      copyMessage: {
        label: "Copy a message for HR",
        text: "Hi, my PF final settlement claim (ref EPF-2026-73310, UAN 100773451209) was returned by EPFO because my bank KYC does not match. I have re-submitted my bank details on the member portal. Could you please approve the pending KYC request in the employer portal? It is blocking my claim. Thank you.",
      },
    },

    eta: {
      headline: "Roughly 10 to 14 days after you fix the bank details",
      detail:
        "Employer approval of the corrected details usually takes 2 to 3 days, and the field office then takes another 7 to 10 working days. Your claim keeps its original filing date on record.",
      elapsedPct: 100,
    },

    stages: [
      {
        key: "submitted",
        date: "2026-08-06",
        note: "Filed online through the member portal.",
      },
      {
        key: "employer",
        date: "2026-08-11",
        note: "Kavach Logistics confirmed your last working day as 31 July 2026.",
      },
      {
        key: "processing",
        date: "2026-08-19",
        note: "An officer at the Pune office returned the claim over a bank name mismatch. Stuck here since 19 August.",
      },
      {
        key: "approved",
        date: null,
        note: "Blocked until the bank details are corrected.",
      },
      {
        key: "disbursed",
        date: null,
        note: "Blocked until the bank details are corrected.",
      },
    ],

    escalation: {
      eligible: true,
      note: "A grievance is worth raising here, but only after you have fixed the bank details. Raise it if your employer has not approved the corrected details within 5 working days of you asking.",
      daysUntilEligible: 0,
    },
  },

  /* ------------------------------------------------------------------ C */
  {
    id: "EPF-2026-51907",
    uan: "100915600338",
    memberName: "Fatima Khan",
    employer: "Acme Interiors Pvt Ltd",
    employerCity: "Bengaluru",
    formName: "Form 31",
    formPlain:
      "Form 31 is a partial withdrawal. Medical treatment is one of the reasons it is allowed for",
    purpose: "Advance for medical treatment of a family member",
    amount: 75000,
    pfNumber: "KA/BNG/0038210/000/0014507",
    bankMasked: "Kotak Mahindra Bank, account ending 6109",
    officeName: "EPFO Regional Office, Bommasandra, Bengaluru",
    submittedOn: "2026-08-18",
    daysSinceSubmission: 10,

    portalStatus: "Claim Form-31 Pending for Attestation by Employer",

    currentStage: "employer",
    tone: "needs_employer",
    statusLabel: "Waiting on your employer",

    headline:
      "Your claim is waiting on your employer's signature. EPFO has not seen it yet.",
    explanation:
      "Every claim has to be digitally signed by your company before it reaches EPFO. Acme Interiors has not done that. Your claim has been sitting in their employer portal since 18 August, which is 10 days, when the usual turnaround is 3 to 7 working days. This is almost never deliberate. In most companies one authorised person holds the digital signature key, and claims pile up when that person is on leave or has changed roles.",

    action: {
      title:
        "Contact your HR team. That is the only thing that will move this.",
      body: "EPFO cannot act on this claim and cannot chase your employer for you. One message to the right person usually clears it in a day or two.",
      steps: [
        {
          text: "Ask HR who holds the company's Digital Signature Certificate. That specific person has to click approve, not HR in general.",
        },
        {
          text: "Give them your claim reference (EPF-2026-51907) and your UAN so they can find it straight away instead of scrolling a list.",
        },
        {
          text: "Say that it is a medical advance. Most companies move those to the front of the pile once they know.",
        },
        {
          text: "If nothing happens in another 4 days, come back and raise a grievance from this page. EPFO can then formally push your employer.",
          meta: "From 1 September",
        },
      ],
      copyMessage: {
        label: "Copy a message for HR",
        text: "Hi, I filed a PF advance claim for medical treatment on 18 August (ref EPF-2026-51907, UAN 100915600338). It is still pending employer attestation in the EPFO employer portal, so EPFO has not received it yet. Could whoever holds the company DSC please approve it? It is a medical advance, so it is time sensitive. Thank you.",
      },
    },

    eta: {
      headline: "3 to 5 days after your employer signs",
      detail:
        "Medical advances are prioritised at the field office and usually clear in 3 to 5 working days. The whole delay right now is on the employer side.",
      elapsedPct: 78,
    },

    stages: [
      {
        key: "submitted",
        date: "2026-08-18",
        note: "Filed online through the member portal.",
      },
      {
        key: "employer",
        date: null,
        note: "Pending with Acme Interiors for 10 days. Normal is 3 to 7 working days.",
      },
      {
        key: "processing",
        date: null,
        note: "EPFO cannot start until your employer signs.",
      },
      { key: "approved", date: null, note: "Not reached yet." },
      { key: "disbursed", date: null, note: "Not reached yet." },
    ],

    escalation: {
      eligible: false,
      note: "Give HR a few more days first. A grievance filed too early usually comes back telling you to contact your employer. From 1 September you have a strong case, because you will be past 14 days on a medical advance.",
      daysUntilEligible: 4,
    },
  },

  /* ------------------------------------------------------------------ D */
  {
    id: "EPF-2026-64158",
    uan: "100338741962",
    memberName: "Suresh Patil",
    employer: "Tricolour Foods Pvt Ltd",
    employerCity: "Nashik",
    formName: "Form 19",
    formPlain:
      "Form 19 is the form you file to close your PF account and take the full balance out",
    purpose: "Final settlement after retirement",
    amount: 412300,
    pfNumber: "MH/NSK/0011764/000/0003318",
    bankMasked: "State Bank of India, account ending 2094",
    officeName: "EPFO Regional Office, Nashik",
    submittedOn: "2026-07-24",
    daysSinceSubmission: 35,

    portalStatus: "Claim Settled, NEFT Transferred",

    currentStage: "disbursed",
    tone: "completed",
    statusLabel: "Money credited",

    headline: "Done. ₹4,12,300 was credited to your account on 11 August 2026.",
    explanation:
      "Your final settlement was approved on 8 August and the money went out by bank transfer on 11 August, to your State Bank of India account ending 2094. No tax was deducted, because you had more than 5 years of continuous service. That is the rule, and it worked in your favour. Your PF account is now closed.",

    action: {
      title: "Nothing more to do. Two things worth checking, though.",
      body: "Your claim is complete. These are housekeeping items so that nothing surprises you later.",
      steps: [
        {
          text: "Check your bank statement for a credit of ₹4,12,300 dated 11 August 2026. It shows up as a bank transfer from EPFO.",
        },
        {
          text: "Download your final PF passbook from the member portal and keep it. You will want it when you file your income tax return.",
        },
        {
          text: "If you filed Form 10C for the pension portion separately, that is a different claim with its own reference number.",
        },
      ],
    },

    eta: {
      headline: "Completed in 18 days",
      detail:
        "Comfortably faster than the 20 day service standard EPFO sets for itself on final settlements.",
      elapsedPct: 100,
    },

    stages: [
      {
        key: "submitted",
        date: "2026-07-24",
        note: "Filed online through the member portal.",
      },
      {
        key: "employer",
        date: "2026-07-29",
        note: "Tricolour Foods confirmed your retirement date.",
      },
      {
        key: "processing",
        date: "2026-08-04",
        note: "Service history and balance verified at the Nashik office.",
      },
      {
        key: "approved",
        date: "2026-08-08",
        note: "Payment order signed. No tax deducted, as you had over 5 years of service.",
      },
      {
        key: "disbursed",
        date: "2026-08-11",
        note: "₹4,12,300 sent by bank transfer to State Bank of India, account ending 2094.",
      },
    ],

    escalation: {
      eligible: false,
      note: "There is nothing to escalate, the claim is settled. If the money is not in your account, that is a bank side issue, and your branch can trace the transfer using the date and amount.",
      daysUntilEligible: 0,
    },
  },

  /* ------------------------------------------------------------------ E */
  {
    id: "EPF-2026-90233",
    uan: "100650129884",
    memberName: "Neha Iyer",
    employer: "Pixelforge Studios LLP",
    employerCity: "Hyderabad",
    formName: "Form 19 and Form 10C",
    formPlain:
      "Form 19 closes your PF account, Form 10C takes out the pension portion. They are filed together",
    purpose: "Final settlement after leaving the job",
    amount: 186400,
    pfNumber: "TG/HYD/0029017/000/0007745",
    bankMasked: "ICICI Bank, account ending 3357",
    officeName: "EPFO Regional Office, Barkatpura, Hyderabad",
    submittedOn: "2026-07-28",
    daysSinceSubmission: 31,

    portalStatus: "Claim Under Process at Field Office",

    currentStage: "processing",
    tone: "delayed",
    statusLabel: "Taking too long",

    headline:
      "Nothing is wrong with your claim. It has just been sitting in a queue for 31 days.",
    explanation:
      "Your employer signed off on 3 August and your file reached the Hyderabad field office the same day. It has been there for 25 days since. No query, objection or rejection has been raised against it, and that part matters: if something were actually wrong with your documents, you would be looking at a returned or rejected status instead. This is a backlog, not a problem with your file. The honest answer is that it will keep sitting there until somebody picks it up, and a formal grievance is what makes that happen.",

    action: {
      title: "Raise a grievance. You have waited long enough for it to work.",
      body: "EPFO's own service standard for a final settlement is 20 days. You are at 31. A grievance on EPFiGMS, which is EPFO's official complaints portal, puts your claim on a tracked list with a response deadline. That is the one lever that reliably moves a stuck file.",
      steps: [
        {
          text: "Raise a grievance on the EPFiGMS portal. Choose PF Final Settlement as the category and give your UAN as the reference.",
          meta: "About 10 minutes",
        },
        {
          text: "In the description, give the claim reference, the filing date, and the line that matters: claim pending beyond the 20 day service standard with no query raised.",
        },
        {
          text: "Write down the grievance registration number. You will usually get a first response within 7 working days.",
        },
        {
          text: "If there is still nothing after that, escalate the same grievance to the Regional PF Commissioner. The portal has a button for it.",
        },
      ],
    },

    eta: {
      headline: "7 to 15 days once a grievance is raised",
      detail:
        "Without a grievance there is no reliable estimate. Files in this state have been known to sit for months. With one, most members see movement inside two weeks.",
      elapsedPct: 100,
    },

    stages: [
      {
        key: "submitted",
        date: "2026-07-28",
        note: "Filed online through the member portal.",
      },
      {
        key: "employer",
        date: "2026-08-03",
        note: "Pixelforge Studios signed off in 6 days.",
      },
      {
        key: "processing",
        date: "2026-08-03",
        note: "With the Hyderabad office for 25 days. No query raised, no rejection.",
      },
      { key: "approved", date: null, note: "Not reached yet." },
      { key: "disbursed", date: null, note: "Not reached yet." },
    ],

    escalation: {
      eligible: true,
      note: "You are 11 days past EPFO's own 20 day service standard, with no query raised against your claim. This is exactly the situation the grievance system exists for.",
      daysUntilEligible: 0,
    },
  },
];

export const DEMO_SHORTCUTS: DemoShortcut[] = [
  {
    claimId: "EPF-2026-88421",
    label: "A claim that is moving normally",
    blurb: "Nothing needed from you, but here is why it has gone quiet.",
    tone: "on_track",
  },
  {
    claimId: "EPF-2026-73310",
    label: "A claim that needs action from you",
    blurb: "Bank KYC mismatch. Paused, and nobody told him.",
    tone: "needs_you",
  },
  {
    claimId: "EPF-2026-51907",
    label: "A claim stuck with the employer",
    blurb: "HR has not digitally signed it yet.",
    tone: "needs_employer",
  },
  {
    claimId: "EPF-2026-90233",
    label: "A claim that is stuck too long",
    blurb: "31 days, no reason given. Time to escalate.",
    tone: "delayed",
  },
  {
    claimId: "EPF-2026-64158",
    label: "A claim that is fully paid out",
    blurb: "Settled and credited. What it looks like when it is done.",
    tone: "completed",
  },
];

export function getAllClaims(): Claim[] {
  return CLAIMS;
}

export function getClaim(id: string): Claim | undefined {
  return CLAIMS.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

/**
 * Accepts a claim reference or a UAN, forgivingly. Real people paste things
 * with spaces, dashes and lowercase letters in them.
 */
export function lookupClaim(query: string): Claim | undefined {
  const raw = query.trim();
  if (!raw) return undefined;
  const normalised = raw.replace(/[\s-]/g, "").toLowerCase();
  return CLAIMS.find(
    (c) =>
      c.id.replace(/[\s-]/g, "").toLowerCase() === normalised ||
      c.uan.replace(/[\s-]/g, "") === normalised,
  );
}

export function stageState(claim: Claim, key: StageKey): StageState {
  const currentIndex = STAGE_ORDER.indexOf(claim.currentStage);
  const index = STAGE_ORDER.indexOf(key);
  const blocked =
    claim.tone === "needs_you" ||
    claim.tone === "needs_employer" ||
    claim.tone === "delayed";

  if (claim.tone === "completed") return "done";
  if (index < currentIndex) return "done";
  if (index === currentIndex) return blocked ? "blocked" : "current";
  return "upcoming";
}
