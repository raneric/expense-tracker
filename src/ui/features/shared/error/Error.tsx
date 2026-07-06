import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  alpha,
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
import Colors from '../../../Theming/Colors';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        background: gradientBackground,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            Colors.tint400,
            0.12
          )} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-8%',
          left: '-3%',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            Colors.A200,
            0.1
          )} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="sm"
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Card
          sx={{
            borderRadius: 5,
            textAlign: 'center',
            background: alpha(Colors.paperBackground, 0.85),
            backdropFilter: 'blur(28px)',
            border: `1px solid ${alpha(Colors.lightBorder, 0.3)}`,
            boxShadow: `
              0 8px 32px ${alpha(Colors.onPrimary, 0.18)},
              0 2px 8px ${alpha(Colors.onPrimary, 0.08)}
            `,
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
            <Stack
              spacing={3.5}
              sx={{ alignItems: 'center' }}
            >
              {/* Icon with decorative ring */}
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 104,
                  height: 104,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${alpha(
                    Colors.errorLight,
                    0.12
                  )} 0%, ${alpha(Colors.error, 0.06)} 100%)`,
                  border: `2px solid ${alpha(Colors.error, 0.15)}`,
                }}
              >
                <ErrorOutlineRounded
                  sx={{
                    fontSize: 52,
                    color: Colors.error,
                  }}
                />
              </Box>

              {/* Status code badge */}
              {status && (
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '3rem', sm: '4rem' },
                    lineHeight: 1,
                    background: `linear-gradient(135deg, ${Colors.error} 0%, ${Colors.errorLight} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {status}
                </Typography>
              )}

              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: Colors.onPrimary,
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Typography>

              {/* Message */}
              <Typography
                variant="body1"
                sx={{
                  color: alpha(Colors.onPrimary, 0.65),
                  maxWidth: 380,
                  lineHeight: 1.7,
                }}
              >
                {message}
              </Typography>

              {/* Support alert */}
              <Alert
                severity="error"
                variant="outlined"
                sx={{
                  width: '100%',
                  borderRadius: 2.5,
                  borderColor: alpha(Colors.error, 0.25),
                  backgroundColor: alpha(Colors.error, 0.04),
                  color: Colors.errorDark,
                  '& .MuiAlert-icon': {
                    color: Colors.error,
                  },
                }}
              >
                If the issue persists, please contact support.
              </Alert>

              {/* Action buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: '100%', justifyContent: 'center', pt: 1 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<HomeRounded />}
                  onClick={() => navigate('/')}
                  sx={{
                    borderRadius: 2.5,
                    px: 3.5,
                    py: 1.25,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    background: `linear-gradient(135deg, ${Colors.tint600} 0%, ${Colors.tint800} 100%)`,
                    boxShadow: `0 4px 14px ${alpha(Colors.tint600, 0.35)}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${Colors.tint700} 0%, ${Colors.tint900} 100%)`,
                      boxShadow: `0 6px 20px ${alpha(Colors.tint600, 0.45)}`,
                    },
                  }}
                >
                  Go Home
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<RefreshRounded />}
                  onClick={() => navigate(0)}
                  sx={{
                    borderRadius: 2.5,
                    px: 3.5,
                    py: 1.25,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    borderColor: alpha(Colors.tint600, 0.4),
                    color: Colors.tint700,
                    '&:hover': {
                      borderColor: Colors.tint600,
                      backgroundColor: alpha(Colors.tint50, 0.5),
                    },
                  }}
                >
                  Retry
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Dev error details */}
        {import.meta.env.DEV && error instanceof Error && (
          <Card
            sx={{
              mt: 2.5,
              borderRadius: 4,
              background: alpha(Colors.paperBackground, 0.75),
              backdropFilter: 'blur(16px)',
              border: `1px solid ${alpha(Colors.warning, 0.3)}`,
              boxShadow: `0 4px 16px ${alpha(Colors.onPrimary, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: Colors.warningDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: 1.5,
                }}
              >
                Development Error Details
              </Typography>

              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2,
                  overflow: 'auto',
                  fontSize: 12,
                  lineHeight: 1.6,
                  borderRadius: 2,
                  background: alpha(Colors.onPrimary, 0.04),
                  border: `1px solid ${Colors.lightBorder}`,
                  color: Colors.onPrimary,
                  fontFamily: '"Fira Code", "Cascadia Code", monospace',
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
