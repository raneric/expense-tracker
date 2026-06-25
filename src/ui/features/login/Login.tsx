import {
  EmailOutlined,
  LockOutlined,
  LoginTwoTone,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LogoImage from '../../../assets/logo_v2_xs.png';
import { useUserContext } from '../../../contexts/auth/UserContext';
import { AppRoutes } from '../../../router/routes';
import type { LoginCredentials } from '../../../type/AppType';
import { EMAIL_REGEX, validateInput } from '../../../utils/validationUtilities';
import Colors from '../../Theming/Colors';
import { Logo } from '../shared/Logo/Logo';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(3),

  background: `
    radial-gradient(
      ellipse 80% 60% at 50% -20%,
      rgba(3,169,244,0.45) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse 60% 50% at 90% 90%,
      rgba(178,255,89,0.12) 0%,
      transparent 50%
    ),
    linear-gradient(
      135deg,
      ${Colors.tint900} 0%,
      ${Colors.tint800} 30%,
      ${Colors.tint700} 60%,
      ${Colors.tint600} 100%
    )
  `,

  '&::before': {
    content: '""',
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)`,
    top: -200,
    right: -200,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)`,
    bottom: -120,
    left: -120,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 420,
  padding: theme.spacing(5, 4),
  borderRadius: 24,
  background: 'rgba(255,255,255,0.94)',
  backdropFilter: 'blur(32px)',
  border: '1px solid rgba(255,255,255,0.25)',
  boxShadow: `
    0 20px 60px rgba(0,0,0,0.18),
    0 4px 16px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.6)
  `,
  position: 'relative',
  zIndex: 1,
}));

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(245,245,245,0.8)',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(240,240,240,0.9)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255,255,255,0.95)',
      boxShadow: `0 0 0 3px ${Colors.tint200}40`,
    },
  },
} as const;

export default function Login() {
  const { login, state } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  if (state.user !== null) {
    return (
      <Navigate
        to={AppRoutes.DASHBOARD}
        replace
      />
    );
  }

  const validateEmail = (email: string) => {
    validateInput(email, {
      regex: EMAIL_REGEX,
      emptyMessage: "Email can't be empty",
      invalidMessage: "Email doesn't match pattern abcd@abd.com",
      setError: setEmailErrorMessage,
      setValid: setIsValidEmail,
      setData: setEmail,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateEmail(email);
    const userAuth: LoginCredentials = { email, password };
    login(userAuth);
  };

  return (
    <LoginContainer>
      <Fade
        in
        timeout={800}
      >
        <StyledPaper elevation={0}>
          {/* Logo */}
          <Box sx={{ mb: 3 }}>
            <Logo src={LogoImage} />
          </Box>

          {/* Welcome Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: Colors.tint900,
                mb: 0.5,
                letterSpacing: '-0.02em',
              }}
            >
              Welcome back
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              Sign in to manage your expenses
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            method="post"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: 'grid', gap: 3 }}
          >
            <TextField
              id="email"
              name="email"
              error={!isValidEmail}
              helperText={emailErrorMessage}
              type="email"
              label="Email address"
              variant="outlined"
              onChange={handleEmailChange}
              fullWidth
              autoFocus
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        sx={{
                          color: isValidEmail ? 'action.active' : 'error.main',
                        }}
                        fontSize="small"
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputStyles}
            />

            <TextField
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              onChange={handlePasswordChange}
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        sx={{ color: 'action.active' }}
                        fontSize="small"
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputStyles}
            />

            <Button
              disabled={!isValidEmail || !password}
              loading={state.loading}
              loadingPosition="start"
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<LoginTwoTone />}
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.04em',
                textTransform: 'none',
                background: `linear-gradient(135deg, ${Colors.tint600} 0%, ${Colors.tint800} 100%)`,
                boxShadow: `0 4px 14px ${Colors.tint600}60`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${Colors.tint500} 0%, ${Colors.tint700} 100%)`,
                  boxShadow: `0 6px 20px ${Colors.tint600}80`,
                },
                '&:disabled': {
                  background: Colors.tint200,
                  boxShadow: 'none',
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 4,
              color: 'text.disabled',
            }}
          >
            Expense Tracker &copy; {new Date().getFullYear()}
          </Typography>
        </StyledPaper>
      </Fade>
    </LoginContainer>
  );
}
