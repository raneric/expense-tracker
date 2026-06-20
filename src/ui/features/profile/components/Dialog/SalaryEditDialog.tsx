import {
  Box,
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useCallback, useState } from 'react';
import type { DialogFormProps } from '../../../../../type/PropsType';
import DialogHeader from '../../../shared/Dialog/DialogHeader';

export default function SalaryEditDialog({
  isOpen,
  onClose,
  onSubmit,
}: DialogFormProps<number>) {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = useCallback((value: string) => {
    const parsed = parseFloat(value);

    setAmount(Number.isNaN(parsed) ? 0 : parsed);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await onSubmit(amount);
    setIsLoading(false);
  }, [onSubmit, setIsLoading, amount]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Edit Salary</span>
      </DialogHeader>

      <DialogContent>
        <Box>
          <TextField
            label="Amount"
            type="number"
            error={false}
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            fullWidth
            margin="normal"
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

          <Stack
            spacing={2}
            direction="row"
          >
            <Button
              variant="contained"
              onClick={() => setAmount(0)}
              color="error"
              fullWidth
            >
              Reset
            </Button>

            <Button
              loading={isLoading}
              variant="contained"
              onClick={() => handleSubmit()}
              disabled={false}
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
