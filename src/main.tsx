import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App.tsx';
import theme from './ui/Theming/AppTheme.tsx';
import { UserProvider } from './context/auth/UserProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);
