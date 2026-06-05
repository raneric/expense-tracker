import { CalendarMonth } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { GasEventsProvider } from '../../../contexts/gasEvents/GasEventsProvider';
import { useResponsive } from '../../../hooks/useResponsive';
import { SectionTitle, Tittle } from '../shared/SectionTitle/SectionTitle';
import Calendar from './components/Calendar/Calendar';
import EditFormDialog from './components/Dialog/EditFormDialog';
import GasStatus from './components/GasDetails/GasStatus';

export default function Gas() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { isDesktop } = useResponsive();

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
        direction={isDesktop ? 'row' : 'column'}
        spacing={2}
        sx={!isDesktop ? { alignItems: 'center' } : {}}
      >
        <GasEventsProvider>
          <Calendar />
          <GasStatus />
        </GasEventsProvider>
      </Stack>
    </>
  );
}
