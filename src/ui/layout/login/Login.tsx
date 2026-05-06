import { LoginTwoTone } from '@mui/icons-material';
import { Box, Button, CircularProgress, Paper, TextField } from '@mui/material';
import LogoImage from '../../../assets/logo.png';
import { useUser } from '../../../context/UserContext';
import { Logo } from '../../core/Logo';
import Colors from '../../Theming/Colors';

export default function Login() {
  const { login, state } = useUser();
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
          bgcolor: '#f7f9fc',
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
              type='email'
              label='Email'
              variant='outlined'
              fullWidth
            />

            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
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
