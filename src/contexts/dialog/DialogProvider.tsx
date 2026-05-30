/**
 * Generic Dialog State Provider Component
 *
 * Manages simple dialog open/close state for generic use cases.
 *
 * Features:
 * - Simple boolean toggle state for dialog visibility
 * - show() function to open dialog
 * - hide() function to close dialog
 * - Minimal overhead - only tracks open/closed state
 *
 * Context Value Structure:
 * - state: { isOpen: boolean } - Current dialog visibility state
 * - show(): void - Opens the dialog
 * - hide(): void - Closes the dialog
 *
 * Usage:
 * ```tsx
 * import { useDialogContext } from '../contexts/dialog/DialogContext';
 *
 * function GenericDialog() {
 *   const { state, show, hide } = useDialogContext();
 *   return (
 *     <>
 *       <Button onClick={show}>Open Dialog</Button>
 *       <Dialog open={state.isOpen} onClose={hide}>
 *         <DialogTitle>Dialog Title</DialogTitle>
 *       </Dialog>
 *     </>
 *   );
 * }
 * ```
 *
 * @component
 * @param {PropsWithChildren} props - React children to be wrapped by this provider
 * @returns {JSX.Element} Provider component wrapping children with DialogContext
 *
 * @note For feature-specific dialogs with additional state, use feature-specific hooks like useWithdrawalHistory
 * @note This is a lightweight generic dialog state - not meant for complex dialog workflows
 */
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
