import { Stack, useMediaQuery, useTheme } from '@mui/material';
import ExpenseSparkLine from './ExpenseSparkline';
import type { WithdrawalChartsProps } from '../../../type/PropsType';
import ChartCard from '../../features/shared/ChartCard/ChartCard';

export function WithdrawalCharts({ current, forecast }: WithdrawalChartsProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Stack
      direction={isDesktop ? 'row' : 'column'}
      spacing={2}
    >
      <ChartCard>
        <ExpenseSparkLine
          dimension={current.dimension}
          dataset={current.dataset}
          dataLabel="Withdrawal of today"
        />
      </ChartCard>

      <ChartCard>
        <ExpenseSparkLine
          dimension={forecast.dimension}
          dataset={forecast.dataset}
          dataLabel="Forecast"
        />
      </ChartCard>
    </Stack>
  );
}
