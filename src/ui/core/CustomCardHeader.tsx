import { Box, Typography } from '@mui/material';
import Colors from '../Theming/Colors';

export default function CustomCardHeader({ displayText }: { displayText: string }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: 'primary.dark',
        color: Colors.tint50,
        py: 1,
        borderRadius: '0.6em 0.6em 0 0',
      }}
    >
      <Typography variant='h6'>{displayText}</Typography>
    </Box>
  );
}
