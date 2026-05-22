import { Alert, Slide, Snackbar, Stack } from '@mui/material';
import { useSnackbarContext } from '../../../contexts/snackbar/SnackbarContext';

export default function GlobalSnackbar() {
  const { state, hide } = useSnackbarContext();

  return (
    <Stack spacing={1}>
      {state.notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open
          autoHideDuration={5000}
          onClose={() => hide(notification.id)}
          slots={{
            transition: Slide,
          }}
          slotProps={{
            transition: {
              easing: {
                enter: 'ease-out',
              },
              timeout: {
                enter: 500,
              },
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
            onClose={() => hide(notification.id)}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
}
