import { Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import type { BartChartProps } from '../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../utils/formatterUtilities';
import Colors from '../../../Theming/Colors';
import AppDimensions from '../../../Theming/Dimensions';

export default function WeeklySpentChart({
  series,
  dimension,
}: BartChartProps<string>) {
  return (
    <Stack
      sx={{
        maxWidth: '60%',
        height: 500,
        backgroundColor: 'background.paper',
        borderRadius: AppDimensions.BorderRadius.small,
      }}
      direction={'column'}
      spacing={2}
    >
      <Typography
        variant="h6"
        sx={{
          with: '100%',
          textAlign: 'center',
          color: Colors.tint900,
          fontWeight: 'bold',
          borderBottom: `1px solid ${Colors.tint50}`,
        }}
      >
        Weekly spending
      </Typography>
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
    </Stack>
  );
}
