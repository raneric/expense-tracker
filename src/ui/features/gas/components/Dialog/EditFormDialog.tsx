import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import { formatDateForInput } from '../../../../../utils/validationUtilities';
import DialogHeader from '../../../shared/Dialog/DialogHeader';
import type { DialogProps } from '../../../../../type/PropsType';

export default function EditFormDialog({ isOpen, onClose }: DialogProps) {
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
            label="Start date"
            type="date"
            value={formatDateForInput(new Date())}
            onChange={() => {}}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End date"
            type="date"
            value={formatDateForInput(new Date())}
            onChange={() => {}}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price"
            type="number"
            onChange={() => {}}
            fullWidth
            margin="normal"
            slotProps={{
              htmlInput: {
                min: 0,
                step: 0.01,
              },
            }}
          />
          <TextField
            label="Total days"
            type="number"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            value={0}
            onChange={() => {}}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            type="text"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            onChange={() => {}}
            fullWidth
            margin="normal"
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
