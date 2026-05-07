import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { useState } from 'react';
import WithdrawTable from '../../components/Table/WithdrawTable';
import AddWithdrawForm from '../../components/forms/AddWithdrawForm';
export default function WithdrawHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleCLose = () => setIsOpen(false);

  return (
    <Box sx={{ position: 'relative', minHeight: '100%', p: 2 }}>
      <WithdrawTable />
      <AddWithdrawForm isOpen={isOpen} onClose={handleCLose} />
      <Fab
        color='secondary'
        aria-label='add withdraw'
        onClick={handleOpen}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
