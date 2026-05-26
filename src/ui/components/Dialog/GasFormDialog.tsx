import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import type { GasEvent } from '../../../type/AppType';
import type { DialogFormProps } from '../../../type/PropsType';
import DialogHeader from './DialogHeader';
import { useState } from 'react';

type FormType = {
  date: Date;
  price: number;
};

export default function GasFormDialog({
  isOpen,
  onClose,
}: DialogFormProps<GasEvent>) {
  const [dialogData, setDialogData] = useState<FormType>({
    date: new Date(),
    price: 0,
  });

  const handleChange = <K extends keyof FormType>(
    key: K,
    value: FormType[K]
  ) => {
    setDialogData((prev) => ({
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
        <span>Gas status</span>
      </DialogHeader>
      <DialogContent>
        <Box
          component="form"
          method="post"
          onSubmit={() => {}}
        >
          <TextField
            label="End date"
            type="date"
            value={dialogData.date.toISOString().split('T')[0]}
            onChange={(e) => handleChange('date', new Date(e.target.value))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="text"
            value={dialogData.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Stack
            spacing={2}
            direction={'row'}
          >
            <Button
              variant="contained"
              onClick={() => {}}
              sx={{
                backgroundColor: 'error.light',
                color: 'error.contrastText',
                fontWeight: 'bold',
              }}
              fullWidth
            >
              Reset
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 'bold',
              }}
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
