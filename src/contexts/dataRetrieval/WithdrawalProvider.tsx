/**
 * Withdrawal Data Retrieval Provider Component
 *
 * Manages the global state for withdrawal data, filtering, and reasons list.
 *
 * Features:
 * - Fetches withdrawals from the database with user-specific constraints
 * - Maintains a list of unique withdrawal reasons for form autocomplete
 * - Supports date range filtering (TODO: currently partial implementation)
 * - Provides load() function to refresh withdrawal data
 * - Handles loading and error states with automatic error notifications
 * - Queries are optimized with Firestore constraints (userId, date range)
 *
 * Context Value Structure:
 * - state: WithdrawalRetrievalState - Contains withdrawals, reasons, loading, error, and filters
 * - load(): Promise<void> - Fetches all withdrawals and reasons for current user and filter
 * - filterBy(filter: DateFilter): Promise<void> - Updates date filter (TODO: implement data reload)
 * - resetFilter(): void - Resets filter to default date range and reloads data
 *
 * Usage:
 * ```tsx
 * import { useWithdrawalContext } from '../contexts/dataRetrieval/WithdrawalContext';
 *
 * function WithdrawalList() {
 *   const { state, load, filterBy } = useWithdrawalContext();
 *   if (state.isLoading) return <Skeleton />;
 *   return (
 *     <>
 *       {state.data.map(w => <WithdrawalItem key={w.id} withdrawal={w} />)}
 *     </>
 *   );
 * }
 * ```
 *
 * @component
 * @param {PropsWithChildren} props - React children to be wrapped by this provider
 * @returns {JSX.Element} Provider component wrapping children with WithdrawalContext
 *
 * @note Data automatically reloads when user changes (via dependency injection)
 * @note Data automatically reloads when filter changes (via effect)
 * @note Filter dispatch exists but doesn't trigger data reload (TODO: fix in filterBy)
 * @note Uses Firestore queries with constraints for efficient data fetching
 */
import { orderBy, where } from 'firebase/firestore';
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react';
import RepositoriesFactory from '../../repositories/RepositoriesFactory';
import type {
  DateFilter,
  WithdrawalRetrievalState,
} from '../../type/StateContextType';
import { getDefaultDateFilterRange } from '../../utils/dataGeneratorUtilities';
import { useUserContext } from '../auth/UserContext';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { WithdrawalContext } from './WithdrawalContext';
import { withdrawalReducer } from './withdrawalReducer';
import type WithdrawRepository from '../../repositories/Withdrawals/WithdrawRepository';
import { getErrorMessage } from '../../utils/errorFunctions';

const initialState: WithdrawalRetrievalState = {
  data: [],
  reasons: [],
  isLoading: false,
  filter: getDefaultDateFilterRange(),
};

// TODO: Refactoring filer constraint by using filter builder
export const WithdrawalProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(withdrawalReducer, initialState);
  const { state: userState } = useUserContext();
  const { show } = useSnackbarContext();

  /**
   * Repository instance
   */
  const withdrawalRepository = useMemo(
    () => RepositoriesFactory.createWithdrawRepository() as WithdrawRepository,
    []
  );

  const userIdConstraint = useMemo(
    () => where('ownerId', '==', userState.user?.id),
    [userState.user]
  );

  const constraints = useMemo(
    () => [
      where('date', '>=', state.filter.startDate),
      where('date', '<=', state.filter.endDate),
      userIdConstraint,
      orderBy('date', 'desc'),
    ],
    [state.filter, userIdConstraint]
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
   * Fetch all withdrawals
   */
  const load = useCallback(async () => {
    try {
      dispatch({ type: 'LOADING' });

      const withdrawals = await withdrawalRepository.getAll(constraints);
      const reasons = await withdrawalRepository.getReasonsList([
        userIdConstraint,
      ]);

      dispatch({
        type: 'LOADED',
        payload: withdrawals,
      });
      dispatch({ type: 'LOAD_REASONS', payload: reasons.toSorted() });
    } catch (error: unknown) {
      handleError(error);
    }
  }, [withdrawalRepository, handleError, constraints, userIdConstraint]);

  /**
   * Future filtering support
   */
  const filterBy = useCallback(
    async (filter: DateFilter) => {
      try {
        dispatch({ type: 'FILTER', payload: filter });
      } catch (error: unknown) {
        handleError(error);
      }
    },
    [handleError]
  );

  const resetFilter = useCallback(() => {
    dispatch({ type: 'RESET_FILTER' });
    void load();
  }, [load]);

  /**
   * Initial load
   */
  useEffect(() => {
    void load();
  }, [load, state.filter]);

  const values = useMemo(
    () => ({
      state,
      load,
      filterBy,
      resetFilter,
    }),
    [state, load, filterBy, resetFilter]
  );

  return (
    <WithdrawalContext.Provider value={values}>
      {children}
    </WithdrawalContext.Provider>
  );
};
