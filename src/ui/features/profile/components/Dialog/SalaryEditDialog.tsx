import {
  Box,
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import DialogHeader from '../../../shared/Dialog/DialogHeader';
import type { DialogProps } from '../../../../../type/PropsType';

export default function SalaryEditDialog({ isOpen, onClose }: DialogProps) {
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
            value={0}
            onChange={() => {}}
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
              onClick={() => {}}
              color="error"
              fullWidth
            >
              Reset
            </Button>

            <Button
              variant="contained"
              onClick={() => {}}
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
