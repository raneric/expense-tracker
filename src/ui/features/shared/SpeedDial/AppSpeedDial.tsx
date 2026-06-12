import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import Colors from '../../../Theming/Colors';
import type {
  SpeedDialActionElement,
  SpeedDialProps,
} from '../../../../type/PropsType';
import { useResponsive } from '../../../../hooks/useResponsive';

export default function AppSpeedDial({ elements }: SpeedDialProps) {
  const { isDesktop } = useResponsive();

  return (
    <SpeedDial
      sx={{
        position: 'fixed',
        bottom: isDesktop ? 24 : 62,
        right: isDesktop ? 24 : 8,
      }}
      ariaLabel="SpeedDial for withdrawal and filter"
      icon={<SpeedDialIcon />}
    >
      {elements.map(({ name, icon, action }: SpeedDialActionElement) => (
        <SpeedDialAction
          key={name}
          icon={icon}
          sx={{
            backgroundColor: Colors.tint100,
            '&:hover': {
              backgroundColor: Colors.tint300,
            },
          }}
          slotProps={{
            tooltip: {
              title: name,
            },
          }}
          onClick={action}
        />
      ))}
    </SpeedDial>
  );
}
