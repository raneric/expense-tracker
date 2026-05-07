import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import WithdrawRepository from '../../../repositories/WithdrawRepository';
import { reasonsList } from '../../../utils/Const';
import Colors from '../../Theming/Colors';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddWithdrawForm({ isOpen, onClose }: DialogProps) {
  const [reason, setReason] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(reason);
    const repo = new WithdrawRepository();
    repo.getAll();
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value === '' || (!isNaN(Number(value)) && !isNaN(parseFloat(value)))) {
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  };

  const handleReasonsChange = (_: React.SyntheticEvent<Element>, newValue: string[]) => {
    setReason(newValue);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            backgroundColor: Colors.lightBlue900,
            color: Colors.lightBlue200,
          }}
        >
          Withdrawal info
        </DialogTitle>
        <DialogContent>
          <Box component='form' method='post' onSubmit={handleSubmit}>
            <Autocomplete
              multiple
              id='tags-standard'
              options={reasonsList}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Amount'
              type='text'
              value={amount}
              onChange={handleAmountChange}
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
                backgroundColor: Colors.lightBlue900,
                color: Colors.lightBlue200,
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
