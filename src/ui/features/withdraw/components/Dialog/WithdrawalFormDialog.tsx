import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Fade,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

import { useCallback, useMemo, useState } from 'react';
import type { Withdrawal } from '../../../../../type/AppType';
import type { WithdrawalDialogFormProps } from '../../../../../type/PropsType';
import { initialWithdrawal } from '../../../../../utils/Const';
import DialogHeader from '../../../shared/Dialog/DialogHeader';
import {
  formatDateForInput,
  isFutureDate,
} from '../../../../../utils/validationUtilities';

const INITIAL_WITHDRAWAL: Withdrawal = initialWithdrawal;

/**
 * A form for adding or editing withdrawal information.
 * @param props - The properties for the AddWithdrawForm component.
 * @returns A React component that renders a form for adding or editing withdrawal information.
 */
export default function WithdrawalFormDialog({
  isOpen,
  initialData,
  reasonsList,
  onClose,
  onSubmit,
  submitInProgress,
}: WithdrawalDialogFormProps) {
  const [formData, setFormData] = useState<Withdrawal>(
    initialData ?? initialWithdrawal
  );

  const errors = useMemo(() => {
    return {
      reasons:
        formData.reasons.length === 0 ? 'At least one reason is required' : '',

      amount: formData.amount < 0 ? 'Amount must be greater or equal to 0' : '',
    };
  }, [formData]);

  const hasErrors = Boolean(errors.reasons || errors.amount);

  const handleChange = useCallback(
    <K extends keyof Withdrawal>(key: K, value: Withdrawal[K]) => {
      setFormData((prev) => {
        const updated = {
          ...prev,
          [key]: value,
        };

        if (key === 'date') {
          updated.isForecast = isFutureDate(value as Date);
        }

        return updated;
      });
    },
    []
  );

  const handleAmountChange = useCallback(
    (value: string) => {
      const parsed = parseFloat(value);

      handleChange('amount', Number.isNaN(parsed) ? 0 : parsed);
    },
    [handleChange]
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_WITHDRAWAL);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (hasErrors) return;

      const result = await onSubmit(formData);

      if (result) {
        resetForm();
      }
    },
    [formData, hasErrors, onSubmit, resetForm]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Withdrawal info</span>
        <Fade in={formData.isForecast}>
          <Chip
            color="secondary"
            label="🕑 Forecast"
          />
        </Fade>
      </DialogHeader>

      <DialogContent>
        <Box
          component="form"
          method="post"
          onSubmit={handleSubmit}
        >
          <Autocomplete
            multiple
            freeSolo
            options={reasonsList}
            value={formData.reasons}
            onChange={(_, newValue) => handleChange('reasons', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Reasons"
                placeholder="Select reasons"
                error={Boolean(errors.reasons)}
                helperText={errors.reasons}
              />
            )}
          />

          <TextField
            label="Date"
            type="date"
            value={formatDateForInput(formData.date)}
            onChange={(e) => handleChange('date', new Date(e.target.value))}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Location / Source"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            fullWidth
            margin="normal"
            error={Boolean(errors.amount)}
            helperText={errors.amount}
            slotProps={{
              htmlInput: {
                min: 0,
                step: 0.01,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">Ar</InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            value={formData.comments}
            label="Description"
            margin="normal"
            onChange={(e) => handleChange('comments', e.target.value)}
            multiline
            rows={4}
          />

          <Stack
            spacing={2}
            direction="row"
          >
            <Button
              variant="contained"
              onClick={resetForm}
              color="error"
              fullWidth
            >
              Reset
            </Button>

            <Button
              loading={submitInProgress}
              variant="contained"
              type="submit"
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
