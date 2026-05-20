import { HistoryToggleOff } from '@mui/icons-material';

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Fade,
  InputAdornment,
  TextField,
} from '@mui/material';

import Colors from '../../Theming/Colors';

import { useState } from 'react';
import type { Withdrawal } from '../../../type/AppType';
import type { DialogFormProps } from '../../../type/PropsType';
import { initialWithdrawal } from '../../../utils/Const';
import { isNanOrNegative } from '../../../utils/validationUtilities';
import DialogHeader from './DialogHeader';

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
}: DialogFormProps<Withdrawal>) {
  const [withdrawalData, setWithdrawalData] = useState<Withdrawal>(
    initialData ?? initialWithdrawal
  );
  const [amountError, setAmountError] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(withdrawalData);
    onClose();
  };

  const handleChange = <K extends keyof Withdrawal>(
    key: K,
    value: Withdrawal[K]
  ) => {
    if (key === 'date') {
      const isForecast = (value as Date) > new Date();
      setWithdrawalData((prev) => ({
        ...prev,
        isForecast,
      }));
    }

    setWithdrawalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Withdrawal info</span>
        <Fade in={withdrawalData.isForecast}>
          <Chip
            color="secondary"
            icon={<HistoryToggleOff />}
            label="Forecast"
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
            id="reasons-autocomplete"
            options={reasonsList}
            value={withdrawalData.reasons}
            onChange={(_, newValue) => handleChange('reasons', newValue)}
            renderInput={(params) => (
              <TextField
                margin="normal"
                {...params}
                label="Reasons"
                placeholder="Select reasons"
              />
            )}
          />
          <TextField
            label="Date"
            type="date"
            value={withdrawalData.date.toISOString().split('T')[0]}
            onChange={(e) => handleChange('date', new Date(e.target.value))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={withdrawalData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="text"
            value={withdrawalData.amount}
            onChange={(e) => {
              if (isNanOrNegative(e.target.value)) {
                setAmountError(true);
                return;
              }
              setAmountError(false);
              handleChange('amount', Number(e.target.value));
            }}
            fullWidth
            margin="normal"
            error={amountError}
            helperText={amountError ? 'Please enter a valid number' : ''}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">Ar</InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: Colors.tint900,
              color: Colors.tint200,
              fontWeight: 'bold',
            }}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
