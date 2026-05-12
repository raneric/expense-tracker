import { Card } from '@mui/material';
import type { BasePropsType } from '../../type/PropsType';
import AppDimensions from '../Theming/Dimensions';

export default function ChartCard({ children }: BasePropsType) {
  return (
    <Card
      sx={{
        px: 2,
        py: 1,
        borderRadius: AppDimensions.BorderRadius.small,
      }}
    >
      {children}
    </Card>
  );
}
