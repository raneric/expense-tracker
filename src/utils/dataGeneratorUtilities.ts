import dayjs from 'dayjs';
import type { GasEvent, GasStatusInfo, Saving } from '../type/AppType';
import type { GasEventData } from '../type/PropsType';
import type { DateFilter } from '../type/StateContextType';

/**
 * Generates a display string showing the number of days used
 * against the maximum forecasted days.
 *
 * Example: "12 / 30 Days"
 */
const generateRateMessage = (value: number, valueMax: number) => {
  return `${value} / ${valueMax} Days`;
};

/**
 * Extracts gas event metadata used for calendar highlighting
 * and forecasting.
 *
 * - Collects all gas event start dates.
 * - Finds the current and previous gas events.
 * - Forecasts the expected end date of the current gas event
 *   using the duration of the previous gas event.
 *
 * @param gasEvents List of gas events.
 * @returns Start dates set and forecasted replacement date.
 */
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

/**
 * Generates status information for the current gas bottle usage.
 *
 * Uses the previous gas event duration as a forecast baseline
 * and calculates:
 * - Days used so far
 * - Forecasted replacement date
 * - Whether usage has exceeded the forecast
 * - Gauge display text
 *
 * @param gasEvents List containing current and previous gas events.
 * @returns Gas status information or null if required events are missing.
 */
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

/**
 * Calculates how many days have passed since the provided date.
 *
 * @param value Date string representing the start date.
 * @returns Number of days in use.
 */
export function calculateInUseDays(value: string) {
  return dayjs().diff(dayjs(value), 'days');
}

/**
 * Returns the current gas tracking period.
 *
 * The billing/usage cycle runs from the 28th of one month
 * through the 27th of the next month.
 *
 * Examples:
 * - If today is Feb 10 → Jan 28 to Feb 27
 * - If today is Feb 28 → Feb 28 to Mar 27
 *
 * @returns Current date filter range.
 */
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

/**
 * Returns the date filter range immediately preceding
 * the current gas tracking period.
 *
 * @returns Previous date filter range.
 */
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

/**
 * Converts saving records into chart-ready data.
 *
 * Creates:
 * - Month names for the chart axis (dimensions)
 * - Saving amounts for the chart series
 *
 * @param saving Monthly saving records.
 * @returns Chart dimensions and series configuration.
 */
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
