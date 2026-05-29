import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { AppRoutes, RouteList } from '../../../../utils/Const';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MobileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <BottomNavigation
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
      showLabels
      value={location.pathname}
      onChange={(_, newValue) => {
        navigate(newValue as string);
      }}
    >
      {RouteList.filter((route) => route.path !== AppRoutes.LOGIN).map(
        (route) => (
          <BottomNavigationAction
            key={route.path}
            label={route.name}
            icon={route.icon}
            value={route.path}
          />
        )
      )}
    </BottomNavigation>
  );
}
