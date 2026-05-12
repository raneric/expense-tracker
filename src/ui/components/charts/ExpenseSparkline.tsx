import { Box, Stack, Typography } from '@mui/material';
import {
  chartsAxisHighlightClasses,
  lineClasses,
  SparkLineChart,
  type NumberValue,
  type SparkLineChartProps,
} from '@mui/x-charts';
import { useState } from 'react';
import type { ExpenseSparkLineProps } from '../../../type/PropsType';
import { toLocalMgCurrency } from '../../../utils/utilities';
import Colors from '../../Theming/Colors';

export default function ExpenseSparkLine({
  dataLabel,
  dataset,
  dimension,
}: ExpenseSparkLineProps<Date>) {
  const [weekIndex, setWeekIndex] = useState<null | number>(null);

  const total: number = dataset.reduce((acc: number, value: number) => acc + value);
  const settings: SparkLineChartProps = {
    data: dataset,
    baseline: 'min',
    margin: { bottom: 0, top: 5, left: 4, right: 0 },
    xAxis: { id: 'days', data: dimension },
    yAxis: {
      domainLimit: (_: NumberValue, maxValue: NumberValue) => ({
        min: -maxValue / 6,
        max: maxValue,
      }),
    },
    sx: {
      [`& .${lineClasses.area}`]: { opacity: 0.2 },
      [`& .${lineClasses.line}`]: { strokeWidth: 3 },
      [`& .${chartsAxisHighlightClasses.root}`]: {
        stroke: 'rgb(86, 255, 193)',
        strokeDasharray: 'none',
        strokeWidth: 2,
      },
    },
    slotProps: {
      lineHighlight: { r: 4 },
    },
    clipAreaOffset: { top: 2, bottom: 2 },
    axisHighlight: { x: 'line' },
  };

  return (
    <Box
      role='button'
      aria-label='Showing withdrawals amount'
      tabIndex={0}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '21em',
      }}
    >
      <Stack direction='column' sx={{ width: 300 }}>
        <Typography
          sx={{
            color: 'rgb(117, 117, 117)',
            fontWeight: 500,
            fontSize: '0.9rem',
            pt: 1,
          }}
        >
          {weekIndex === null ? dataLabel : dimension[weekIndex].toDateString()}
        </Typography>
        <Stack
          direction='row'
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: 2,
            borderColor: Colors.A700,
          }}
        >
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 500, minWidth: 150 }}>
            {weekIndex !== null ? toLocalMgCurrency(dataset[weekIndex]) : toLocalMgCurrency(total)}
          </Typography>

          <SparkLineChart
            height={40}
            width={200}
            area
            showHighlight
            color={Colors.A700}
            onHighlightedAxisChange={(axisItems) => {
              setWeekIndex(axisItems[0]?.dataIndex ?? null);
            }}
            highlightedAxis={weekIndex === null ? [] : [{ axisId: 'days', dataIndex: weekIndex }]}
            {...settings}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
