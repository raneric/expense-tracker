import { AreaChart } from '@mui/icons-material';
import { useMemo } from 'react';
import { useWithdrawalContext } from '../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import { getWeeklyAmounts } from '../../../utils/computingFunction';
import { toLocalMgCurrencyCompact } from '../../../utils/formatterUtilities';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../shared/SectionTitle/SectionTitle';
import WeeklySpentChart from './components/WeeklySpentChart';
import type { BarItem } from '@mui/x-charts/BarChart';

export default function Dashboard() {
  const { state } = useWithdrawalContext();

  const { series, dimension } = useMemo(() => {
    const data = state.data;
    const weeklySpendingWithForecast = getWeeklyAmounts(data);
    const weeklySpendingWithoutForecast = getWeeklyAmounts(
      data.filter((v) => !v.isForecast)
    );

    const amountsWithForecast = weeklySpendingWithForecast.map(
      (w) => w.amount ?? 0
    );
    const amountsNoForecast = weeklySpendingWithoutForecast
      ? weeklySpendingWithoutForecast.map((w) => w.amount ?? 0)
      : weeklySpendingWithForecast.map(() => 0);

    const series = [
      {
        data: amountsNoForecast,
        label: 'No forecast',
        id: 'noFc',
        barLabel: (item: BarItem) =>
          `${toLocalMgCurrencyCompact(item.value as number)}`,
      },
      {
        data: amountsWithForecast,
        label: 'With forecast',
        id: 'withFc',
        barLabel: (item: BarItem) =>
          `${toLocalMgCurrencyCompact(item.value as number)}`,
      },
    ];

    const dimension = weeklySpendingWithForecast.map((w) => w.label ?? '');

    return { series, dimension };
  }, [state.data]);

  return (
    <>
      <SectionTitle>
        <Tittle
          icon={<AreaChart />}
          displayText="Dashboard"
        />
        <TittleHelperInfo displayText="Display charts related to withdrawals" />
      </SectionTitle>
      <WeeklySpentChart
        dimension={dimension}
        series={series}
      />
    </>
  );
}
