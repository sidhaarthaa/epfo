import Shell from "@/components/ui/Shell";
import LoadingState from "@/components/claim/LoadingState";

/**
 * Shown by Next while the claim route is being fetched on navigation. It is a
 * real loading state for a real transition, not a simulated delay.
 */
export default function Loading() {
  return (
    <Shell className="py-9">
      <LoadingState />
    </Shell>
  );
}
