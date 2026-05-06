import { LoginTwoTone } from '@mui/icons-material';
import { Box, Button, CircularProgress, Paper, TextField } from '@mui/material';
import LogoImage from '../../../assets/logo.png';
import { useUser } from '../../../context/UserContext';
import { Logo } from '../../core/Logo';
import Colors from '../../Theming/Colors';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../../utils/Const';
import { useState } from 'react';
import { validateInput } from '../../../utils/validationFunctions';

export default function Login() {
  const { login, state } = useUser();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // Redirect to dashboard if user is already logged in
  if (state.user !== null) {
    return <Navigate to={AppRoutes.DASHBOARD} replace />;
  }

  /**
   * Validates the email input against a regex pattern and updates the error message and validity state accordingly.
   * @param e
   */
  const validateEmailPattern = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email: string = e.target.value;

    validateInput(email, {
      regex: emailRegex,
      emptyMessage: "Email can't be empty",
      invalidMessage: "Email doesn't match pattern abcd@abd.com",
      setError: setEmailErrorMessage,
      setValid: setIsValidEmail,
    });
  };

  /**
   * Validates the password input against a regex pattern and updates the error message and validity state accordingly.
   * @param e
   */
  const validatePasswordPattern = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const password: string = e.target.value;

    validateInput(password, {
      regex: passwordRegex,
      emptyMessage: "Password can't be empty",
      invalidMessage: 'Password too weak',
      setError: setPasswordErrorMessage,
      setValid: setIsValidPassword,
    });
  };

  /**
   * Handles the form submission by calling the login function from the user context.
   * @param e
   */
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login();
  };

  return (
    <>
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
              onChange={validateEmailPattern}
              fullWidth
            />

            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              error={!isValidPassword}
              helperText={passwordErrorMessage}
              onChange={validatePasswordPattern}
              fullWidth
            />

            <Button
              sx={{
                backgroundColor: Colors.lightBlue900,
                color: Colors.lightBlue200,
                fontWeight: 'bold',
              }}
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              endIcon={<LoginTwoTone />}
            >
              {state.loading ? <CircularProgress aria-label='Loading…' /> : <span>LOGIN</span>}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
