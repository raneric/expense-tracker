import { createContext, useContext } from 'react';
import type { SnackbarContextType } from '../../type/StateContextType';

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSnackbarContext must be used within a SnackbarProvider'
    );
  }
  return context;
};
