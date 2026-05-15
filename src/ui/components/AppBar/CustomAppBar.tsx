import { ExitToAppTwoTone } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Colors from '../../Theming/Colors';
import { useUserContext } from '../../../contexts/auth/UserContext';

export default function CustomAppBar() {
  const { logout } = useUserContext();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <AppBar position='fixed' elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleLogout} aria-label='fingerprint' sx={{ color: Colors.tint50 }}>
          <ExitToAppTwoTone fontSize='medium' />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
