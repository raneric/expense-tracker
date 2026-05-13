import { Box, CardContent, Chip, Paper, Stack } from '@mui/material';
import { Gauge } from '@mui/x-charts';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import type { GasEvent, GasEventsDataProps } from '../../../type/PropsType';
import CustomCardHeader from '../../core/CustomCardHeader';
import InfoRow from '../../core/InfoRow';
import Colors from '../../Theming/Colors';
import AppDimensions from '../../Theming/Dimensions';
import { formatStringDate } from '../../../utils/utilities';

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
    <Paper elevation={1} sx={{ borderRadius: 2, minWidth: '22em' }}>
      <CustomCardHeader displayText='Current Gas Bottle Status' />
      <CardContent>
        <Stack
          sx={{
            alignItems: 'center',
          }}
          spacing={1}
        >
          <InfoRow
            label='📆 In use since'
            value={
              eventData.current?.startDate === undefined
                ? ''
                : formatStringDate(eventData.current?.startDate)
            }
          />
          <InfoRow label='❌ Run out forecast on' value={formatStringDate(eventData.forecast)} />
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
