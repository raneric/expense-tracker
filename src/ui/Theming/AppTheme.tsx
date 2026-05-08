import { createTheme } from '@mui/material/styles';
import Colors from './Colors';
import { FontColor, fontFamilies } from './Typography';

const theme = createTheme({
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
    fontFamily: fontFamilies,
  },
});

export default theme;
