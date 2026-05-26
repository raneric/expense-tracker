import { createContext, useContext } from 'react';
import type { GasEventDataRetrievalContextType } from '../../type/StateContextType';

export const GasEventsContext =
  createContext<GasEventDataRetrievalContextType | null>(null);

export const useGasEventsContext = () => {
  const context = useContext(GasEventsContext);
  if (!context) {
    throw new Error(
      'useGasEventsContext must be used within a GasEventsProvider'
    );
  }
  return context;
};
