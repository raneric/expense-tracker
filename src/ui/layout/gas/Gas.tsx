import { CalendarMonth } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import type { GasEvent } from '../../../type/PropsType';
import Calendar from '../../components/Calendar/Calendar';
import GasStatus from '../../components/GasDetails/GasStatus';
import { SectionTitle, Tittle } from '../../core/SectionTitle';

export default function Gas() {
  const data: GasEvent[] = useLoaderData();

  return (
    <>
      <SectionTitle>
        <Tittle
          icon={<CalendarMonth />}
          displayText="Gas schedule"
        />
      </SectionTitle>
      <Stack
        direction="row"
        spacing={2}
      >
        <Calendar gasEvents={data} />
        <GasStatus gasEvents={data} />
      </Stack>
    </>
  );
}
