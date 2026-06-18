import { Box } from '@mui/material';
import { LOGO_HEIGHT_SIZES, type LogoHeight } from '../../../../type/UIType';

type LogoProps = {
  src: string;
  logoSize?: LogoHeight;
};

export function Logo({ logoSize, src }: LogoProps) {
  const height: LogoHeight = logoSize || LOGO_HEIGHT_SIZES.Small;

  return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={src}
        alt="Logo"
        sx={{
          height,
          width: 'auto',
        }}
      />
    </Box>
  );
}
