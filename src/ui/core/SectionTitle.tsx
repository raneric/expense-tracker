import { Box, Typography } from '@mui/material';
import type { BasePropsType } from '../../type/PropsType';
import Colors from '../Theming/Colors';
import { HelpTwoTone } from '@mui/icons-material';

function SectionTitle({ children }: BasePropsType) {
  const tittleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    mb: 2,
    borderRadius: 2,
    backgroundColor: 'primary.dark',
    color: Colors.tint50,
  };

  return (
    <>
      <Box sx={tittleStyle}>{children}</Box>
    </>
  );
}

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
