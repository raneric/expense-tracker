import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { DialogFormProps } from '../../../../../type/PropsType';
import type { LoginCredentials } from '../../../../../type/AppType';
import DialogHeader from '../../../shared/Dialog/DialogHeader';

export default function PasswordConfirmationDialog({
  isOpen,
  onClose,
  initialData,
}: DialogFormProps<LoginCredentials>) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <Typography>Confirm password for {initialData.email}</Typography>
      </DialogHeader>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="standard"
          onChange={() => {}}
          fullWidth
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
            Cancel
          </Button>

          <Button
            loading={false}
            onClick={() => {}}
            variant="contained"
            disabled={false}
            fullWidth
          >
            Show
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
