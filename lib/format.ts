export function formatRupees(amount: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(amount);
}

/** "2026-08-21" becomes "21 Aug 2026". */
export function formatDate(iso: string | null): string {
  if (!iso) return "Pending";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** "2026-08-21" becomes "21 Aug", for tight timeline labels. */
export function formatDateShort(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
