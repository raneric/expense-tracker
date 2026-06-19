import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { DialogFormProps } from '../../../../type/PropsType';
import { useCallback, useState } from 'react';
import { useUserContext } from '../../../../contexts/auth/UserContext';
import DialogHeader from './DialogHeader';

export default function PasswordConfirmationDialog({
  isOpen,
  onSubmit,
  onClose,
}: DialogFormProps<string>) {
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const { state } = useUserContext();

  const handleConfirm = useCallback(async () => {
    console.log('called');

    const validationResult = await onSubmit(password);
    setPassword('');
    if (!validationResult) {
      setHasError(true);
      setHelperText('Invalid password');
    }
  }, [password, onSubmit]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <Typography>Sensitive data! Please enter your password</Typography>
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
          helperText={helperText}
          error={hasError}
          value={password}
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth
        />
        <Stack
          spacing={2}
          direction="row"
        >
          <Button
            variant="contained"
            onClick={onClose}
            color="error"
            fullWidth
          >
            Cancel
          </Button>

          <Button
            loading={state.loading}
            onClick={() => handleConfirm()}
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
