import {
  AccountBalance,
  HistoryToggleOff,
  Savings,
  SyncAlt,
} from '@mui/icons-material';
import { Divider, Stack, Typography } from '@mui/material';
import { toLocalMgCurrency } from '../../../../utils/formatterUtilities';
import ChartCard from '../../shared/ChartCard/ChartCard';
import MainMetrics from './MainMetrics';
import SecondaryMetrics from './SecondaryMetrics';
import type { BalanceInfoProps } from '../../../../type/AppType';
import { calculateTrendRate } from '../../../../utils/computingFunction';

export default function BalanceInfo({
  currentWithdrawals,
  forecastedWithdrawals,
  forecastedSaving,
  previousMonthSaving,
  currentBalance,
  twoMontAgoSaving,
}: BalanceInfoProps) {
  return (
    <ChartCard sx={{ width: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        Financial Overview
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <MainMetrics
        value={toLocalMgCurrency(currentBalance)}
        icon={
          <AccountBalance
            sx={{
              fontSize: 42,
            }}
          />
        }
        label="Current Balance"
      />

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{
          mt: 3,
        }}
      >
        <SecondaryMetrics
          icon={<Savings color="success" />}
          label="Previous month saving"
          value={toLocalMgCurrency(previousMonthSaving)}
          color="success.main"
          trendingUp={true}
          rate={calculateTrendRate(twoMontAgoSaving, previousMonthSaving)}
        />
        <SecondaryMetrics
          icon={<Savings color="success" />}
          label="Forecasted saving"
          value={toLocalMgCurrency(forecastedSaving)}
          color="success.main"
          trendingUp={forecastedSaving > previousMonthSaving}
          rate={calculateTrendRate(previousMonthSaving, forecastedSaving)}
        />
      </Stack>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{
          mt: 3,
        }}
      >
        <SecondaryMetrics
          icon={<SyncAlt color="success" />}
          label="Withdrawals up to today"
          value={toLocalMgCurrency(currentWithdrawals)}
          color="success.main"
          trendingUp={true}
          rate={'N/A'}
        />
        <SecondaryMetrics
          icon={<HistoryToggleOff color="success" />}
          label="Forecasted withdrawals"
          value={toLocalMgCurrency(forecastedWithdrawals)}
          color="success.main"
          trendingUp={false}
          rate={'N/A'}
        />
      </Stack>
    </ChartCard>
  );
}
