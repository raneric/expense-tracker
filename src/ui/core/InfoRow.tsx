import { Box, Typography } from '@mui/material';
import AppDimensions from '../Theming/Dimensions';
import Colors from '../Theming/Colors';
import type { InfoRowProps } from '../../type/PropsType';

export default function InfoRow(props: InfoRowProps) {
  const { label, value } = props;
  return (
    <Box
      sx={{
        backgroundColor: Colors.tint50,
        p: 1,
        display: 'flex',
        alignItems: 'center',
        borderRadius: AppDimensions.BorderRadius.small,
        width: '100%',
        gap: 1,
      }}
    >
      <Typography variant='body2'>{label}</Typography>
      <Typography sx={{ ml: 'auto' }}>{value}</Typography>
    </Box>
  );
}
