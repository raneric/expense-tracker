import { useLocation, useNavigate } from 'react-router-dom';
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
import { AppRoutes, RouteList } from '../../../utils/Const';
import { Logo } from '../../core/Logo';
import LogoImage from '../../../assets/lovo_v2.png';

const drawerStyle = {
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
  },
};

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
  const activeRoute = location.pathname;

  return (
    <Drawer
      variant="permanent"
      sx={drawerStyle}
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
                  onClick={() => navigate(route.path)}
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
