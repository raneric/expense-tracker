import { useCallback, useEffect, useRef, useState } from 'react';
import { useUserContext } from '../contexts/auth/UserContext';

/**
 * Manages temporary visibility of sensitive financial data.
 *
 * Security flow:
 * 1. User requests to view sensitive data.
 * 2. A password confirmation dialog is displayed.
 * 3. The user's password is re-authenticated through Firebase Auth.
 * 4. On successful validation, sensitive data becomes visible.
 * 5. Visibility is automatically revoked after 30 seconds.
 * 6. Users can manually hide the data before the timeout expires.
 *
 * All active timers are cleaned up when the component using this hook unmounts.
 *
 * @returns {Object}
 * @returns {boolean} sensitiveDataVisibility Indicates whether sensitive data should currently be displayed.
 * @returns {boolean} passwordDialog Indicates whether the password confirmation dialog should be displayed.
 * @returns {() => void} hide Toggles visibility behavior:
 * - If data is visible, it is hidden immediately and any active timeout is cleared.
 * - If data is hidden, the password confirmation dialog is opened.
 * @returns {(password: string) => Promise<boolean>} confirmPassword
 * Re-authenticates the current user with the provided password.
 * Returns true when authentication succeeds and sensitive data becomes visible.
 * Returns false when authentication fails.
 */
export default function useTemporaryVisibility() {
  const [sensitiveDataVisibility, setSensitiveDataVisibility] = useState(false);
  const [passwordDialog, setPasswordPasswordDialog] = useState(false);
  const { reauthenticate } = useUserContext();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Clears the active auto-hide timer if one exists.
   */
  const clearVisibilityTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * Handles visibility requests.
   *
   * If sensitive data is currently visible:
   * - Hide it immediately.
   * - Cancel any pending auto-hide timeout.
   *
   * If sensitive data is hidden:
   * - Open the password confirmation dialog.
   */
  const hide = useCallback(() => {
    if (sensitiveDataVisibility) {
      clearVisibilityTimeout();
      setSensitiveDataVisibility(false);
      return;
    }

    setPasswordPasswordDialog((previous) => !previous);
  }, [sensitiveDataVisibility, clearVisibilityTimeout]);

  /**
   * Validates the user's password through Firebase re-authentication.
   *
   * On success:
   * - Closes the password dialog.
   * - Reveals sensitive data.
   * - Starts a 30-second auto-hide timer.
   *
   * @param password User-entered password.
   * @returns Promise<boolean> True if authentication succeeds; otherwise false.
   */
  const confirmPassword = useCallback(
    async (password: string) => {
      const validationResult: boolean = await reauthenticate(password);

      if (!validationResult) {
        return false;
      }

      clearVisibilityTimeout();

      setSensitiveDataVisibility(true);
      setPasswordPasswordDialog(false);

      timeoutRef.current = setTimeout(() => {
        setSensitiveDataVisibility(false);
        timeoutRef.current = null;
      }, 30_000);

      return true;
    },
    [reauthenticate, clearVisibilityTimeout]
  );

  /**
   * Cleanup active timeout when the consuming component unmounts.
   */
  useEffect(() => {
    return () => {
      clearVisibilityTimeout();
    };
  }, [clearVisibilityTimeout]);

  return {
    sensitiveDataVisibility,
    passwordDialog,
    hide,
    confirmPassword,
  };
}
