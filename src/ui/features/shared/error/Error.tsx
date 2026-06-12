import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import HomeRounded from '@mui/icons-material/HomeRounded';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { gradientBackground } from '../../../../utils/Const';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let status: number | undefined;
  let title = 'Unexpected Error';
  let message = 'Something went wrong while loading this page.';

  if (isRouteErrorResponse(error)) {
    status = error.status;

    switch (error.status) {
      case 404:
        title = 'Page Not Found';
        message =
          'The page you requested does not exist or may have been moved.';
        break;

      case 403:
        title = 'Access Denied';
        message = 'You do not have permission to access this resource.';
        break;

      case 500:
        title = 'Server Error';
        message = 'An internal server error occurred. Please try again later.';
        break;

      default:
        message =
          typeof error.data === 'string'
            ? error.data
            : `${error.status} ${error.statusText}`;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        background: gradientBackground,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 6,
            textAlign: 'center',
            background: 'rgba(255,255,255,0.80)',
            backdropFilter: 'blur(24px)',

            border: '1px solid rgba(255,255,255,0.2)',

            boxShadow: `
              0 10px 40px rgba(0,0,0,0.15),
              0 2px 8px rgba(0,0,0,0.08)
            `,
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Stack
              spacing={3}
              sx={{ alignItems: 'center' }}
            >
              <ErrorOutlineRounded
                color="error"
                sx={{ fontSize: 72 }}
              />

              {status && (
                <Typography
                  variant="h4"
                  color="error"
                  sx={{ fontWeight: 700 }}
                >
                  {status}
                </Typography>
              )}

              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                {title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {message}
              </Typography>

              <Alert
                severity="error"
                variant="outlined"
                sx={{ width: '100%' }}
              >
                If the issue persists, please contact support.
              </Alert>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: '100%', justifyContent: 'center' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<HomeRounded />}
                  onClick={() => navigate('/')}
                >
                  Go Home
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RefreshRounded />}
                  onClick={() => navigate(0)}
                >
                  Retry
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {import.meta.env.DEV && error instanceof Error && (
          <Card
            sx={{
              mt: 2,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Development Error Details
              </Typography>

              <Box
                component="pre"
                sx={{
                  m: 0,
                  overflow: 'auto',
                  fontSize: 12,
                }}
              >
                {error.stack}
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}
