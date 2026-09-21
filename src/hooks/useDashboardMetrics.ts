import { useCallback, useMemo } from 'react';
import type { UseDashboardMetricsProps } from '../type/PropsType';
import { toLocalMgCurrencyCompact } from '../utils/formatterUtilities';
import type { BarItem } from '@mui/x-charts';
import {
  calculateSaving,
  getAmountsByReason,
  getWeeklyAmounts,
} from '../utils/computingFunction';
import Colors from '../ui/Theming/Colors';
import { generateSavingSeries } from '../utils/dataGeneratorUtilities';
import { useResponsive } from './useResponsive';

const MAX_REASONS = 10;

export function useDashboardMetrics({
  withdrawals,
  savings,
  currentWithdrawalsDataset,
  forecastWithdrawalsDataset,
  salary,
}: UseDashboardMetricsProps) {
  const { isDesktop } = useResponsive();

  const previousMonthSaving = useMemo(
    () => savings.at(-1)?.amount ?? 0,
    [savings]
  );

  const twoMonthsAgoSaving = useMemo(
    () => savings.at(-2)?.amount ?? 0,
    [savings]
  );

  const forecastedSaving = useMemo(
    () => calculateSaving(salary, forecastWithdrawalsDataset),
    [salary, forecastWithdrawalsDataset]
  );

  const currentWithdrawals = useMemo(
    () => currentWithdrawalsDataset.reduce((acc, value) => acc + value, 0),
    [currentWithdrawalsDataset]
  );

  const forecastedWithdrawals = useMemo(
    () => forecastWithdrawalsDataset.reduce((acc, value) => acc + value, 0),
    [forecastWithdrawalsDataset]
  );

  const currentBalance = useMemo(
    () =>
      previousMonthSaving + calculateSaving(salary, currentWithdrawalsDataset),
    [previousMonthSaving, salary, currentWithdrawalsDataset]
  );

  const barLabelFormatter = useCallback(
    (item: BarItem) =>
      isDesktop ? toLocalMgCurrencyCompact(item.value as number) : '',
    [isDesktop]
  );

  const { spendingSeries, spendingDimensions } = useMemo(() => {
    const weeklySpendingWithForecast = getWeeklyAmounts(withdrawals);

    const weeklySpendingWithoutForecast = getWeeklyAmounts(
      withdrawals.filter((withdrawal) => !withdrawal.isForecast)
    );

    const amountsWithForecast = weeklySpendingWithForecast.map(
      (week) => week.amount ?? 0
    );

    const amountsWithoutForecast = weeklySpendingWithoutForecast.map(
      (week) => week.amount ?? 0
    );

    return {
      spendingSeries: [
        {
          data: amountsWithoutForecast,
          label: 'No forecast',
          id: 'noFc',
          color: Colors.tint300,
          barLabel: barLabelFormatter,
        },
        {
          data: amountsWithForecast,
          label: 'With forecast',
          id: 'withFc',
          barLabel: barLabelFormatter,
        },
      ],
      spendingDimensions: weeklySpendingWithForecast.map(
        (week) => week.label ?? ''
      ),
    };
  }, [withdrawals, barLabelFormatter]);

  const { series: savingSeries, dimensions: savingDimensions } = useMemo(
    () => generateSavingSeries(savings),
    [savings]
  );

  const { reasonsSeries, reasonsDimensions } = useMemo(() => {
    const amountsByReason = getAmountsByReason(
      withdrawals.filter((withdrawal) => !withdrawal.isForecast)
    );

    const topReasons = amountsByReason.slice(0, MAX_REASONS);

    return {
      reasonsDimensions: topReasons.map((reason) => reason.label),
      reasonsSeries: [
        {
          data: topReasons.map((reason) => reason.amount ?? 0),
          label: 'Spent',
          id: 'reasons',
          color: Colors.tint600,
          barLabel: barLabelFormatter,
          barLabelPlacement: 'center' as const,
          valueFormatter: (value: number | null) =>
            toLocalMgCurrencyCompact(value ?? 0),
        },
      ],
    };
  }, [withdrawals, barLabelFormatter]);

  return {
    currentWithdrawals,
    forecastedWithdrawals,
    previousMonthSaving,
    currentBalance,
    forecastedSaving,
    spendingSeries,
    spendingDimensions,
    savingSeries,
    twoMonthsAgoSaving,
    savingDimensions,
    reasonsSeries,
    reasonsDimensions,
  };
}
