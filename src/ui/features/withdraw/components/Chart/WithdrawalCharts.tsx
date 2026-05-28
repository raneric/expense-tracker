import { Stack, useMediaQuery, useTheme } from '@mui/material';
import ChartCard from '../../../shared/ChartCard/ChartCard';
import type { WithdrawalChartsProps } from '../../../../../type/PropsType';
import ExpenseSparkLine from './ExpenseSparkline';

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
