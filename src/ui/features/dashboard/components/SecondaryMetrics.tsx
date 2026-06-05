import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import type { MetricItemProps } from '../../../../type/AppType';

export default function SecondaryMetrics({
  icon,
  label,
  value,
  trendingUp,
  rate,
}: MetricItemProps) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 1, alignItems: 'center' }}
      >
        {icon}
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {label}
        </Typography>
      </Stack>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>

      {rate !== 'N/A' && (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mt: 0.5 }}
        >
          {trendingUp ? (
            <TrendingUp
              sx={{
                fontSize: 16,
                color: 'success.main',
              }}
            />
          ) : (
            <TrendingDown
              sx={{
                fontSize: 16,
                color: 'error.main',
              }}
            />
          )}
          <Typography
            variant="caption"
            sx={{
              color: trendingUp ? 'success.main' : 'error.main',
              fontWeight: 600,
            }}
          >
            {rate ?? '0%'}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
