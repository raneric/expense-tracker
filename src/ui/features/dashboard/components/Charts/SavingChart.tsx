import Box from '@mui/material/Box';
import {
  LineChart,
  lineClasses,
  type LineSeries,
} from '@mui/x-charts/LineChart';
import type { ChartSeriesProps } from '../../../../../type/PropsType';
import { useResponsive } from '../../../../../hooks/useResponsive';
import Colors from '../../../../Theming/Colors';
import {
  toLocalMgCurrency,
  toLocalMgCurrencyCompact,
} from '../../../../../utils/formatterUtilities';

export default function SavingChart({
  series,
  dimension,
}: ChartSeriesProps<LineSeries, string>) {
  const { isDesktop, isFHD } = useResponsive();
  const height = isFHD ? 500 : 400;
  return (
    <Box sx={{ width: '100%', height }}>
      <LineChart
        grid={{ horizontal: true }}
        series={series}
        xAxis={[
          {
            scaleType: 'point',
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
            width: 80,
            valueFormatter: (value: number) =>
              `${isDesktop ? toLocalMgCurrency(value) : toLocalMgCurrencyCompact(value)}`,
            tickLabelStyle: {
              fontSize: 14,
              fill: Colors.tint900,
            },
          },
        ]}
        sx={{
          [`.${lineClasses.line}, .${lineClasses.mark}`]: {
            strokeWidth: 1,
          },
          [`.${lineClasses.line}[data-series="ms"]`]: {
            strokeDasharray: '5 5',
          },
          [`.${lineClasses.mark}:not([data-highlighted="true"])`]: {
            fill: '#fff',
          },
          [`& [data-highlighted="true"]`]: {
            stroke: 'none',
          },
        }}
      />
    </Box>
  );
}
