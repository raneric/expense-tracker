import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppDimensions from '../../../Theming/Dimensions';

const ChartCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: AppDimensions.BorderRadius.small,
}));
export default ChartCard;
