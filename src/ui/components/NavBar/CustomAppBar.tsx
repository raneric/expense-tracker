import { ExitToAppTwoTone } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import Colors from '../../Theming/Colors';
import { useUser } from '../../../context/UserContext';

const drawerWidth = 240;

export default function CustomAppBar() {
  const { logout } = useUser();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <AppBar
        position='fixed'
        elevation={2}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={handleLogout}
            aria-label='fingerprint'
            sx={{ color: Colors.lightBlue50 }}
          >
            <ExitToAppTwoTone fontSize='medium' />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
