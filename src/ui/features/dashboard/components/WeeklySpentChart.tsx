import { Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import type { BartChartProps } from '../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../utils/formatterUtilities';
import Colors from '../../../Theming/Colors';
import AppDimensions from '../../../Theming/Dimensions';
import { styled } from '@mui/material/styles';

const WeeklySpentChartContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: 500,
  backgroundColor: theme.palette.background.paper,
  borderRadius: AppDimensions.BorderRadius.small,
  border: `1px solid ${theme.palette.divider}`,
}));

const ChartHeader = styled(Typography)(({ theme }) => ({
  with: '100%',
  textAlign: 'center',
  color: Colors.tint900,
  fontWeight: 'bold',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function WeeklySpentChart({
  series,
  dimension,
}: BartChartProps<string>) {
  return (
    <WeeklySpentChartContainer
      direction={'column'}
      spacing={2}
    >
      <ChartHeader variant="h6">Weekly spending</ChartHeader>
      <BarChart
        series={series}
        xAxis={[
          {
            data: dimension,
            height: 28,
            tickLabelStyle: {
              fontSize: 14,
              fill: Colors.tint900,
              fontWeight: 'bold',
            },
          },
        ]}
        yAxis={[
          {
            width: 100,
            valueFormatter: (value: number) => `${toLocalMgCurrency(value)}`,
            tickLabelStyle: {
              fontSize: 14,
              fill: Colors.tint900,
            },
          },
        ]}
      />
    </WeeklySpentChartContainer>
  );
}
