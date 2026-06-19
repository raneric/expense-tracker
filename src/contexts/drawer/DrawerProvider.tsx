import { useReducer, useEffect, type PropsWithChildren } from 'react';
import type { DrawerState } from '../../type/AppType';
import { DrawerContext } from './DrawerContext';
import { drawerReducer } from './drawerReducer';
import { DRAWER_COLLAPSED_WIDTH, DRAWER_NORMAL_WIDTH } from '../../utils/Const';
import {
  DRAWER_STATE_KEY,
  getDataFromStorage,
  storeDataToStorage,
} from '../../utils/localStorageUtilities';

const createInitialState = (): DrawerState => {
  const storedValue = getDataFromStorage(DRAWER_STATE_KEY);

  const collapsed = storedValue !== null ? JSON.parse(storedValue) : false;

  return {
    isOpen: false,
    collapsed,
    variant: 'permanent',
    width: collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_NORMAL_WIDTH,
  };
};

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(
    drawerReducer,
    undefined,
    createInitialState
  );

  useEffect(() => {
    storeDataToStorage(DRAWER_STATE_KEY, JSON.stringify(state.collapsed));
  }, [state.collapsed]);

  const hide = () => {
    dispatch({ type: 'CLOSE' });
  };

  const show = () => {
    dispatch({ type: 'OPEN' });
  };

  const toggleCollapse = (nextCollapseState: boolean) => {
    dispatch({
      type: 'TOGGLE',
      payload: nextCollapseState ? DRAWER_COLLAPSED_WIDTH : DRAWER_NORMAL_WIDTH,
    });
  };

  return (
    <DrawerContext.Provider
      value={{
        state,
        hide,
        show,
        toggleCollapse,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
