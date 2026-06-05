import { Stack } from '@mui/material';
import InfoRow from '../../shared/InfoRow/InfoRow';

export default function BalanceInfo() {
  return (
    <Stack
      direction={'column'}
      spacing={1}
    >
      <InfoRow
        label="Lorem ipsum"
        value="dolor sit amet"
      />
      <InfoRow
        label="Lorem ipsum"
        value="dolor sit amet"
      />
      <InfoRow
        label="Lorem ipsum"
        value="dolor sit amet"
      />
      <InfoRow
        label="Lorem ipsum"
        value="dolor sit amet"
      />
    </Stack>
  );
}
