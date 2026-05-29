import { CalendarMonth } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Calendar from './components/Calendar/Calendar';
import GasStatus from './components/GasDetails/GasStatus';
import { GasEventsProvider } from '../../../contexts/gasEvents/GasEventsProvider';
import { SectionTitle, Tittle } from '../shared/SectionTitle/SectionTitle';
import EditFormDialog from './components/Dialog/EditFormDialog';
import { useState } from 'react';

export default function Gas() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <>
      <EditFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
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
          <Calendar
            onDayCellClick={(date: string) => {
              console.log(date);
              setIsEditDialogOpen(true);
            }}
          />
          <GasStatus />
        </GasEventsProvider>
      </Stack>
    </>
  );
}
