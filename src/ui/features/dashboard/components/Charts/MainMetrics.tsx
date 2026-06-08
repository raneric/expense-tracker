import { Box, Stack, Typography } from '@mui/material';
import type { MetricItemProps } from '../../../../../type/AppType';

export default function MainMetrics({
  icon,
  label,
  value,
}: Partial<MetricItemProps>) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        {icon}
        <Box>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
            }}
          >
            {label}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            {value}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
