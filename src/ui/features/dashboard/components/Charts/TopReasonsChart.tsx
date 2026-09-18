import { Box, Stack, Typography } from '@mui/material';
import { BarChart, type BarSeries } from '@mui/x-charts/BarChart';
import { useResponsive } from '../../../../../hooks/useResponsive';
import type { ChartSeriesProps } from '../../../../../type/PropsType';
import Colors from '../../../../Theming/Colors';
import ChartCard from '../../../shared/ChartCard/ChartCard';
import {
  toLocalMgCurrency,
  toLocalMgCurrencyCompact,
} from '../../../../../utils/formatterUtilities';

export default function TopReasonsChart({
  series,
  dimension,
}: ChartSeriesProps<BarSeries, string>) {
  const { isDesktop, isFHD } = useResponsive();
  const height = isFHD ? 500 : 400;

  return (
    <ChartCard sx={{ width: '100%', height: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        Top spending reasons
      </Typography>
      {dimension.length === 0 ? (
        <Stack
          sx={{
            height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography color="text.secondary">
            No spending reasons recorded this month
          </Typography>
        </Stack>
      ) : (
        <Box sx={{ width: '100%', height }}>
          <BarChart
            layout="horizontal"
            hideLegend
            series={series}
            grid={{ vertical: true }}
            yAxis={[
              {
                scaleType: 'band',
                data: dimension,
                reverse: true,
                width: 130,
                tickLabelStyle: {
                  fontSize: 14,
                  fill: Colors.tint900,
                  fontWeight: 'bold',
                },
              },
            ]}
            xAxis={[
              {
                valueFormatter: (value: number) =>
                  `${isDesktop ? toLocalMgCurrency(value) : toLocalMgCurrencyCompact(value)}`,
                tickLabelStyle: {
                  fontSize: 14,
                  fill: Colors.tint900,
                },
              },
            ]}
          />
        </Box>
      )}
    </ChartCard>
  );
}
