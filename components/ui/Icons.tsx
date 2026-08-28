/** Line icons, 16px grid, 1.5 stroke. Kept in one place so they stay consistent. */

type P = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none" as const,
});

export function ArrowRight({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M3 8h10m0 0-3.6-3.6M13 8l-3.6 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeft({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M13 8H3m0 0 3.6-3.6M3 8l3.6 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="m3.4 8.4 3 3L12.6 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bang({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M8 3.6v4.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.6" r="1.05" fill="currentColor" />
    </svg>
  );
}

export function Chevron({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="m4.5 6.5 3.5 3.5 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Copy({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="5.4"
        y="5.4"
        width="7.6"
        height="7.6"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M10.2 3H4.8A1.8 1.8 0 0 0 3 4.8v5.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Clock({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="8" r="5.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 5.2V8l2 1.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Flag({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4.2 13.4V3.2h7.6L9.9 6l1.9 2.8H4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Doc({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 3.6h5.2L12 6.4v6a1.4 1.4 0 0 1-1.4 1.4H4a1.4 1.4 0 0 1-1.4-1.4V5a1.4 1.4 0 0 1 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M5.4 9h5M5.4 11.2h3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Search({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m10.4 10.4 2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Decorative crosshair, used as a corner marker on panels. */
export function Crosshair({ className, size = 14 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M8 2.5v11M2.5 8h11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
