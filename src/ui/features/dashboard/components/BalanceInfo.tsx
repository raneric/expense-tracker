import {
  AccountBalance,
  HistoryToggleOff,
  Savings,
  SyncAlt,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import useTemporaryVisibility from '../../../../hooks/useTemporaryVisibility';
import type { BalanceInfoProps } from '../../../../type/AppType';
import { calculateTrendRate } from '../../../../utils/computingFunction';
import { HIDDEN_AMOUNT } from '../../../../utils/Const';
import { toLocalMgCurrency } from '../../../../utils/formatterUtilities';
import ChartCard from '../../shared/ChartCard/ChartCard';
import MainMetrics from './MainMetrics';
import SecondaryMetrics from './SecondaryMetrics';
import { useCallback } from 'react';

export default function BalanceInfo({
  currentWithdrawals,
  forecastedWithdrawals,
  forecastedSaving,
  previousMonthSaving,
  currentBalance,
  twoMontAgoSaving,
}: BalanceInfoProps) {
  const { visible: shouldDisplay, toggleVisibility } = useTemporaryVisibility();

  const displayAmount = useCallback(
    (amount: number) =>
      shouldDisplay ? toLocalMgCurrency(amount) : HIDDEN_AMOUNT,
    [shouldDisplay]
  );

  return (
    <ChartCard sx={{ width: '100%' }}>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Financial Overview
        </Typography>
        <IconButton onClick={toggleVisibility}>
          {shouldDisplay ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      <MainMetrics
        value={displayAmount(currentBalance)}
        icon={
          <AccountBalance
            sx={{
              fontSize: 42,
            }}
          />
        }
        label="Current Balance"
      />
      <Grid
        sx={{ mt: 3 }}
        container
        spacing={2}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <SecondaryMetrics
            icon={<Savings color="success" />}
            label="Previous month saving"
            value={displayAmount(previousMonthSaving)}
            color="success.main"
            trendingUp={true}
            rate={calculateTrendRate(twoMontAgoSaving, previousMonthSaving)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SecondaryMetrics
            icon={<Savings color="success" />}
            label="Forecasted saving"
            value={displayAmount(forecastedSaving)}
            color="success.main"
            trendingUp={forecastedSaving > previousMonthSaving}
            rate={calculateTrendRate(previousMonthSaving, forecastedSaving)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SecondaryMetrics
            icon={<SyncAlt color="success" />}
            label="Withdrawals up to today"
            value={displayAmount(currentWithdrawals)}
            color="success.main"
            trendingUp={true}
            rate={'N/A'}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SecondaryMetrics
            icon={<HistoryToggleOff color="success" />}
            label="Forecasted withdrawals"
            value={displayAmount(forecastedWithdrawals)}
            color="success.main"
            trendingUp={false}
            rate={'N/A'}
          />
        </Grid>
      </Grid>
    </ChartCard>
  );
}
