import dayjs from 'dayjs';
import type { GasEvent, GasEventData } from '../type/PropsType';

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

export function generateGasEventData(gasEvents: GasEvent[]): GasEventData {
  const startDates = new Set<string>();
  const endDates = new Set<string>();

  let currentGasEvent: GasEvent | undefined;
  let previousGasEvent: GasEvent | undefined;

  for (const event of gasEvents) {
    startDates.add(event.startDate);

    if (event.endDate) {
      endDates.add(event.endDate);
    }

    if (event.type === 'current') {
      currentGasEvent = event;
    }

    if (event.type === 'previous') {
      previousGasEvent = event;
    }
  }

  let forecastedDate: string | undefined;

  if (currentGasEvent && previousGasEvent?.totalDays) {
    forecastedDate = dayjs(currentGasEvent.startDate)
      .add(previousGasEvent.totalDays, 'day')
      .format('YYYY-MM-DD');
  }

  return {
    startDates,
    endDates,
    forecastedDate,
  };
}

export function formatStringDate(date: string): string {
  return new Date(date).toDateString();
}
