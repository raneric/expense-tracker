import { CalendarMonth } from '@mui/icons-material';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Calendar from './components/Calendar/Calendar';
import GasStatus from './components/GasDetails/GasStatus';
import { GasEventsProvider } from '../../../contexts/gasEvents/GasEventsProvider';
import { SectionTitle, Tittle } from '../shared/SectionTitle/SectionTitle';
import EditFormDialog from './components/Dialog/EditFormDialog';
import { useState } from 'react';

export default function Gas() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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
        sx={{ alignItems: 'center' }}
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
