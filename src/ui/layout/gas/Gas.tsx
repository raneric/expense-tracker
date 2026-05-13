import { CalendarMonth } from '@mui/icons-material';
import { CardContent, CardHeader, Paper, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { GasEvent } from '../../../type/PropsType';
import Calendar from '../../components/calendar/Calendar';
import InfoRow from '../../core/InfoRow';
import { SectionTitle, Tittle } from '../../core/SectionTitle';
import Colors from '../../Theming/Colors';

export default function Gas() {
  const data: GasEvent[] = useLoaderData();

  const eventData = useMemo<{
    previous: GasEvent | null;
    current: GasEvent | null;
    forecast: string;
  }>(() => {
    let previous: GasEvent | null = null;
    let current: GasEvent | null = null;

    for (const event of data) {
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
  }, [data]);

  return (
    <>
      <SectionTitle>
        <Tittle icon={<CalendarMonth />} displayText='Gas schedule' />
      </SectionTitle>
      <Stack direction='row' spacing={2}>
        <Calendar gasEvents={data} />
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
            <Stack spacing={1}>
              <InfoRow
                label='📆 In use since'
                value={
                  eventData.current?.startDate === undefined ? '' : eventData.current?.startDate
                }
              />
              <InfoRow label='❌ Run out forecast on' value={eventData.forecast} />
            </Stack>
          </CardContent>
        </Paper>
      </Stack>
    </>
  );
}
