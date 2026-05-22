import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImage from '../../../assets/lovo_v2.png';
import { useDrawerContext } from '../../../contexts/drawer/DrawerContext';
import { AppRoutes, RouteList } from '../../../utils/Const';
import { Logo } from '../../core/Logo';

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

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { state, hide } = useDrawerContext();

  const activeRoute = location.pathname;

  const variant = isDesktop ? 'permanent' : 'temporary';
  const open = isDesktop ? true : state.isOpen;

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
        width: state.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: state.width,
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
