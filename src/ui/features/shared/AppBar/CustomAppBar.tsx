import { ExitToAppTwoTone } from '@mui/icons-material';
import { AppBar, Avatar, Chip, IconButton, Toolbar } from '@mui/material';
import { useUserContext } from '../../../../contexts/auth/UserContext';
import { useDrawer } from '../../../../hooks/useDrawer';
import { useResponsive } from '../../../../hooks/useResponsive';
import Colors from '../../../Theming/Colors';

export default function CustomAppBar() {
  const { logout, state } = useUserContext();

  const { isDesktop } = useResponsive();
  const { drawerState } = useDrawer();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: isDesktop ? `calc(100% - ${drawerState.width}px)` : '100%',
        ml: isDesktop ? `${drawerState.width}px` : 0,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isDesktop ? 'flex-end' : 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Chip
          avatar={
            <Avatar
              alt={state.profile?.firstName}
              src={state.profile?.pictureUrl}
            />
          }
          label={state.profile?.email}
          variant="outlined"
        />

        <IconButton
          onClick={handleLogout}
          aria-label="logout"
          sx={{ color: Colors.tint50 }}
        >
          <ExitToAppTwoTone fontSize="medium" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
