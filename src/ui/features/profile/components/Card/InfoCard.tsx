import { Box, Paper, Typography } from '@mui/material';
import Colors from '../../../../Theming/Colors';

export default function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        transition: 'all 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          borderColor: Colors.tint300,
          boxShadow: `0 4px 16px ${Colors.tint200}30`,
          transform: 'translateY(-2px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          background: `linear-gradient(180deg, ${Colors.tint400}, ${Colors.tint600})`,
          borderRadius: '3px 0 0 3px',
          opacity: 0,
          transition: 'opacity 0.25s ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ pl: 0.5 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mt: 0.75,
            color: 'text.primary',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
