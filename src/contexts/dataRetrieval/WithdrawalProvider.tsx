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

      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred';

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
    } catch (error) {
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
        void load();
      } catch (error) {
        handleError(error);
      }
    },
    [handleError, load]
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
  }, [load]);

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
