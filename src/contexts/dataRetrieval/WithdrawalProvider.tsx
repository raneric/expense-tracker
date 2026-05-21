import { orderBy, where } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import WithdrawRepository from '../../repositories/WithdrawRepository';
import type { Withdrawal } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import type {
  DataRetrievalState,
  DateFilter,
} from '../../type/StateContextType';
import { getDefaultDateFilterRange } from '../../utils/dataTransformUtilities';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { WithdrawalContext } from './WithdrawalContext';
import { withdrawalReducer } from './withdrawalReducer';

const initialState: DataRetrievalState<Withdrawal, DateFilter> = {
  data: [],
  isLoading: false,
  filter: getDefaultDateFilterRange(),
};

// TODO: Refactoring filer constraint by using filter builder
export const WithdrawalProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(withdrawalReducer, initialState);

  const { show } = useSnackbarContext();

  /**
   * Repository instance
   */
  const withdrawalRepository = useMemo(() => new WithdrawRepository(), []);

  const constraints = useMemo(
    () => [
      orderBy('date', 'desc'),
      where('date', '>=', state.filter.startDate),
      where('date', '<=', state.filter.endDate),
    ],
    [state.filter]
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

      const data = await withdrawalRepository.getAll(constraints);

      dispatch({
        type: 'LOADED',
        payload: data,
      });
    } catch (error) {
      handleError(error);
    }
  }, [withdrawalRepository, handleError, constraints]);

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
