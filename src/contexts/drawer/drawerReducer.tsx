import type { DrawerState } from '../../type/AppType';
import type { DrawerAction } from '../../type/StateContextType';

export const drawerReducer = (
  state: DrawerState,
  action: DrawerAction
): DrawerState => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        collapsed: !state.collapsed,
        width: action.payload,
      };
    case 'OPEN':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
