import { Stack } from '@mui/material';
import type { DimensionalChartProps } from '../../../type/PropsType';
import ChartCard from '../../core/ChartCard';
import ExpenseSparkLine from './ExpenseSparkline';

type Props = {
  current: DimensionalChartProps<number, Date>;
  forecast: DimensionalChartProps<number, Date>;
};

export function WithdrawalCharts({ current, forecast }: Props) {
  return (
    <Stack direction='row' spacing={2}>
      <ChartCard>
        <ExpenseSparkLine
          dimension={current.dimension}
          dataset={current.dataset}
          dataLabel='Withdrawal of today'
        />
      </ChartCard>

      <ChartCard>
        <ExpenseSparkLine
          dimension={forecast.dimension}
          dataset={forecast.dataset}
          dataLabel='Forecast'
        />
      </ChartCard>
    </Stack>
  );
}
