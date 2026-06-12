import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImage from '../../../../assets/logo_v2_xs.png';
import { useDrawer } from '../../../../hooks/useDrawer';
import { useResponsive } from '../../../../hooks/useResponsive';
import { AppRoutes, RouteList } from '../../../../router/routes';
import { Logo } from '../Logo/Logo';

const activeItemStyle = {
  '&.Mui-selected': {
    backgroundColor: 'secondary.main',
    color: 'text.main',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: 'secondary.main',
    },
  },
};

export default function AppDrawer() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isDesktop } = useResponsive();

  const { drawerState, hide } = useDrawer();

  const activeRoute = location.pathname;

  const variant = isDesktop ? 'permanent' : 'temporary';
  const open = isDesktop ? true : drawerState.isOpen;

  const handleNavigate = (path: string) => {
    navigate(path);

    if (!isDesktop) {
      hide();
    }
  };

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={hide}
      sx={{
        width: drawerState.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerState.width,
          boxSizing: 'border-box',
        },
      }}
    >
      <Logo src={LogoImage} />

      <Box sx={{ p: 1 }}>
        <List>
          {RouteList.filter((route) => route.path !== AppRoutes.LOGIN).map(
            (route) => (
              <ListItem
                disablePadding
                key={route.path}
              >
                <ListItemButton
                  selected={activeRoute === route.path}
                  onClick={() => handleNavigate(route.path)}
                  sx={activeItemStyle}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.displayName} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider sx={{ my: 1 }} />
      </Box>
    </Drawer>
  );
}
