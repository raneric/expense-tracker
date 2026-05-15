import { DialogTitle } from '@mui/material';
import Colors from '../../Theming/Colors';
import type { BasePropsType } from '../../../type/PropsType';

export default function DialogHeader({ children }: BasePropsType) {
  return (
    <DialogTitle
      sx={{
        fontWeight: 'bold',
        backgroundColor: Colors.tint900,
        color: Colors.tint200,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </DialogTitle>
  );
}
