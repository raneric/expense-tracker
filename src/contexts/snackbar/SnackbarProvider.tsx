import { useReducer } from 'react';
import type { BasePropsType } from '../../type/PropsType';
import { SnackbarContext } from './SnackbarContext';
import { snackbarReducer } from './snackbarReducer';
import type { AlertColor } from '@mui/material';
import type { SnackbarState } from '../../type/StateContextType';

const initialState: SnackbarState = {
  notifications: [],
};

export const SnackbarProvider = ({ children }: BasePropsType) => {
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
