import dayjs from 'dayjs';
import type { WeeklyAmount, Withdrawal } from '../type/AppType';
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

export function getWeeklyAmounts(withdrawals: Withdrawal[]): WeeklyAmount[] {
  const weeks = new Map<string, WeeklyAmount>();

  withdrawals.forEach((withdrawal) => {
    const date = dayjs(withdrawal.date);

    const startOfWeek = date.startOf('isoWeek');

    const endOfWeek = date.endOf('isoWeek');

    const key = startOfWeek.format('YYYY-MM-DD');

    if (!weeks.has(key)) {
      weeks.set(key, {
        label: `${startOfWeek.format('DD')}-${endOfWeek.format('DD')}`,
        amount: 0,
      });
    }

    weeks.get(key)!.amount += withdrawal.amount;
  });

  return Array.from(weeks.entries())
    .sort(([a], [b]) => dayjs(a).valueOf() - dayjs(b).valueOf())
    .map(([, value]) => value);
}
