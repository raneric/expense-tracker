import { createContext, useContext } from 'react';
import type { SavingContextType } from '../../type/StateContextType';

export const SavingContext = createContext<SavingContextType | null>(null);

export const useSavingContext = () => {
  const context = useContext(SavingContext);
  if (!context) {
    throw new Error('useSavingContext must be used within a SavingProvider');
  }
  return context;
};
