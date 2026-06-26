import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  alpha,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImage from '../../../../assets/logo_v2_xs.png';
import CollapsedLogoImage from '../../../../assets/logo_v2_xs_collapsed.png';
import { useDrawerContext } from '../../../../contexts/drawer/DrawerContext';
import { useResponsive } from '../../../../hooks/useResponsive';
import { AppRoutes, RouteList } from '../../../../router/routes';
import { Logo } from '../Logo/Logo';

export default function AppDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop } = useResponsive();
  const { state: drawerState, hide, toggleCollapse } = useDrawerContext();

  const collapsed = drawerState.collapsed;
  const activeRoute = location.pathname;

  const variant = isDesktop ? 'permanent' : 'temporary';
  const open = isDesktop ? true : drawerState.isOpen;

  const handleNavigate = (path: string) => {
    navigate(path);
    if (!isDesktop) hide();
  };

  const navItems = RouteList.filter(
    (route) => route.path !== AppRoutes.LOGIN
  );

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
          borderRight: '1px solid',
          borderColor: 'divider',
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
      {/* ── Logo ── */}
      <Box>
        <Logo src={collapsed ? CollapsedLogoImage : LogoImage} />
      </Box>
      <Divider sx={{ mx: 2 }} />

      {/* ── Navigation ── */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: collapsed ? 0.5 : 1.5,
          py: 1,
        }}
      >
        <List disablePadding>
          {navItems.map((route) => {
            const isActive = activeRoute === route.path;

            const button = (
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigate(route.path)}
                sx={{
                  mb: 0.5,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 1 : 1.5,
                  py: 1.25,
                  borderRadius: 3,
                  transition: (theme) =>
                    theme.transitions.create(
                      ['background-color', 'padding', 'justify-content', 'transform'],
                      {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.shorter,
                      }
                    ),
                  '&:hover': {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.06),
                  },
                  '&.Mui-selected': {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.14),
                    },
                    // Left accent bar
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 3,
                      height: 24,
                      borderRadius: 2,
                      backgroundColor: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 40,
                    justifyContent: 'center',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    transition: (theme) =>
                      theme.transitions.create(
                        ['min-width', 'color'],
                        {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.shorter,
                        }
                      ),
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={route.displayName}
                    sx={{
                      m: 0,
                      color: isActive ? 'text.primary' : 'text.secondary',
                      transition: (theme) =>
                        theme.transitions.create('opacity', {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.shorter,
                        }),
                    }}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 14,
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: '0.01em',
                        },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem
                disablePadding
                key={route.path}
              >
                {collapsed ? (
                  <Tooltip title={route.displayName} placement="right" arrow>
                    {button}
                  </Tooltip>
                ) : (
                  button
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* ── Footer ── */}
      <Divider sx={{ mx: 2 }} />
      <Box
        sx={{
          p: collapsed ? 1 : 1.5,
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
        }}
      >
        <Tooltip
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          placement="right"
        >
          <IconButton
            onClick={() => toggleCollapse(!collapsed)}
            size="small"
            sx={{
              borderRadius: 2,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.08),
                color: 'primary.main',
              },
            }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer >
  );
}
