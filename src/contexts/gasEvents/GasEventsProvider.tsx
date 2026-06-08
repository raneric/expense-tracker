/**
 * Gas Events Data Retrieval Provider Component
 *
 * Manages the global state for gas event data and submission operations.
 *
 * Features:
 * - Fetches gas events from the database for the current user
 * - Manages gas event state transitions (current, previous, done)
 * - Provides submit() function to handle gas event creation and state updates
 * - Handles complex state transitions via useGasEventSubmit hook:
 *   - Marks current event as 'previous'
 *   - Marks any previous event as 'done'
 *   - Creates new 'current' event with price and date
 *   - Calculates total days between events
 * - Handles loading and error states with automatic error notifications
 *
 * Context Value Structure:
 * - state: DataRetrievalState<GasEvent> - Contains gas events, loading, and error states
 * - load(): Promise<void> - Fetches all gas events for current user
 * - submit(data: GasFormDialogData): Promise<boolean> - Submits new gas event and updates state transitions
 *
 * Usage:
 * ```tsx
 * import { useGasEventsContext } from '../contexts/gasEvents/GasEventsContext';
 *
 * function GasEventForm() {
 *   const { state, submit } = useGasEventsContext();
 *   const handleSubmit = async (data) => {
 *     const success = await submit(data);
 *     if (success) console.log('Gas event saved');
 *   };
 *   return <GasEventFormDialog onSubmit={handleSubmit} />;
 * }
 * ```
 *
 * @component
 * @param {PropsWithChildren} props - React children to be wrapped by this provider
 * @returns {JSX.Element} Provider component wrapping children with GasEventsContext
 *
 * @note All database updates during submit() are performed in parallel using Promise.all
 * @note State transitions are immutable (uses spread operator, not mutations)
 * @note Data automatically reloads when user changes
 */
import { where } from 'firebase/firestore';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react';
import { useGasEventSubmit } from '../../hooks/useGasEventSubmit';
import type { GasEvent, GasFormDialogData } from '../../type/AppType';
import type {
  DataRetrievalState,
  GasEventDataRetrievalContextType,
} from '../../type/StateContextType';
import { getErrorMessage } from '../../utils/errorFunctions';
import { useUserContext } from '../auth/UserContext';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { GasEventsContext } from './GasEventsContext';
import { gasEventsReducer } from './gasEventsReducer';
import { RepositoryRegistry } from '../../repositories/RepositoryRegistry';
import { REPOSITORY_LIST } from '../../utils/Const';

const initialState: Omit<DataRetrievalState<GasEvent, undefined>, 'filter'> = {
  data: [],
  isLoading: false,
};

export const GasEventsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(gasEventsReducer, initialState);
  const { state: userState } = useUserContext();
  const { show } = useSnackbarContext();
  const gasEventSubmit = useGasEventSubmit();
  const constraints = useMemo(
    () => [where('ownerId', '==', userState.user?.id)],
    [userState.user]
  );

  const gasEventsRepository = useMemo(
    () => RepositoryRegistry.get(REPOSITORY_LIST.GasEvent),
    []
  );

  /**
   * Generic error handler
   */
  const handleError = useCallback(
    (error: unknown) => {
      dispatch({ type: 'ERROR' });
      const message = getErrorMessage(error);
      show(message, 'error');
    },
    [show]
  );

  /**
   * Fetch all
   */
  const load = useCallback(async () => {
    try {
      dispatch({ type: 'LOADING' });
      const data = await gasEventsRepository.getAll(constraints);
      dispatch({
        type: 'LOADED',
        payload: data,
      });
    } catch (error: unknown) {
      handleError(error);
    }
  }, [gasEventsRepository, handleError, constraints]);

  const submit = useCallback(
    async (data: GasFormDialogData) => {
      return gasEventSubmit(data, state.data);
    },
    [gasEventSubmit, state.data]
  );

  /**
   * Initial load
   */
  useEffect(() => {
    void load();
  }, [load]);

  const values: GasEventDataRetrievalContextType = useMemo(
    () => ({
      state,
      load,
      submit,
    }),
    [state, load, submit]
  );

  return (
    <GasEventsContext.Provider value={values}>
      {children}
    </GasEventsContext.Provider>
  );
};
