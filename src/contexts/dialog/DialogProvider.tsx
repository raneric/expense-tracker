import { useReducer, type PropsWithChildren } from 'react';
import { DialogContext } from './DialogContext';
import { dialogReducer } from './dialogReducer';

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(dialogReducer, { isOpen: false });

  const show = () => {
    dispatch({ type: 'OPEN' });
  };
  const hide = () => {
    dispatch({ type: 'CLOSE' });
  };
  return (
    <DialogContext.Provider value={{ state, show, hide }}>
      {children}
    </DialogContext.Provider>
  );
};
