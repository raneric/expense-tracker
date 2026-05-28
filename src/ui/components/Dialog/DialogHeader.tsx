import { DialogTitle } from '@mui/material';
import Colors from '../../Theming/Colors';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

const StyledDialogTitle = styled(DialogTitle)(() => ({
  fontWeight: 'bold',
  backgroundColor: Colors.tint900,
  color: Colors.tint200,
  display: 'flex',
  justifyContent: 'space-between',
}));

export default function DialogHeader({ children }: PropsWithChildren) {
  return <StyledDialogTitle>{children}</StyledDialogTitle>;
}
