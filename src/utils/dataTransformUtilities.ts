import dayjs, { Dayjs } from 'dayjs';
import type { GasEvent, GasStatusInfo } from '../type/AppType';
import type { GasEventData } from '../type/PropsType';
import type { DateFilter } from '../type/StateContextType';

const generateRateMessage = (value: number, valueMax: number) => {
  return `${value} / ${valueMax} Days`;
};

export function generateGasEventData(gasEvents: GasEvent[]): GasEventData {
  const startDates = new Set<string>();
  const endDates = new Set<Dayjs>();

  let currentGasEvent: GasEvent | undefined;
  let previousGasEvent: GasEvent | undefined;

  for (const event of gasEvents) {
    startDates.add(dayjs(event.startDate).format('YYYY-MM-DD'));

    if (event.endDate) {
      endDates.add(dayjs(event.endDate));
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

export function checkInUseDays(value: string) {
  return dayjs().diff(dayjs(value), 'days');
}

export function getDefaultDateFilterRange(): DateFilter {
  const currentMonth27 = dayjs().date(27);
  const previousMonth27 = dayjs().subtract(1, 'month').date(27);
  return {
    startDate: previousMonth27.toDate(),
    endDate: currentMonth27.toDate(),
  };
}
