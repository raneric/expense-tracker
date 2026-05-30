/**
 * Snackbar/Notification Provider Component
 *
 * Manages a global queue of notifications (snackbars) that stack without overlapping.
 *
 * Features:
 * - Maintains a FIFO queue of notifications
 * - Each notification has a unique auto-generated ID
 * - Supports MUI AlertColor severity levels: success, error, warning, info
 * - show() function to push notifications onto the queue
 * - hide() function to remove notifications by ID
 * - Notifications are independent and can be dismissed individually
 * - Prevents duplicate notifications from stacking
 *
 * Context Value Structure:
 * - state: SnackbarState - Contains notifications array
 * - show(message: string, severity: AlertColor): void - Adds notification to queue
 * - hide(id: string): void - Removes notification from queue by ID
 *
 * Usage:
 * ```tsx
 * import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';
 *
 * function MyComponent() {
 *   const { show } = useSnackbarContext();
 *   const handleAction = async () => {
 *     try {
 *       await saveData();
 *       show('Data saved successfully', 'success');
 *     } catch (error) {
 *       show('Error saving data', 'error');
 *     }
 *   };
 *   return <button onClick={handleAction}>Save</button>;
 * }
 *
 * // GlobalSnackbar component renders all queued notifications
 * ```
 *
 * @component
 * @param {PropsWithChildren} props - React children to be wrapped by this provider
 * @returns {JSX.Element} Provider component wrapping children with SnackbarContext
 *
 * @note This provider should be wrapped by GlobalSnackbar component to render notifications
 * @note Uses crypto.randomUUID() for notification IDs - requires modern browser or polyfill
 * @note Notifications are stored in a queue - multiple can be active at once
 */
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
