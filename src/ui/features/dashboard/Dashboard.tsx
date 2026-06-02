import { AreaChart, FilterList } from '@mui/icons-material';
import { Box, Fab, Grid } from '@mui/material';
import type { BarItem } from '@mui/x-charts/BarChart';
import { useMemo, useState } from 'react';
import { useWithdrawalContext } from '../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import { getWeeklyAmounts } from '../../../utils/computingFunction';
import { toLocalMgCurrencyCompact } from '../../../utils/formatterUtilities';
import Colors from '../../Theming/Colors';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../shared/SectionTitle/SectionTitle';
import WeeklySpentChart from './components/WeeklySpentChart';
import FilterDialog from '../shared/Dialog/FilterDialog';

export default function Dashboard() {
  const { state } = useWithdrawalContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { series, dimension } = useMemo(() => {
    const withdrawals = state.data;
    const weeklySpendingWithForecast = getWeeklyAmounts(withdrawals);
    const weeklySpendingWithoutForecast = getWeeklyAmounts(
      withdrawals.filter((withdrawal) => !withdrawal.isForecast)
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
      <FilterDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
      />
      <SectionTitle>
        <Tittle
          icon={<AreaChart />}
          displayText="Dashboard"
        />
        <TittleHelperInfo displayText="Display charts related to withdrawals" />
      </SectionTitle>
      <Grid
        container
        spacing={2}
      >
        <Grid size={8}>
          <WeeklySpentChart
            dimension={dimension}
            series={series}
          />
        </Grid>
        <Grid size={4}>
          <Box
            sx={{
              backgroundColor: Colors.tint50,
              width: '100%',
              height: '100%',
            }}
          />
        </Grid>
      </Grid>
      <Fab
        onClick={() => {
          setIsDialogOpen(true);
        }}
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <FilterList />
      </Fab>
    </>
  );
}
