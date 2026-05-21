import { DialogTitle } from '@mui/material';
import Colors from '../../Theming/Colors';
import type { BasePropsType } from '../../../type/PropsType';
import { styled } from '@mui/material/styles';

const StyledDialogTitle = styled(DialogTitle)(() => ({
  fontWeight: 'bold',
  backgroundColor: Colors.tint900,
  color: Colors.tint200,
  display: 'flex',
  justifyContent: 'space-between',
}));

export default function DialogHeader({ children }: BasePropsType) {
  return <StyledDialogTitle>{children}</StyledDialogTitle>;
}
