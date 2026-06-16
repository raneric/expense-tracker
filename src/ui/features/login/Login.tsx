import { LoginTwoTone } from '@mui/icons-material';
import { Box, Button, Paper, TextField } from '@mui/material';
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
    linear-gradient(
      135deg,
      ${Colors.tint900} 0%,
      ${Colors.tint700} 45%,
      ${Colors.tint500} 100%
    )
  `,

  '&::before': {
    content: '""',
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    top: -150,
    right: -150,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    bottom: -100,
    left: -100,
  },
}));

export default function Login() {
  const { login, state } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  // Redirect to dashboard if user is already logged in
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

  /**
   * Validates the email input against a regex pattern and updates the error message and validity state accordingly.
   * @param e
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    validateEmail(email);
  };

  /**
   * Validates the password input against a regex pattern and updates the error message and validity state accordingly.
   * @param e
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setPassword(password);
  };

  /**
   * Handles the form submission by calling the login function from the user context.
   * @param e
   */
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateEmail(email);
    const userAuth: LoginCredentials = { email, password };
    login(userAuth);
  };

  return (
    <LoginContainer>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px)',

          border: '1px solid rgba(255,255,255,0.2)',

          boxShadow: `
            0 10px 40px rgba(0,0,0,0.15),
            0 2px 8px rgba(0,0,0,0.08)
          `,
        }}
      >
        <Logo src={LogoImage} />
        <br />
        <Box
          component="form"
          method="post"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'grid', gap: 4 }}
        >
          <TextField
            id="email"
            name="email"
            error={!isValidEmail}
            helperText={emailErrorMessage}
            type="email"
            label="Email"
            variant="outlined"
            onChange={handleEmailChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.7)',
              },
            }}
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.7)',
              },
            }}
          />
          <Button
            disabled={!isValidEmail}
            loading={state.loading}
            loadingPosition="start"
            sx={{
              color: Colors.tint600,
              fontWeight: 'bold',
            }}
            type="submit"
            variant="text"
            fullWidth
            size="large"
            endIcon={<LoginTwoTone />}
          >
            LOGIN
          </Button>
        </Box>
      </Paper>
    </LoginContainer>
  );
}
