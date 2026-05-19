import { createContext, useContext } from 'react';
import type { DialogContextType } from '../../type/StateContextType';

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
