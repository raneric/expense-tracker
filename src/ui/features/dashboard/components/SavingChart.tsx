import Box from '@mui/material/Box';
import {
  LineChart,
  lineClasses,
  type LineSeries,
} from '@mui/x-charts/LineChart';
import type { ChartSeriesProps } from '../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../utils/formatterUtilities';
import Colors from '../../../Theming/Colors';

export default function SavingChart({
  series,
  dimension,
}: ChartSeriesProps<LineSeries, string>) {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
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
            valueFormatter: (value: number) => `${toLocalMgCurrency(value)}`,
            min: 0,
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
          [`.${lineClasses.line}[data-series="svs"]`]: {
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
