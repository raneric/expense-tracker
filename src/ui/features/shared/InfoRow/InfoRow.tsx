import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { InfoRowProps } from '../../../../type/PropsType';

const InfoRowContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
}));

export default function InfoRow(props: InfoRowProps) {
  const { label, value } = props;
  return (
    <InfoRowContainer>
      <Typography variant="body2">{label}</Typography>
      <Typography
        variant="body2"
        sx={{ ml: 'auto', fontWeight: 'bold' }}
      >
        {value}
      </Typography>
    </InfoRowContainer>
  );
}
