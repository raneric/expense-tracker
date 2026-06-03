import {
  Card,
  CardContent,
  Chip,
  List,
  Stack,
  Typography,
} from '@mui/material';
import type { WithdrawalListProps } from '../../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../../utils/formatterUtilities';

export default function WithdrawalList({ withdrawals }: WithdrawalListProps) {
  if (withdrawals.length === 0) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography color="text.secondary">
            No withdrawals to display.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <List
      disablePadding
      sx={{ display: 'grid', gap: 1.5 }}
    >
      {withdrawals.map((withdrawal) => (
        <Card
          key={
            withdrawal.id ??
            `${withdrawal.date.toISOString()}-${withdrawal.location}`
          }
          variant="outlined"
          sx={{ borderRadius: 3 }}
        >
          <CardContent sx={{ pb: 1.5 }}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Stack spacing={0.25}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                  >
                    {withdrawal.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {withdrawal.date.toDateString()}
                  </Typography>
                </Stack>
                {withdrawal.isForecast && (
                  <Chip
                    label={'Forecast'}
                    color={'warning'}
                    size="small"
                  />
                )}
              </Stack>

              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: '60%' }}
                >
                  {withdrawal.reasons.join(', ') || 'No reason provided'}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: 'primary.main' }}
                >
                  {toLocalMgCurrency(withdrawal.amount)}
                </Typography>
              </Stack>

              {withdrawal.comments && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {withdrawal.comments}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </List>
  );
}
