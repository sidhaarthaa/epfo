import type { ReactNode } from "react";

/**
 * The page container. Full width with responsive gutters, capped only far
 * enough out that it still fills a normal laptop or desktop display. Line
 * length is controlled per block with `max-w-[NNch]`, not by squeezing the
 * whole page into a narrow column.
 */
export default function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
