import { CalendarMonth } from '@mui/icons-material';
import { CardContent, CardHeader, Paper, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';
import { SectionTitle, Tittle } from '../../core/SectionTitle';

export default function Gas() {
  const data = useLoaderData();
  return (
    <>
      <SectionTitle>
        <Tittle icon={<CalendarMonth />} displayText='Gas schedule' />
      </SectionTitle>
      <Stack direction='row' spacing={2}>
        <Calendar forecastDate={data.forecast} />
        <Paper elevation={3} sx={{ borderRadius: 3, minWidth: '40em' }}>
          <CardHeader title='Previous purchase' />
          <CardContent>
            <Typography variant='body2'>
              This is a simple card to display gas information.
            </Typography>
          </CardContent>
        </Paper>
      </Stack>
    </>
  );
}
