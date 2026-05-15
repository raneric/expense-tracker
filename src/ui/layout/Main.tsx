import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../contexts/auth/UserContext';
import { AppRoutes } from '../../utils/Const';
import CustomAppBar from '../components/AppBar/CustomAppBar';
import AppDrawer from '../components/Drawer/AppDrawer';

export default function Main() {
  const { state } = useUserContext();

  if (state.user === null) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
    </Box>
  );
}
