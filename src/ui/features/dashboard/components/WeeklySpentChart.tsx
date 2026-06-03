import { Stack, Typography } from '@mui/material';
import { BarChart, type BarSeries } from '@mui/x-charts/BarChart';
import type { ChartSeriesProps } from '../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../utils/formatterUtilities';
import Colors from '../../../Theming/Colors';
import AppDimensions from '../../../Theming/Dimensions';
import { styled } from '@mui/material/styles';

const WeeklySpentChartContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: AppDimensions.BorderRadius.small,
  border: `1px solid ${theme.palette.divider}`,
}));

const ChartHeader = styled(Typography)(({ theme }) => ({
  with: '100%',
  textAlign: 'center',
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

export default function WeeklySpentChart({
  series,
  dimension,
}: ChartSeriesProps<BarSeries, string>) {
  return (
    <WeeklySpentChartContainer
      direction={'column'}
      spacing={2}
      sx={{ width: '100%', height: '100%' }}
    >
      <ChartHeader variant="h6">Weekly spending</ChartHeader>
      <BarChart
        series={series}
        grid={{ horizontal: true }}
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
