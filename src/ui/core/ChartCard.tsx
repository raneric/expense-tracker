import { Card } from '@mui/material';
import type { BasePropsType } from '../../type/PropsType';
import { BorderRadius } from '../Theming/Dimensions';

export default function ChartCard({ children }: BasePropsType) {
  return (
    <Card
      sx={{
        px: 2,
        py: 1,
        borderRadius: BorderRadius.small,
      }}
    >
      {children}
    </Card>
  );
}
