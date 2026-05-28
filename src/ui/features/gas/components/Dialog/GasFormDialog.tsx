import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import type { GasFormDialogData } from '../../../../../type/AppType';
import type { GasEventDialogProps } from '../../../../../type/PropsType';
import DialogHeader from '../../../shared/Dialog/DialogHeader';

const INITIAL_FORM: GasFormDialogData = {
  date: new Date(),
  price: 0,
};

function formatDateForInput(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

function isFutureDate(date: Date): boolean {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  return selected > today;
}

export default function GasFormDialog({
  isOpen,
  onClose,
  onSubmit,
}: GasEventDialogProps) {
  const [formData, setFormData] = useState<GasFormDialogData>(INITIAL_FORM);

  const errors = useMemo(() => {
    return {
      date: isFutureDate(formData.date) ? "Can't be greater than today" : '',

      price: formData.price < 0 ? "Can't be a negative value" : '',
    };
  }, [formData]);

  const hasErrors = Boolean(errors.date || errors.price);

  const handleDateChange = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(value),
    }));
  }, []);

  const handlePriceChange = useCallback((value: string) => {
    const parsed = parseFloat(value);

    setFormData((prev) => ({
      ...prev,
      price: Number.isNaN(parsed) ? 0 : parsed,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM);
  }, []);

  const handleSubmit = useCallback(() => {
    if (hasErrors) return;

    onSubmit(formData);
  }, [formData, hasErrors, onSubmit]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Gas status</span>
      </DialogHeader>

      <DialogContent>
        <Box>
          <TextField
            label="End date"
            type="date"
            error={Boolean(errors.date)}
            helperText={errors.date}
            value={formatDateForInput(formData.date)}
            onChange={(e) => handleDateChange(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Amount"
            type="number"
            error={Boolean(errors.price)}
            helperText={errors.price}
            value={formData.price}
            onChange={(e) => handlePriceChange(e.target.value)}
            fullWidth
            margin="normal"
            slotProps={{
              htmlInput: {
                min: 0,
                step: 0.01,
              },
            }}
          />

          <Stack
            spacing={2}
            direction="row"
          >
            <Button
              variant="contained"
              onClick={handleReset}
              color="error"
              fullWidth
            >
              Reset
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={hasErrors}
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
