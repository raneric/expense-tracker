import { orderBy, QueryConstraint, where } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import WithdrawRepository from '../../repositories/WithdrawRepository';
import type { Withdrawal } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import type {
  DateFilter,
  DataRetrievalState,
} from '../../type/StateContextType';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { WithdrawalContext } from './WithdrawalContext';
import { withdrawalReducer } from './withdrawalReducer';

const initialState: DataRetrievalState<Withdrawal, DateFilter> = {
  data: [],
  isLoading: false,
};

export const WithdrawalProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(withdrawalReducer, initialState);

  const { show } = useSnackbarContext();

  /**
   * Repository instance
   */
  const withdrawalRepository = useMemo(() => new WithdrawRepository(), []);

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
  const load = useCallback(
    async (constraints?: QueryConstraint[]) => {
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
    },
    [withdrawalRepository, handleError]
  );

  /**
   * Future filtering support
   */
  const filterBy = useCallback(
    async (filter: DateFilter) => {
      try {
        dispatch({ type: 'LOADING' });
        const constraints: QueryConstraint[] = [orderBy('date', 'desc')];

        if (filter.startDate) {
          constraints.push(where('date', '>=', filter.startDate));
        }

        if (filter.endDate) {
          constraints.push(where('date', '<=', filter.endDate));
        }

        dispatch({ type: 'FILTER', payload: filter });
        void load(constraints);
      } catch (error) {
        handleError(error);
      }
    },
    [handleError, load]
  );

  /**
   *  Handle empty array when no data is loaded, mainly for sparkline chart, handle default displayed date on FilterDialog, state is not preserved
   *
   * */

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
    }),
    [state, load, filterBy]
  );

  return (
    <WithdrawalContext.Provider value={values}>
      {children}
    </WithdrawalContext.Provider>
  );
};
