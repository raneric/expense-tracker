import { createTheme } from '@mui/material/styles';
import Colors from './Colors';
import { FontColor, fontFamilies } from './Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.lightBlue400,
      dark: Colors.lightBlue700,
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
  },
  typography: {
    fontFamily: fontFamilies,
  },
});

export default theme;
