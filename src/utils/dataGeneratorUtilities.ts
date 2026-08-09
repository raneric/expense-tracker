import dayjs from 'dayjs';
import type {
  DialogHookState,
  GasEvent,
  GasStatusInfo,
  Saving,
} from '../type/AppType';
import type { GasEventData } from '../type/PropsType';
import type { DateFilter } from '../type/StateContextType';
import { toLocalMgCurrency } from './formatterUtilities';

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
 * Returns the current month's date filter range.
 *
 * The range runs from the 1st of the current month
 * through the last day of the current month.
 *
 * Examples:
 * - If today is Feb 10 → Feb 1 to Feb 28
 * - If today is Dec 15 → Dec 1 to Dec 31
 *
 * @returns Current month date filter range.
 */
export function getDefaultDateFilterRange(): DateFilter {
  const today = dayjs();

  const startDate = today.startOf('month');
  const endDate = today.endOf('month');

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
 * Returns the date filter range for the current week
 * (Monday through Sunday).
 *
 * @returns Current week date filter range.
 */
export function getCurrentWeekFilterRange(): DateFilter {
  const today = dayjs();
  const startOfWeek = today.startOf('week').add(1, 'day'); // Monday
  const endOfWeek = today.endOf('week').add(1, 'day'); // Sunday

  return {
    startDate: startOfWeek.startOf('day').toDate(),
    endDate: endOfWeek.endOf('day').toDate(),
    type: 'current-week',
  };
}

/**
 * Returns the date filter range for the previous week
 * (Monday through Sunday of last week).
 *
 * @returns Previous week date filter range.
 */
export function getPreviousWeekFilterRange(): DateFilter {
  const today = dayjs();
  const startOfLastWeek = today
    .subtract(1, 'week')
    .startOf('week')
    .add(1, 'day');
  const endOfLastWeek = today.subtract(1, 'week').endOf('week').add(1, 'day');

  return {
    startDate: startOfLastWeek.startOf('day').toDate(),
    endDate: endOfLastWeek.endOf('day').toDate(),
    type: 'previous-week',
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
  const dimensions = saving.map((value) =>
    dayjs(value.month).format('MMM YYYY')
  );
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

export function getConfirmationMessage(dialog: DialogHookState) {
  let confirmationMessage = '';

  switch (dialog.type) {
    case 'delete':
      confirmationMessage = `Delete withdrawal of ${toLocalMgCurrency(
        dialog.withdrawal.amount
      )} on ${dialog.withdrawal.date.toDateString()}?`;
      break;
    case 'forecast':
      confirmationMessage = `Are you sure to validate ${toLocalMgCurrency(
        dialog.withdrawal.amount
      )} on ${dialog.withdrawal.date.toDateString()}?`;
      break;
    default:
      break;
  }
  return confirmationMessage;
}
