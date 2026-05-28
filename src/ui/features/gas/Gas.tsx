import { CalendarMonth } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import GasStatus from '../../components/GasDetails/GasStatus';
import { GasEventsProvider } from '../../../contexts/gasEvents/GasEventsProvider';
import { SectionTitle, Tittle } from '../shared/SectionTitle/SectionTitle';

export default function Gas() {
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
        <GasEventsProvider>
          <Calendar />
          <GasStatus />
        </GasEventsProvider>
      </Stack>
    </>
  );
}
