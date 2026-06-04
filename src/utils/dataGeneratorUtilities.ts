import dayjs from 'dayjs';
import type { GasEvent, GasStatusInfo, Saving } from '../type/AppType';
import type { GasEventData } from '../type/PropsType';
import type { DateFilter } from '../type/StateContextType';

const generateRateMessage = (value: number, valueMax: number) => {
  return `${value} / ${valueMax} Days`;
};

export function generateGasEventData(gasEvents: GasEvent[]): GasEventData {
  const startDates = new Set<string>();

  let currentGasEvent: GasEvent | undefined;
  let previousGasEvent: GasEvent | undefined;

  for (const event of gasEvents) {
    startDates.add(dayjs(event.startDate).format('YYYY-MM-DD'));

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
    forecastedDate,
  };
}

export function generateGasStatusInfo(
  gasEvents: GasEvent[]
): GasStatusInfo | null {
  let previous: GasEvent | null = null;
  let current: GasEvent | null = null;

  for (const event of gasEvents) {
    if (event.type === 'previous') {
      previous = event;
    }
    if (event.type === 'current') {
      current = event;
    }
  }

  if (previous && current) {
    const inUseUpToNow = dayjs().diff(dayjs(current?.startDate), 'days');
    const isOverForecast =
      previous?.totalDays !== undefined && inUseUpToNow > previous?.totalDays;

    const inUseDays =
      previous?.totalDays && inUseUpToNow > previous?.totalDays
        ? previous?.totalDays
        : inUseUpToNow;

    const forecast = dayjs(current?.startDate)
      .add(previous?.totalDays ?? 0, 'day')
      .format('YYYY-MM-DD');

    const gaugeText = previous?.totalDays
      ? generateRateMessage(inUseUpToNow, previous?.totalDays)
      : '';

    return {
      current: current!,
      previous: previous!,
      forecast,
      inUseDays,
      isOverForecast,
      gaugeText,
    };
  } else {
    return null;
  }
}

export function calculateInUseDays(value: string) {
  return dayjs().diff(dayjs(value), 'days');
}

export function getDefaultDateFilterRange(): DateFilter {
  const today = dayjs();

  const isAfterOrOn28th = today.date() >= 28;

  const startDate = isAfterOrOn28th
    ? today.date(28)
    : today.subtract(1, 'month').date(28);

  const endDate = isAfterOrOn28th
    ? today.add(1, 'month').date(27)
    : today.date(27);

  return {
    startDate: startDate.startOf('day').toDate(),
    endDate: endDate.endOf('day').toDate(),
    type: 'current',
  };
}

export function getPreviousDateFilterRange(): DateFilter {
  const currentRange = getDefaultDateFilterRange();

  return {
    startDate: dayjs(currentRange.startDate)
      .subtract(1, 'month')
      .startOf('day')
      .toDate(),
    endDate: dayjs(currentRange.endDate)
      .subtract(1, 'month')
      .endOf('day')
      .toDate(),
    type: 'previous',
  };
}

export function generateSavingSeries(saving: Saving[]) {
  const dimensions = saving.map((value) => dayjs(value.month).format('MMMM'));
  const seriesData = saving.map((value) => value.amount);

  const series = [
    {
      data: seriesData,
      label: 'Monthly saving',
      id: 'ms',
      showMark: true,
    },
  ];
  return { series, dimensions };
}
