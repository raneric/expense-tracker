import { Box, CircularProgress } from '@mui/material';
import type { PropsWithChildren } from 'react';

type SplashScreenProps = PropsWithChildren<{
  loading?: boolean;
}>;

export default function SplashScreen({
  children,
  loading = true,
}: SplashScreenProps) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {children}
      {loading && (
        <CircularProgress
          size={28}
          thickness={4}
        />
      )}
    </Box>
  );
}
