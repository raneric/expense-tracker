import { Box, Divider, Stack, Typography } from '@mui/material';
import { BarChart, type BarSeries } from '@mui/x-charts/BarChart';
import { useResponsive } from '../../../../../hooks/useResponsive';
import type { ChartSeriesProps } from '../../../../../type/PropsType';
import Colors from '../../../../Theming/Colors';
import ChartCard from '../../../shared/ChartCard/ChartCard';

// Bars keep a constant ~20px thickness whatever the reason count; the rest of
// each band stays air (bandwidth = plotHeight·(1 − gap)/n).
const TARGET_BAR_THICKNESS = 20;
// Bar labels are centered inside the bars, so the right margin is just a
// small plot padding.
const CHART_MARGIN = { top: 10, bottom: 10, right: 10 };

export default function TopReasonsChart({
  series,
  dimension,
}: ChartSeriesProps<BarSeries, string>) {
  const { isFHD } = useResponsive();
  const height = isFHD ? 500 : 400;

  const plotHeight = height - CHART_MARGIN.top - CHART_MARGIN.bottom;
  const categoryGapRatio = Math.min(
    0.95,
    Math.max(
      0,
      1 - (TARGET_BAR_THICKNESS * Math.max(dimension.length, 1)) / plotHeight
    )
  );

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
      <Divider />
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
        <Box
          sx={{
            width: '100%',
            height,
            // Light text so the bar value labels read on the dark tint600 bars.
            '& .MuiBarChart-seriesLabels .MuiBarChart-label': {
              fill: Colors.tint50,
            },
          }}
        >
          <BarChart
            layout="horizontal"
            hideLegend
            series={series}
            borderRadius={4}
            yAxis={[
              {
                scaleType: 'band',
                data: dimension,
                width: 130,
                categoryGapRatio,
                tickLabelStyle: {
                  fontSize: 14,
                  fill: Colors.tint900,
                  fontWeight: 'bold',
                },
              },
            ]}
            // Every bar carries its value at the tip, so the value axis ticks
            // and gridlines are redundant.
            xAxis={[{ position: 'none' }]}
          />
        </Box>
      )}
    </ChartCard>
  );
}
