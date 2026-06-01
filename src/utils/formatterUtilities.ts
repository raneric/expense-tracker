export function toLocalMgCurrency(amount: number) {
  const formatter = Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return `${formatter.format(amount)} Ar`;
}

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

export function formatStringDate(date: string): string {
  return new Date(date).toDateString();
}

export function formatDateInput(value?: string | Date): string {
  if (!value) return '';

  const date = value instanceof Date ? value : new Date(value);

  return date.toISOString().split('T')[0];
}
