import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../contexts/auth/UserContext';
import { WithdrawalProvider } from '../../contexts/dataRetrieval/WithdrawalProvider';
import { DrawerProvider } from '../../contexts/drawer/DrawerProvider';
import { AppRoutes } from '../../utils/Const';
import CustomAppBar from '../components/AppBar/CustomAppBar';
import AppDrawer from '../components/Drawer/AppDrawer';
import SplashScreen from '../components/SplashScreen/SplashScreen';
import { Logo } from '../core/Logo';
import LogoImage from '../../assets/logo_v2.png';

export default function Main() {
  const { state } = useUserContext();

  if (state.isInit && state.loading) {
    return (
      <SplashScreen>
        <Logo src={LogoImage} />
      </SplashScreen>
    );
  }

  if (state.user === null) {
    return (
      <Navigate
        to={AppRoutes.LOGIN}
        replace
      />
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <DrawerProvider>
        <CustomAppBar />
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            mt: 8,
          }}
        >
          <AppDrawer />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 2,
              pr: 2,
              pb: 1,
              pl: 2,
              overflow: 'auto',
            }}
          >
            <WithdrawalProvider>
              <Outlet />
            </WithdrawalProvider>
          </Box>
        </Box>
      </DrawerProvider>
    </Box>
  );
}
