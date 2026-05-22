import { ExitToAppTwoTone } from '@mui/icons-material';
import { AppBar, Avatar, Chip, IconButton, Toolbar } from '@mui/material';
import Colors from '../../Theming/Colors';
import { useUserContext } from '../../../contexts/auth/UserContext';

export default function CustomAppBar() {
  const { logout, state } = useUserContext();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Chip
          avatar={
            <Avatar
              alt="Natacha"
              src="/static/images/avatar/1.jpg"
            />
          }
          label={state.user?.email}
          variant="outlined"
        />
        <IconButton
          onClick={handleLogout}
          aria-label="fingerprint"
          sx={{ color: Colors.tint50 }}
        >
          <ExitToAppTwoTone fontSize="medium" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
