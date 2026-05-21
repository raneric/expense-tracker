import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderRoot = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

export default function CustomCardHeader({
  displayText,
}: {
  displayText: string;
}) {
  return (
    <HeaderRoot>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold' }}
      >
        {displayText}
      </Typography>
    </HeaderRoot>
  );
}
