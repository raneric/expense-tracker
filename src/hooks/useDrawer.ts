import { useState } from 'react';
import type { DrawerState } from '../type/AppType';

const initialState: DrawerState = {
  isOpen: false,
  variant: 'permanent',
  width: 240,
};

export default function useDrawer(isDesktop: boolean) {
  const [state, setState] = useState<DrawerState>({
    ...initialState,
    isOpen: isDesktop,
    variant: isDesktop ? 'permanent' : 'temporary',
  });

  const makePermanent = () => {
    setState((previous) => ({ ...previous, variant: 'permanent' }));
  };

  const makeTemporary = () => {
    setState((previous) => ({
      ...previous,
      variant: 'temporary',
      isOpen: false,
    }));
  };

  const hide = () => {
    setState((previous) => ({ ...previous, isOpen: false }));
  };

  const show = () => {
    setState((previous) => ({ ...previous, isOpen: true }));
  };

  const toggle = () => {
    setState((previous) => ({ ...previous, isOpen: !previous.isOpen }));
  };

  return {
    state,
    hide,
    show,
    makePermanent,
    makeTemporary,
    toggle,
  };
}
