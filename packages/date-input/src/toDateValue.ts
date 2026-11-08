/** Formats a date as `YYYY-MM-DD` in local time, the format used by date inputs */
export function toDateValue(date: Date | string | undefined) {
  if (date === undefined || typeof date === "string") return date;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
