export default function Logo({ size = 26 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[7px] bg-accent-600 transition-transform duration-300 group-hover:scale-105"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Two cleared checkpoints and one still open. */}
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M3.4 10h4.2M12.4 10h4.2"
          stroke="white"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="3.1" fill="white" />
        <circle cx="3" cy="10" r="1.6" fill="white" fillOpacity="0.45" />
        <circle
          cx="17"
          cy="10"
          r="1.7"
          stroke="white"
          strokeOpacity="0.45"
          strokeWidth="1.3"
        />
      </svg>
    </span>
  );
}
