import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import type { FeedbackDialogProps } from '../../../../type/PropsType';

export default function ConfirmationDialog({
  isOpen,
  onClose,
  message,
  onConfirm,
  onCancel,
  isConfirmationInProgress,
}: FeedbackDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          loading={isConfirmationInProgress}
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
