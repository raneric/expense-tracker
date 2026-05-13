import { Box, CardContent, CardHeader, Chip, Paper, Stack } from '@mui/material';
import { Gauge } from '@mui/x-charts';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import type { GasEvent, GasEventsDataProps } from '../../../type/PropsType';
import InfoRow from '../../core/InfoRow';
import Colors from '../../Theming/Colors';
import AppDimensions from '../../Theming/Dimensions';

export default function GasStatus({ gasEvents }: GasEventsDataProps) {
  const eventData = useMemo<{
    previous: GasEvent | null;
    current: GasEvent | null;
    forecast: string;
  }>(() => {
    let previous: GasEvent | null = null;
    let current: GasEvent | null = null;

    for (const event of gasEvents) {
      if (event.type === 'previous') {
        previous = event;
      }
      if (event.type === 'current') {
        current = event;
      }
    }

    const forecast = dayjs(current?.startDate)
      .add(previous?.totalDays ?? 0, 'day')
      .format('YYYY-MM-DD');

    return {
      current,
      previous,
      forecast,
    };
  }, [gasEvents]);

  const inUseDays = dayjs().diff(dayjs(eventData.current?.startDate), 'days');

  return (
    <Paper elevation={1} sx={{ borderRadius: 3, minWidth: '21em' }}>
      <CardHeader
        sx={{
          textAlign: 'center',
          backgroundColor: 'primary.dark',
          color: Colors.tint50,
          py: 1,
          borderRadius: '0.6em 0.6em 0 0',
        }}
        title='Current Gas Bottle Status'
      />
      <CardContent>
        <Stack
          sx={{
            alignItems: 'center',
          }}
          spacing={1}
        >
          <InfoRow
            label='📆 In use since'
            value={eventData.current?.startDate === undefined ? '' : eventData.current?.startDate}
          />
          <InfoRow label='❌ Run out forecast on' value={eventData.forecast} />
          <Box
            sx={{
              width: '12rem',
              height: '12rem',
              backgroundColor: Colors.paperBackground,
              borderRadius: AppDimensions.BorderRadius.medium,
            }}
          >
            <Gauge
              value={inUseDays}
              startAngle={-110}
              endAngle={110}
              valueMax={eventData.previous?.totalDays}
              sx={{
                ['& .MuiGauge-valueText']: {
                  fontWeight: 'bold',
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax} Days`}
            />
          </Box>
          <Chip
            color='info'
            variant='outlined'
            label={`Previous gas lasted ${eventData.previous?.totalDays} days`}
          />
        </Stack>
      </CardContent>
    </Paper>
  );
}
