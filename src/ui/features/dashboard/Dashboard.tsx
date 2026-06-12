import { AreaChart, FilterList } from '@mui/icons-material';
import { Fab, Grid, Zoom } from '@mui/material';
import { useUserContext } from '../../../contexts/auth/UserContext';
import { useSavingContext } from '../../../contexts/saving/SavingContext';
import { useWithdrawalContext } from '../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import { useDashboardMetrics } from '../../../hooks/useDashboardMetrics';
import { useWithdrawalHistory } from '../../../hooks/useWithdrawalHistory';
import ChartCard from '../shared/ChartCard/ChartCard';
import FilterDialog from '../shared/Dialog/FilterDialog';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../shared/SectionTitle/SectionTitle';
import BalanceInfo from './components/Charts/BalanceInfo';
import SavingChart from './components/Charts/SavingChart';
import WeeklySpentChart from './components/Charts/WeeklySpentChart';
import { useResponsive } from '../../../hooks/useResponsive';

export default function Dashboard() {
  const { state: withdrawalState } = useWithdrawalContext();

  const { dialog, charts, closeDialog, openFilterDialog } =
    useWithdrawalHistory(withdrawalState.data);

  const { state: savingSate } = useSavingContext();

  const { state: userState } = useUserContext();

  const {
    currentWithdrawals,
    forecastedWithdrawals,
    previousMonthSaving,
    currentBalance,
    forecastedSaving,
    spendingSeries,
    spendingDimensions,
    savingSeries,
    savingDimensions,
    twoMontAgoSaving,
  } = useDashboardMetrics({
    withdrawals: withdrawalState.data,
    savings: savingSate.data,
    currentWithdrawalsDataset: charts.current.dataset,
    forecastWithdrawalsDataset: charts.forecast.dataset,
    salary: userState.profile?.salary,
  });

  const { isDesktop } = useResponsive();

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
        <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
          <WeeklySpentChart
            dimension={spendingDimensions}
            series={spendingSeries}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 4, xl: 4 }}>
          <BalanceInfo
            currentWithdrawals={currentWithdrawals}
            forecastedWithdrawals={forecastedWithdrawals}
            previousMonthSaving={previousMonthSaving}
            forecastedSaving={forecastedSaving}
            currentBalance={currentBalance}
            twoMontAgoSaving={twoMontAgoSaving}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
          <ChartCard>
            <SavingChart
              series={savingSeries}
              dimension={savingDimensions}
            />
          </ChartCard>
        </Grid>
      </Grid>
      <Zoom in={true}>
        <Fab
          onClick={openFilterDialog}
          color="primary"
          sx={{
            position: 'fixed',
            bottom: isDesktop ? 24 : 62,
            right: isDesktop ? 24 : 8,
          }}
        >
          <FilterList />
        </Fab>
      </Zoom>
    </>
  );
}
