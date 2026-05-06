import { createTheme } from '@mui/material/styles';
import Colors from './Colors';

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.lightBlue400,
      dark: Colors.lightBlue700,
    },
    secondary: {
      main: Colors.limeGreenA100, // Lime green
    },
    background: {
      default: '#f5f5f5', // Light gray
      paper: '#ffffff', // White
    },
    text: {
      primary: '#212121', // Black
      secondary: '#757575', // Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
