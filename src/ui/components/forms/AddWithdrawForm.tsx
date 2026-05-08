import { HistoryToggleOff } from '@mui/icons-material';

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  InputAdornment,
  TextField,
} from '@mui/material';

import Colors from '../../Theming/Colors';

import type { Withdrawal } from '../../../type/AppType';
import type { DialogFormProps } from '../../../type/PropsType';
import { reasonsList } from '../../../utils/Const';

/**
 * A form for adding or editing withdrawal information.
 * @param props - The properties for the AddWithdrawForm component.
 * @returns A React component that renders a form for adding or editing withdrawal information.
 */
export default function AddWithdrawForm({
  isOpen,
  formData,
  onClose,
  onInputDataChange,
}: DialogFormProps<Withdrawal>) {
  const amountError = isNaN(formData.amount);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement, Element>,
    input: string,
  ) => {
    if (input === 'date') {
      const date = new Date(e.target.value);
      const isForecast = date > new Date();
      onInputDataChange({ ...formData, date, isForecast });
    } else {
      onInputDataChange({ ...formData, [input]: e.target.value });
    }
  };

  const handleReasonsChange = (_: React.SyntheticEvent<Element>, newValue: string[]) => {
    onInputDataChange({ ...formData, reasons: newValue });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            backgroundColor: Colors.tint900,
            color: Colors.tint200,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Withdrawal info</span>
          <Fade in={formData.isForecast}>
            <Chip color='secondary' icon={<HistoryToggleOff />} label='Forecast' />
          </Fade>
        </DialogTitle>
        <DialogContent>
          <Box component='form' method='post' onSubmit={handleSubmit}>
            <Autocomplete
              multiple
              id='tags-standard'
              options={reasonsList}
              value={formData.reasons}
              onChange={handleReasonsChange}
              renderInput={(params) => (
                <TextField
                  margin='normal'
                  {...params}
                  label='Reasons'
                  placeholder='Select reasons'
                />
              )}
            />
            <TextField
              label='Date'
              type='date'
              value={formData.date.toISOString().split('T')[0]}
              onChange={(e) => handleChange(e, 'date')}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Location'
              value={formData.location}
              onChange={(e) => handleChange(e, 'location')}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Amount'
              type='text'
              value={formData.amount}
              onChange={(e) => handleChange(e, 'amount')}
              fullWidth
              margin='normal'
              error={amountError}
              helperText={amountError ? 'Please enter a valid number' : ''}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position='end'>Ar</InputAdornment>,
                },
              }}
            />
            <Button
              variant='contained'
              type='submit'
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
    </>
  );
}
