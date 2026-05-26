import { CalendarMonth } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import GasStatus from '../../components/GasDetails/GasStatus';
import { SectionTitle, Tittle } from '../../core/SectionTitle';
import { GasEventsProvider } from '../../../contexts/gasEvents/GasEventsProvider';

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
