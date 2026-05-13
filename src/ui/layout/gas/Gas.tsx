import { CalendarMonth } from '@mui/icons-material';
import { Paper, Stack } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import type { GasEvent } from '../../../type/PropsType';
import Calendar from '../../components/calendar/Calendar';
import GasStatus from '../../components/gasStatus/GasStatus';
import { SectionTitle, Tittle } from '../../core/SectionTitle';
import CustomCardHeader from '../../core/CustomCardHeader';

export default function Gas() {
  const data: GasEvent[] = useLoaderData();

  return (
    <>
      <SectionTitle>
        <Tittle icon={<CalendarMonth />} displayText='Gas schedule' />
      </SectionTitle>
      <Stack direction='row' spacing={2}>
        <Calendar gasEvents={data} />
        <GasStatus gasEvents={data} />
        <Paper sx={{ flexGrow: 1, borderRadius: 2 }}>
          <CustomCardHeader displayText='Lorem ipsum dolor sit amet' />
        </Paper>
      </Stack>
    </>
  );
}
