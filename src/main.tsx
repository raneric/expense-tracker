import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./contexts/auth/UserProvider.tsx";
import theme from "./ui/Theming/AppTheme.tsx";
import { SnackbarProvider } from "./contexts/snackbar/SnackbarProvider.tsx";
import GlobalSnackbar from "./ui/components/Snackbar/GlobalSnackbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <UserProvider>
          <App />
          <GlobalSnackbar />
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
