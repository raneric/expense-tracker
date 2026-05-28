import { Stack, Tooltip, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import type { Withdrawal } from '../../../../../type/AppType';

export default function ReasonsCell({
  withdrawal,
}: {
  withdrawal: Withdrawal;
}) {
  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      {withdrawal.comments && (
        <Tooltip
          describeChild
          title={withdrawal.comments}
        >
          <Info
            color="info"
            fontSize="small"
          />
        </Tooltip>
      )}
      <Typography>{withdrawal.reasons.join(', ')}</Typography>
    </Stack>
  );
}
