import { useReducer, type PropsWithChildren } from 'react';
import type { DrawerState } from '../../type/AppType';
import { DrawerContext } from './DrawerContext';
import { drawerReducer } from './drawerReducer';

const initialState: DrawerState = {
  isOpen: false,
  variant: 'permanent',
  width: 240,
};

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(drawerReducer, initialState);

  const hide = () => {
    dispatch({ type: 'CLOSE' });
  };

  const show = () => {
    dispatch({ type: 'OPEN' });
  };

  const toggle = () => {
    dispatch({ type: 'TOGGLE' });
  };

  return (
    <DrawerContext.Provider value={{ state, hide, show, toggle }}>
      {children}
    </DrawerContext.Provider>
  );
};
