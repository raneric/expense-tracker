import { Dialog, DialogContent, TextField } from '@mui/material';
import { useWithdrawalContext } from '../../../../../contexts/dataRetrieval/WithdrawalContext';
import type { DialogProps } from '../../../../../type/PropsType';
import DialogHeader from '../../../shared/Dialog/DialogHeader';
import { formatDateInput } from '../../../../../utils/formatterUtilities';

export default function FilterDialog({ isOpen, onClose }: DialogProps) {
  const { filterBy, state } = useWithdrawalContext();

  const onStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    filterBy({ ...state.filter, startDate: newStartDate });
  };

  const onEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    filterBy({ ...state.filter, endDate: newEndDate });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Select date range</span>
      </DialogHeader>

      <DialogContent sx={{ maxWidth: '20em' }}>
        <TextField
          label="Start Date"
          type="date"
          value={formatDateInput(state.filter?.startDate)}
          onChange={onStartDateChange}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="End Date"
          type="date"
          value={formatDateInput(state.filter?.endDate)}
          onChange={onEndDateChange}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
