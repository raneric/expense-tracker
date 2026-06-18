import { FirstPage, LastPage } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImage from '../../../../assets/logo_v2_xs.png';
import CollapsedLogoImage from '../../../../assets/logo_v2_xs_collapsed.png';
import { useDrawerContext } from '../../../../contexts/drawer/DrawerContext';
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

  const { state: drawerState, hide, toggleCollapse } = useDrawerContext();

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
          overflowX: 'hidden',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo src={drawerState.collapsed ? CollapsedLogoImage : LogoImage} />
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
                  {!drawerState.collapsed && (
                    <ListItemText primary={route.displayName} />
                  )}
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider sx={{ my: 1 }} />
      </Box>
      <Box
        sx={{
          p: 1,
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          right: 0,
          justifyContent: drawerState.collapsed ? 'center' : 'flex-end',
        }}
      >
        <IconButton onClick={() => toggleCollapse(!drawerState.collapsed)}>
          {drawerState.collapsed ? <LastPage /> : <FirstPage />}
        </IconButton>
      </Box>
    </Drawer>
  );
}
