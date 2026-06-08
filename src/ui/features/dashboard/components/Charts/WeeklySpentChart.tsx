import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, type BarSeries } from '@mui/x-charts/BarChart';
import AppDimensions from '../../../../Theming/Dimensions';
import { useResponsive } from '../../../../../hooks/useResponsive';
import type { ChartSeriesProps } from '../../../../../type/PropsType';
import Colors from '../../../../Theming/Colors';
import {
  toLocalMgCurrency,
  toLocalMgCurrencyCompact,
} from '../../../../../utils/formatterUtilities';

const WeeklySpentChartContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  minHeight: theme.breakpoints.up('md') ? '50vh' : '60vh',
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
  const { isDesktop } = useResponsive();
  return (
    <WeeklySpentChartContainer
      direction={'column'}
      spacing={2}
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
            width: 60,
            valueFormatter: (value: number) =>
              `${isDesktop ? toLocalMgCurrency(value) : toLocalMgCurrencyCompact(value)}`,
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
