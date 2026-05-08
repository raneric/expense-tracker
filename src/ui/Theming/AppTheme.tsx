import { createTheme } from '@mui/material/styles';
import Colors from './Colors';
import { FontColor, fontFamilies } from './Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.lightBlue400,
      light: Colors.lightBlue300,
      dark: Colors.lightBlue600,
      contrastText: Colors.onPrimary,
    },
    secondary: {
      main: Colors.limeGreenA100,
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
