import dayjs from "dayjs";
import type { GasStatusInfo } from "../type/AppType";
import type { GasEvent, GasEventData } from "../type/PropsType";

const generateRateMessage = (value: number, valueMax: number) => {
  return `${value} / ${valueMax} Days`;
};

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

    if (event.type === "current") {
      currentGasEvent = event;
    }

    if (event.type === "previous") {
      previousGasEvent = event;
    }
  }

  let forecastedDate: string | undefined;

  if (currentGasEvent && previousGasEvent?.totalDays) {
    forecastedDate = dayjs(currentGasEvent.startDate)
      .add(previousGasEvent.totalDays, "day")
      .format("YYYY-MM-DD");
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
    if (event.type === "previous") {
      previous = event;
    }
    if (event.type === "current") {
      current = event;
    }
  }

  if (previous && current) {
    const inUseUpToNow = dayjs().diff(dayjs(current?.startDate), "days");
    const isOverForecast =
      previous?.totalDays !== undefined && inUseUpToNow > previous?.totalDays;

    const inUseDays =
      previous?.totalDays && inUseUpToNow > previous?.totalDays
        ? previous?.totalDays
        : inUseUpToNow;

    const forecast = dayjs(current?.startDate)
      .add(previous?.totalDays ?? 0, "day")
      .format("YYYY-MM-DD");

    const gaugeText = previous?.totalDays
      ? generateRateMessage(inUseUpToNow, previous?.totalDays)
      : "";

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
  return dayjs().diff(dayjs(value), "days");
}
