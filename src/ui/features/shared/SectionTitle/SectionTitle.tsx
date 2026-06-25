import { HelpTwoTone } from '@mui/icons-material';
import { Box, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useResponsive } from '../../../../hooks/useResponsive';
import Colors from '../../../Theming/Colors';

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.25, 2.5),
  marginBottom: theme.spacing(2),
  borderRadius: 14,
  background: `
    linear-gradient(
      135deg,
      ${Colors.tint500} 0%,
      ${Colors.tint600} 100%
    )
  `,
  color: Colors.tint50,
  boxShadow: `
    0 4px 16px ${Colors.tint800}30,
    0 1px 4px rgba(0,0,0,0.08)
  `,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 120,
    height: '100%',
    background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 100%)`,
    pointerEvents: 'none',
  },
}));

function Title({
  displayText,
  icon,
}: {
  displayText: string;
  icon: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 2.5,
          bgcolor: 'rgba(255,255,255,0.15)',
          color: Colors.tint50,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {displayText}
      </Typography>
    </Box>
  );
}

function TitleHelperInfo({ displayText }: { displayText: string }) {
  const { isDesktop } = useResponsive();

  return (
    <>
      {isDesktop ? (
        <ExpandedHelperInfo displayText={displayText} />
      ) : (
        <TooltipHelperInfo displayText={displayText} />
      )}
    </>
  );
}

function ExpandedHelperInfo({ displayText }: { displayText: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'rgba(255,255,255,0.1)',
        borderRadius: 2.5,
        px: 1.5,
        py: 0.5,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          opacity: 0.9,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {displayText}
      </Typography>
      <HelpTwoTone sx={{ fontSize: '1rem', opacity: 0.7 }} />
    </Box>
  );
}

function TooltipHelperInfo({ displayText }: { displayText: string }) {
  return (
    <Tooltip
      describeChild
      title={displayText}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: Colors.tint900,
            fontSize: '0.8rem',
            fontWeight: 500,
            py: 1,
            px: 1.5,
            borderRadius: 2,
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.12)',
          cursor: 'help',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.22)',
          },
        }}
      >
        <HelpTwoTone sx={{ fontSize: '1.2rem' }} />
      </Box>
    </Tooltip>
  );
}

export { SectionTitle, Title, TitleHelperInfo };
