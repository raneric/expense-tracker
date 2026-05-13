export function toLocalMgCurrency(amount: number) {
  const formatter = Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return `${formatter.format(amount)} Ar`;
}

export function formatStringDate(date: string): string {
  return new Date(date).toDateString();
}
