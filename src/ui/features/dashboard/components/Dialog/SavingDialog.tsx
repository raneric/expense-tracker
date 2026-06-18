import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useCallback, useState } from 'react';
import useSavingSubmit from '../../../../../hooks/useSavingSubmit';
import type { Saving } from '../../../../../type/AppType';
import type { DialogFormProps } from '../../../../../type/PropsType';
import { formatDateForInput } from '../../../../../utils/validationUtilities';
import DialogHeader from '../../../shared/Dialog/DialogHeader';

export default function SavingDialog({
  isOpen,
  onClose,
}: Omit<DialogFormProps<Partial<Saving>>, 'initialData' | 'onSubmit'>) {
  const { createSaving, submitInProgress } = useSavingSubmit();
  const [saving, setSaving] = useState<Partial<Saving>>({
    amount: 0,
    month: new Date(),
  });

  const handleAmountChange = useCallback((value: string) => {
    const parsed = parseFloat(value);
    setSaving((prev) => ({
      ...prev,
      amount: Number.isNaN(parsed) ? 0 : parsed,
    }));
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setSaving((prev) => ({
      ...prev,
      month: new Date(value),
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const result = await createSaving(saving);
    if (result) {
      onClose();
    }
  }, [createSaving, saving, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Confirm the amount</span>
      </DialogHeader>

      <DialogContent sx={{ maxWidth: '26em', marginTop: 2 }}>
        <TextField
          label="Amount"
          type="number"
          value={saving.amount}
          onChange={(e) => {
            handleAmountChange(e.target.value);
          }}
          fullWidth
          margin="normal"
          slotProps={{
            htmlInput: {
              min: 0,
              step: 0.01,
            },
            input: {
              endAdornment: <InputAdornment position="end">Ar</InputAdornment>,
            },
          }}
        />

        <TextField
          label="Date"
          type="date"
          value={formatDateForInput(saving.month!)}
          onChange={(e) => handleDateChange(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          loading={submitInProgress}
          onClick={handleSubmit}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
