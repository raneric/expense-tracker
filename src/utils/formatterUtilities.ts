/**
 * Formats a numeric amount as Malagasy Ariary (Ar) using
 * French locale number formatting.
 *
 * Examples:
 * - 12500 → "12 500 Ar"
 * - 12500.5 → "12 500,5 Ar"
 *
 * @param amount Amount in Ariary.
 * @returns Formatted currency string.
 */
export function toLocalMgCurrency(amount: number) {
  const formatter = Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return `${formatter.format(amount)} Ar`;
}

/**
 * Formats a numeric amount as a compact Malagasy Ariary value.
 *
 * Large values are abbreviated for display:
 * - 1,500 → "1,5 k Ar"
 * - 2,500,000 → "2,5 M Ar"
 *
 * Useful for charts, summaries, and dashboard widgets where
 * space is limited.
 *
 * @param amount Amount in Ariary.
 * @returns Compact formatted currency string.
 */
export function toLocalMgCurrencyCompact(amount: number): string {
  const formatter = Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  if (amount >= 1_000_000) {
    return `${formatter.format(amount / 1_000_000)} M Ar`;
  }

  if (amount >= 1_000) {
    return `${formatter.format(amount / 1_000)} k Ar`;
  }

  return `${formatter.format(amount)} Ar`;
}

/**
 * Converts a date string into a human-readable date format.
 *
 * Example:
 * - "2025-03-15" → "Sat Mar 15 2025"
 *
 * @param date Date string to format.
 * @returns Readable date string.
 */
export function formatStringDate(date: string): string {
  return new Date(date).toDateString();
}

/**
 * Formats a Date or date string into the ISO date format
 * expected by HTML date inputs (YYYY-MM-DD).
 *
 * Returns an empty string when no value is provided.
 *
 * Examples:
 * - Date("2025-03-15") → "2025-03-15"
 * - "2025-03-15T10:00:00Z" → "2025-03-15"
 *
 * @param value Date value to format.
 * @returns ISO date string (YYYY-MM-DD) or empty string.
 */
export function formatDateInput(value?: string | Date): string {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);

  return date.toISOString().split('T')[0];
}
