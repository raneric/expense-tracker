import { createTheme } from '@mui/material/styles';
import Colors from './Colors';
import AppTypography from './Typography';

const { FontColor, FontFamilies } = AppTypography;

const theme = createTheme({
  gradients: {
    appBackground: 'linear-gradient(to right, #243b55, #141e30)',
  },

  palette: {
    primary: {
      main: Colors.tint400,
      light: Colors.tint300,
      dark: Colors.tint600,
      contrastText: Colors.onPrimary,
    },
    secondary: {
      main: Colors.A100,
    },
    background: {
      default: Colors.backgroundDefault,
      paper: Colors.paperBackground,
    },
    text: {
      primary: FontColor.primary,
      secondary: FontColor.secondary,
    },
    error: {
      main: Colors.error,
      light: Colors.errorLight,
      dark: Colors.errorDark,
    },
    warning: {
      main: Colors.warning,
      light: Colors.warningLight,
      dark: Colors.warningDark,
    },
  },
  typography: {
    fontFamily: FontFamilies,
  },
});

export default theme;
