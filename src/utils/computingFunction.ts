import dayjs from 'dayjs';
import type { PeriodicAmount, Withdrawal } from '../type/AppType';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

export const calculateSaving = (
  salary: number | undefined,
  dataset: number[]
): number => {
  const total =
    dataset.length > 0 ? dataset.reduce((acc, value) => acc + value, 0) : 0;
  return salary && total ? salary - total : 0;
};

export function getWeeklyAmounts(withdrawals: Withdrawal[]): PeriodicAmount[] {
  const weeks = new Map<string, PeriodicAmount>();

  withdrawals.forEach((withdrawal) => {
    const date = dayjs(withdrawal.date);

    const startOfWeek = date.startOf('isoWeek');

    const endOfWeek = date.endOf('isoWeek');

    const key = startOfWeek.format('YYYY-MM-DD');

    if (!weeks.has(key)) {
      weeks.set(key, {
        label: `${endOfWeek.format('MMMM')} ${startOfWeek.format('DD')} to ${endOfWeek.format('DD')}`,
        amount: 0,
      });
    }

    weeks.get(key)!.amount += withdrawal.amount;
  });

  return Array.from(weeks.entries())
    .sort(([a], [b]) => dayjs(a).valueOf() - dayjs(b).valueOf())
    .map(([, value]) => value);
}

export function calculateTrendRate(previous: number, current: number): string {
  if (previous === 0) {
    if (current === 0) return '0.00%';
    return '+100.00%';
  }

  const trend = ((current - previous) / previous) * 100;

  return `${trend >= 0 ? '+' : ''}${trend.toFixed(2)}%`;
}
