import { useState } from 'react';
import type { DrawerState } from '../type/AppType';

const initialState: DrawerState = {
  isOpen: false,
  variant: 'permanent',
  collapsed: false,
  width: 240,
};

export function useDrawer() {
  const [drawerState, setDrawerState] = useState<DrawerState>(initialState);

  const hide = () => {
    setDrawerState((prevState) => ({ ...prevState, isOpen: false }));
  };

  const show = () => {
    setDrawerState((prevState) => ({ ...prevState, isOpen: true }));
  };

  const toggle = () => {
    setDrawerState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };
  return {
    toggle,
    show,
    hide,
    drawerState,
  };
}
