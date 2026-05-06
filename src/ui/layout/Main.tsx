import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppDrawer from '../components/Drawer/AppDrawer';
import CustomAppBar from '../components/NavBar/CustomAppBar';
import Login from './login/Login';
import { useUser } from '../../context/UserContext';

export default function Main() {
  const { state } = useUser();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {state.user ? (
        <>
          <CustomAppBar />
          <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
            <AppDrawer />
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                pt: 2,
                pr: 2,
                pb: 1,
                pl: 2,
                overflow: 'auto',
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </>
      ) : (
        <Login />
      )}
    </Box>
  );
}
