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
