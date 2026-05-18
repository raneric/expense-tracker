import { Dialog, DialogContent, TextField } from '@mui/material';
import type { FilterDialogProps } from '../../../type/PropsType';
import DialogHeader from './DialogHeader';

export default function FilterDialog({
  isOpen,
  onClose,
  onStartDateChange,
  onEndDateChange,
}: FilterDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span> Select date range</span>
      </DialogHeader>
      <DialogContent sx={{ maxWidth: '20em' }}>
        <TextField
          label="Start Date"
          type="date"
          value={new Date().toISOString().split('T')[0]}
          onChange={onStartDateChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          type="date"
          value={new Date().toISOString().split('T')[0]}
          onChange={onEndDateChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
    </Dialog>
  );
}
