export function removeDuplicateValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function toLocalMgCurrency(amount: number) {
  const formatter = Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return `${formatter.format(amount)} Ar`;
}

export function isNanOrNegative(value: string): boolean {
  return isNaN(Number(value)) || Number(value) < 0;
}
