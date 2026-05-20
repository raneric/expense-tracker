import { HelpTwoTone } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

function Tittle({
  displayText,
  icon,
}: {
  displayText: string;
  icon: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold' }}
      >
        {displayText}
      </Typography>
    </Box>
  );
}

function TittleHelperInfo({ displayText }: { displayText: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography
        variant="body2"
        sx={{ opacity: 0.88 }}
      >
        {displayText}
      </Typography>
      <HelpTwoTone sx={{ fontSize: '1.8rem' }} />
    </Box>
  );
}

export { SectionTitle, Tittle, TittleHelperInfo };
