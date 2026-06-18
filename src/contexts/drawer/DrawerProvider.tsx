/**
 * Navigation Drawer State Provider Component
 *
 * Manages the global state for the application's navigation drawer.
 *
 * Features:
 * - Tracks drawer open/closed state (isOpen)
 * - Manages drawer variant (permanent, temporary, persistent)
 * - Controls drawer width (default 240px)
 * - Provides show(), hide(), and toggle() functions for drawer control
 * - Supports responsive drawer behavior (variant changes with screen size)
 *
 * Context Value Structure:
 * - state: DrawerState - Contains isOpen, variant, and width
 * - show(): void - Opens the drawer
 * - hide(): void - Closes the drawer
 * - toggle(): void - Toggles drawer visibility
 *
 * Usage:
 * ```tsx
 * import { useDrawerContext } from '../contexts/drawer/DrawerContext';
 *
 * function NavigationLayout() {
 *   const { state, show, hide, toggle } = useDrawerContext();
 *   return (
 *     <>
 *       <AppBar>
 *         <IconButton onClick={toggle}>Menu</IconButton>
 *       </AppBar>
 *       <Drawer open={state.isOpen} variant={state.variant} onClose={hide}>
 *         <Navigation />
 *       </Drawer>
 *     </>
 *   );
 * }
 * ```
 *
 * @component
 * @param {PropsWithChildren} props - React children to be wrapped by this provider
 * @returns {JSX.Element} Provider component wrapping children with DrawerContext
 *
 * @note Drawer variant should be updated by consuming components based on screen size
 * @note Commonly used with MUI Drawer component and AppBar for responsive layouts
 */
import { useReducer, type PropsWithChildren } from 'react';
import type { DrawerState } from '../../type/AppType';
import { DrawerContext } from './DrawerContext';
import { drawerReducer } from './drawerReducer';
import { DRAWER_COLLAPSED_WIDTH, DRAWER_NORMAL_WIDTH } from '../../utils/Const';

const initialState: DrawerState = {
  isOpen: false,
  collapsed: false,
  variant: 'permanent',
  width: DRAWER_NORMAL_WIDTH,
};

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(drawerReducer, initialState);

  const hide = () => {
    dispatch({ type: 'CLOSE' });
  };

  const show = () => {
    dispatch({ type: 'OPEN' });
  };

  const toggleCollapse = (nexCollapseState: boolean) => {
    dispatch({
      type: 'TOGGLE',
      payload: nexCollapseState ? DRAWER_COLLAPSED_WIDTH : DRAWER_NORMAL_WIDTH,
    });
  };

  return (
    <DrawerContext.Provider value={{ state, hide, show, toggleCollapse }}>
      {children}
    </DrawerContext.Provider>
  );
};
