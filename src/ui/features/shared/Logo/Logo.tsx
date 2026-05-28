import { Box } from '@mui/material';
import { LOGO_SIZES, type LogoWidth } from '../../../../type/UIType';

type LogoProps = {
  src: string;
  logoSize?: LogoWidth;
};

export function Logo({ logoSize, src }: LogoProps) {
  const maxWidth: LogoWidth = logoSize || LOGO_SIZES.Small;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
      }}
    >
      <Box
        component="img"
        src={src}
        alt="Logo"
        sx={{
          width: '100%',
          maxWidth,
        }}
      />
    </Box>
  );
}
