import { AreaChart, FilterList } from '@mui/icons-material';
import { CardContent, Fab, Grid, Stack } from '@mui/material';
import type { BarItem } from '@mui/x-charts/BarChart';
import { useMemo } from 'react';
import { useSavingContext } from '../../../contexts/saving/SavingContext';
import { useWithdrawalContext } from '../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import { useResponsive } from '../../../hooks/useResponsive';
import { useWithdrawalHistory } from '../../../hooks/useWithdrawalHistory';
import { getWeeklyAmounts } from '../../../utils/computingFunction';
import { generateSavingSeries } from '../../../utils/dataGeneratorUtilities';
import { toLocalMgCurrencyCompact } from '../../../utils/formatterUtilities';
import Colors from '../../Theming/Colors';
import ChartCard from '../shared/ChartCard/ChartCard';
import FilterDialog from '../shared/Dialog/FilterDialog';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../shared/SectionTitle/SectionTitle';
import ExpenseSparkLine from '../withdraw/components/Chart/ExpenseSparkline';
import ExpensePieChart from './components/ExpensePieChart';
import SavingChart from './components/SavingChart';
import WeeklySpentChart from './components/WeeklySpentChart';

export default function Dashboard() {
  const { state } = useWithdrawalContext();
  const { isDesktop } = useResponsive();

  const { dialog, charts, closeDialog, openFilterDialog } =
    useWithdrawalHistory(state.data);

  const { state: savingSate } = useSavingContext();

  const { series: savingSeries, dimensions: savingDimensions } = useMemo(
    () => generateSavingSeries(savingSate.data),
    [savingSate.data]
  );

  const { spendingSeries, spendingDimensions } = useMemo(() => {
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

    const spendingSeries = [
      {
        data: amountsNoForecast,
        label: 'No forecast',
        id: 'noFc',
        barLabel: (item: BarItem) =>
          `${isDesktop ? toLocalMgCurrencyCompact(item.value as number) : ''}`,
        color: Colors.tint300,
      },
      {
        data: amountsWithForecast,
        label: 'With forecast',
        id: 'withFc',
        barLabel: (item: BarItem) =>
          `${isDesktop ? toLocalMgCurrencyCompact(item.value as number) : ''}`,
      },
    ];

    const spendingDimensions = weeklySpendingWithForecast.map(
      (w) => w.label ?? ''
    );

    return { spendingSeries, spendingDimensions };
  }, [state.data, isDesktop]);

  return (
    <>
      <FilterDialog
        isOpen={dialog.type === 'filter'}
        onClose={closeDialog}
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
        spacing={1}
      >
        <Grid size={{ xs: 12, md: 12, lg: 12, xl: 7 }}>
          <WeeklySpentChart
            dimension={spendingDimensions}
            series={spendingSeries}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12, xl: 5 }}>
          <Stack
            direction={'column'}
            spacing={2}
          >
            <Stack
              spacing={2}
              direction={isDesktop ? 'row' : 'column'}
            >
              <Stack
                direction={'column'}
                spacing={2}
              >
                <ChartCard
                  sx={{
                    borderTop: `6px solid ${Colors.tint200}`,
                  }}
                >
                  <ExpenseSparkLine
                    dimension={charts.current.dimension}
                    dataset={charts.current.dataset}
                    dataLabel="Withdrawals up to today"
                  />
                </ChartCard>
                <ChartCard
                  sx={{
                    borderTop: `6px solid ${Colors.warningLight}`,
                  }}
                >
                  <ExpenseSparkLine
                    dimension={charts.forecast.dimension}
                    dataset={charts.forecast.dataset}
                    dataLabel="Forecast"
                  />
                </ChartCard>
              </Stack>
              <ChartCard sx={{ width: { xl: '100%' } }}>
                <CardContent>
                  <ExpensePieChart />
                </CardContent>
              </ChartCard>
            </Stack>
            <ChartCard>
              <SavingChart
                series={savingSeries}
                dimension={savingDimensions}
              />
            </ChartCard>
          </Stack>
        </Grid>
      </Grid>
      <Fab
        onClick={openFilterDialog}
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
