import type { AlertColor } from '@mui/material';
import { useReducer, type PropsWithChildren } from 'react';
import type { SnackbarState } from '../../type/StateContextType';
import { SnackbarContext } from './SnackbarContext';
import { snackbarReducer } from './snackbarReducer';

const initialState: SnackbarState = {
  notifications: [],
};

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const show = (message: string, severity: AlertColor) => {
    dispatch({
      type: 'PUSH',
      payload: {
        id: crypto.randomUUID(),
        message,
        severity,
      },
    });
  };

  const hide = (id: string) => {
    dispatch({
      type: 'REMOVE',
      payload: id,
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        state,
        show,
        hide,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
