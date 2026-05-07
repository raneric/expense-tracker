export function removeDuplicateValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function toLocalMgCurrency(amount: number) {
  const formatter = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'MGA',
  });

  return formatter.format(amount);
}
