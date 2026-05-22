import { useReducer } from 'react';
import { drawerReducer } from './drawerReducer';
import { DrawerContext } from './DrawerContext';
import type { BasePropsType } from '../../type/PropsType';
import type { DrawerState } from '../../type/AppType';

const initialState: DrawerState = {
  isOpen: false,
  variant: 'permanent',
  width: 240,
};

export const DrawerProvider = ({ children }: BasePropsType) => {
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
