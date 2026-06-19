import { Paper, Typography } from '@mui/material';

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
        borderColor: 'grey.200',
        transition: 'all .2s',
        '&:hover': {
          borderColor: '#03a9f4',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1"
        sx={{ fontWeight: 600, mt: 0.5 }}
      >
        {value}
      </Typography>
    </Paper>
  );
}
