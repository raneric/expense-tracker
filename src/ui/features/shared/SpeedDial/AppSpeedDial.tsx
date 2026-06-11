import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import Colors from '../../../Theming/Colors';
import type {
  SpeedDialActionElement,
  SpeedDialProps,
} from '../../../../type/PropsType';
import { useResponsive } from '../../../../hooks/useResponsive';

export default function AppSpeedDial({ elements }: SpeedDialProps) {
  const { isDesktop } = useResponsive();

  const speedDialPosition = isDesktop
    ? {
        position: 'fixed',
        bottom: 24,
        right: 24,
      }
    : {
        position: 'fixed',
        bottom: 62,
        right: 8,
      };

  return (
    <SpeedDial
      sx={speedDialPosition}
      ariaLabel="SpeedDial for withdrawal and filter"
      icon={<SpeedDialIcon />}
    >
      {elements.map((dialAction: SpeedDialActionElement) => (
        <SpeedDialAction
          key={dialAction.name}
          icon={dialAction.icon}
          sx={{
            backgroundColor: Colors.tint100,
            '&:hover': {
              backgroundColor: Colors.tint300,
            },
          }}
          slotProps={{
            tooltip: {
              title: dialAction.name,
            },
          }}
          onClick={dialAction.action}
        />
      ))}
    </SpeedDial>
  );
}
