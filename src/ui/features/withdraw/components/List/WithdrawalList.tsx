import { CheckCircleTwoTone, DeleteForever, Edit } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useWithdrawalActions } from '../../../../../contexts/WithdrawalActions/WithdrawalActionsContext';
import type { WithdrawalsDataProps } from '../../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../../utils/formatterUtilities';

export default function WithdrawalList({ withdrawals }: WithdrawalsDataProps) {
  const { onEdit, onDelete, onForecastValidated } = useWithdrawalActions();

  if (withdrawals.length === 0) {
    return (
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          py: 4,
          textAlign: 'center',
          bgcolor: 'grey.50',
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
          >
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
          sx={{
            borderRadius: 3,
            borderColor: withdrawal.isForecast
              ? 'warning.main'
              : 'divider',
            borderWidth: withdrawal.isForecast ? 1.5 : 1,
            transition: 'box-shadow 0.2s, border-color 0.2s',
            '&:hover': {
              boxShadow: 2,
              borderColor: withdrawal.isForecast
                ? 'warning.dark'
                : 'primary.light',
            },
          }}
        >
          <CardContent sx={{ pb: '12px !important' }}>
            <Stack spacing={1.5}>
              {/* Header: location + date + forecast chip */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Stack spacing={0.25} sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: withdrawal.isForecast
                        ? 'warning.main'
                        : 'text.primary',
                    }}
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
                    label="Forecast"
                    color="warning"
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, flexShrink: 0 }}
                  />
                )}
              </Stack>

              {/* Amount + reasons */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
                spacing={1}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: '60%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {withdrawal.reasons.join(', ') || 'No reason provided'}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: withdrawal.isForecast
                      ? 'warning.main'
                      : 'primary.main',
                    flexShrink: 0,
                  }}
                >
                  {toLocalMgCurrency(withdrawal.amount)}
                </Typography>
              </Stack>

              {/* Comments */}
              {withdrawal.comments && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontStyle: 'italic',
                    bgcolor: 'grey.50',
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 1,
                  }}
                >
                  {withdrawal.comments}
                </Typography>
              )}

              {/* Action buttons */}
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  justifyContent: 'flex-end',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 1,
                  mt: 0.5,
                }}
              >
                {withdrawal.isForecast && (
                  <Tooltip title="Validate forecast">
                    <IconButton
                      size="small"
                      aria-label={`Validate forecast of ${withdrawal.amount}`}
                      onClick={() => onForecastValidated(withdrawal)}
                      sx={{
                        color: 'warning.main',
                        '&:hover': { bgcolor: 'warning.50' },
                      }}
                    >
                      <CheckCircleTwoTone color="warning" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    aria-label={`Edit withdrawal of ${withdrawal.amount}`}
                    onClick={() => onEdit(withdrawal)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    aria-label={`Delete withdrawal of ${withdrawal.amount}`}
                    onClick={() => onDelete(withdrawal)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteForever fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </List>
  );
}
