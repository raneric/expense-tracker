import { ExitToAppTwoTone } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Chip,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useUserContext } from '../../../../contexts/auth/UserContext';
import { useDrawerContext } from '../../../../contexts/drawer/DrawerContext';
import { useResponsive } from '../../../../hooks/useResponsive';
import Colors from '../../../Theming/Colors';

export default function CustomAppBar() {
  const { logout, state } = useUserContext();

  const { isDesktop } = useResponsive();
  const { state: drawerState } = useDrawerContext();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  const userInitials =
    state.profile?.firstName && state.profile?.lastName
      ? `${state.profile.firstName[0]}${state.profile.lastName[0]}`.toUpperCase()
      : undefined;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: isDesktop
          ? `calc(100% - ${drawerState.width}px)`
          : '100%',
        ml: isDesktop ? `${drawerState.width}px` : 0,

        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255,255,255,0.08)',
        transition: (theme) =>
          theme.transitions.create(['width', 'margin-left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isDesktop ? 'flex-end' : 'space-between',
          width: '100%',
          alignItems: 'center',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1.5, sm: 2 },
          gap: 1.5,
        }}
      >

        {/* User chip */}
        <Tooltip title={state.profile?.email ?? 'User'}>
          <Chip
            avatar={
              <Avatar
                alt={state.profile?.firstName}
                src={state.profile?.pictureUrl}
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {!state.profile?.pictureUrl ? userInitials : undefined}
              </Avatar>
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  maxWidth: { xs: 140, sm: 220 },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: Colors.tint50,
                }}
              >
                {isDesktop ?
                  `${state.profile?.firstName} ${state.profile?.lastName}`
                  : state.profile?.firstName}
              </Typography>
            }
            variant="filled"
            sx={{
              height: 40,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.12)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.16)',
              },
              '& .MuiChip-label': {
                px: 1,
              },
              '& .MuiChip-avatar': {
                ml: 0.5,
                mr: -0.25,
              },
            }}
          />
        </Tooltip>

        {/* Logout button */}
        <Tooltip title="Sign out">
          <IconButton
            onClick={handleLogout}
            aria-label="Sign out"
            sx={{
              color: Colors.tint50,
              borderRadius: 2.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
              },
            }}
          >
            <ExitToAppTwoTone fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
