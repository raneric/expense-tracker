import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { useUserContext } from '../../../../../contexts/auth/UserContext';
import { useResponsive } from '../../../../../hooks/useResponsive';
import type { WithdrawalChartsProps } from '../../../../../type/PropsType';
import { calculateSaving } from '../../../../../utils/computingFunction';
import { toLocalMgCurrency } from '../../../../../utils/formatterUtilities';
import Colors from '../../../../Theming/Colors';
import ChartCard from '../../../shared/ChartCard/ChartCard';
import InfoRow from '../../../shared/InfoRow/InfoRow';
import ExpenseSparkLine from './ExpenseSparkline';

export function WithdrawalCharts({ current, forecast }: WithdrawalChartsProps) {
  const { isDesktop } = useResponsive();
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
