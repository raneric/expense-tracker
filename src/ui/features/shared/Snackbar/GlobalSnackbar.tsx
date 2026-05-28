import { Alert, Slide, Snackbar } from '@mui/material';
import { useSnackbarContext } from '../../../../contexts/snackbar/SnackbarContext';

export default function GlobalSnackbar() {
  const { state, hide } = useSnackbarContext();

  return (
    <>
      {state.notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open
          autoHideDuration={5000}
          onClose={() => hide(notification.id)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          slots={{
            transition: Slide,
          }}
          sx={{
            mb: `${index * 60}px`,
          }}
          slotProps={{
            transition: {
              easing: {
                enter: 'ease-out',
              },
              timeout: {
                enter: 300,
              },
            },
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
    </>
  );
}
