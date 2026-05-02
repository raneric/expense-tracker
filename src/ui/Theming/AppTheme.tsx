import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#03A9F4", // Blue
      dark: "#0288D1", // Darker blue for hover/active states
    },
    secondary: {
      main: "#e6f9a0", // Lime green
    },
    background: {
      default: "#f5f5f5", // Light gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#212121", // Black
      secondary: "#757575", // Gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
