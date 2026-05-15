import { LoginTwoTone } from '@mui/icons-material';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LogoImage from '../../../assets/logo.png';
import { useUserContext } from '../../../contexts/auth/UserContext';
import type { LoginCredentials } from '../../../type/AppType';
import { AppRoutes } from '../../../utils/Const';
import { validateInput } from '../../../utils/validationUtilities';
import { Logo } from '../../core/Logo';
import Colors from '../../Theming/Colors';

export default function Login() {
  const { login, state } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  // Redirect to dashboard if user is already logged in
  if (state.user !== null) {
    return <Navigate to={AppRoutes.DASHBOARD} replace />;
  }

  /**
   * Validates the email input against a regex pattern and updates the error message and validity state accordingly.
   * @param e
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email: string = e.target.value;

    validateInput(email, {
      regex: emailRegex,
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
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userAuth: LoginCredentials = { email, password };
    await login(userAuth);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Logo src={LogoImage} />
        <br />
        <Box
          component='form'
          method='post'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
          sx={{ display: 'grid', gap: 4 }}
        >
          <TextField
            id='email'
            name='email'
            error={!isValidEmail}
            helperText={emailErrorMessage}
            type='email'
            label='Email'
            variant='outlined'
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            variant='outlined'
            onChange={handlePasswordChange}
            fullWidth
          />
          <Button
            sx={{
              backgroundColor: Colors.tint900,
              color: Colors.tint200,
              fontWeight: 'bold',
            }}
            loading={state.loading}
            loadingPosition='start'
            type='submit'
            variant='contained'
            size='large'
            fullWidth
            endIcon={<LoginTwoTone />}
          >
            LOGIN
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
