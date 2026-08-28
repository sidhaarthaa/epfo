import type { ReactNode } from "react";

/**
 * Small tinted rounded square holding a line icon. Used on option cards and
 * section headers.
 */
export default function IconTile({
  children,
  tint = "bg-accent-50 text-accent-600",
  size = "md",
}: {
  children: ReactNode;
  tint?: string;
  size?: "sm" | "md";
}) {
  const box =
    size === "sm" ? "h-7 w-7 rounded-[9px]" : "h-9 w-9 rounded-tile";
  return (
    <span className={`grid shrink-0 place-items-center ${box} ${tint}`}>
      {children}
    </span>
  );
}
