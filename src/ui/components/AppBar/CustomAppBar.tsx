import { ExitToAppTwoTone, Menu } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useUserContext } from '../../../contexts/auth/UserContext';
import { useDrawerContext } from '../../../contexts/drawer/DrawerContext';
import Colors from '../../Theming/Colors';

export default function CustomAppBar() {
  const { logout, state } = useUserContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { state: drawerState, toggle } = useDrawerContext();

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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggle}
            >
              <Menu />
            </IconButton>
          )}
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
