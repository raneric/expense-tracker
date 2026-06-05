import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { InfoRowProps } from '../../../../type/PropsType';
import Colors from '../../../Theming/Colors';

const InInfoDetailsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.tint100,
  color: Colors.tint900,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
}));

export default function InfoDetails(props: InfoRowProps) {
  const { label, value } = props;
  return (
    <InInfoDetailsContainer>
      <Typography variant="body2">{label}</Typography>
      <Typography
        variant="body2"
        sx={{ ml: 'auto', fontWeight: 'bold' }}
      >
        {value}
      </Typography>
    </InInfoDetailsContainer>
  );
}
