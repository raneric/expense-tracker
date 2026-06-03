import { Stack, useMediaQuery, useTheme } from '@mui/material';
import type { WithdrawalChartsProps } from '../../../../../type/PropsType';
import ChartCard from '../../../shared/ChartCard/ChartCard';
import InfoRow from '../../../shared/InfoRow/InfoRow';
import ExpenseSparkLine from './ExpenseSparkline';
import { useUserContext } from '../../../../../contexts/auth/UserContext';
import { useMemo } from 'react';
import { toLocalMgCurrency } from '../../../../../utils/formatterUtilities';
import { calculateSaving } from '../../../../../utils/computingFunction';
import Colors from '../../../../Theming/Colors';

export function WithdrawalCharts({ current, forecast }: WithdrawalChartsProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { state } = useUserContext();

  const forecastedSaving = useMemo(() => {
    return calculateSaving(state.profile?.salary, forecast.dataset);
  }, [state.profile, forecast.dataset]);

  const currentSaving = useMemo(() => {
    return calculateSaving(state.profile?.salary, current.dataset);
  }, [state.profile, current.dataset]);

  return (
    <Stack
      direction={isDesktop ? 'row' : 'column'}
      spacing={2}
      sx={{ alignSelf: 'center' }}
    >
      <ChartCard
        sx={{
          borderTop: `6px solid ${Colors.tint200}`,
        }}
      >
        <ExpenseSparkLine
          dimension={current.dimension}
          dataset={current.dataset}
          dataLabel="Withdrawals up to today"
        />
      </ChartCard>
      <ChartCard
        sx={{
          borderTop: `6px solid ${Colors.warningLight}`,
        }}
      >
        <ExpenseSparkLine
          dimension={forecast.dimension}
          dataset={forecast.dataset}
          dataLabel="Forecast"
        />
      </ChartCard>

      <ChartCard sx={{ width: '20em' }}>
        <Stack
          direction={'column'}
          spacing={1}
        >
          <InfoRow
            label="📈 Saving forecasted"
            value={`${toLocalMgCurrency(forecastedSaving)}`}
          />
          <InfoRow
            label="💲 Current"
            value={`${toLocalMgCurrency(currentSaving)}`}
          />
        </Stack>
      </ChartCard>
    </Stack>
  );
}
