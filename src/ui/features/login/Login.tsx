import { LoginTwoTone } from '@mui/icons-material';
import { Box, Button, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LogoImage from '../../../assets/logo_v2.png';
import { useUserContext } from '../../../contexts/auth/UserContext';
import { AppRoutes } from '../../../router/routes';
import type { LoginCredentials } from '../../../type/AppType';
import { EMAIL_REGEX, validateInput } from '../../../utils/validationUtilities';
import { Logo } from '../shared/Logo/Logo';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: `
    linear-gradient(
      145deg,
      #01579b 0%,
      #0277bd 30%,
      #039be5 65%,
      #4fc3f7 100%
    )
  `,
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

  /**
   * Validates the email input against a regex pattern and updates the error message and validity state accordingly.
   * @param e
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;

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
          backdropFilter: 'blur(16px)',
          background: 'rgba(233, 232, 232, 0.90)',
          border: '1px solid rgba(255,255,255,0.18)',
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
            variant="standard"
            onChange={handleEmailChange}
            fullWidth
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="standard"
            onChange={handlePasswordChange}
            fullWidth
          />
          <Button
            loading={state.loading}
            loadingPosition="start"
            type="submit"
            variant="text"
            size="large"
            fullWidth
            endIcon={<LoginTwoTone />}
          >
            LOGIN
          </Button>
        </Box>
      </Paper>
    </LoginContainer>
  );
}
