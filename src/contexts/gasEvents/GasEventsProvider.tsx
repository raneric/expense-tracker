import { useCallback, useEffect, useMemo, useReducer } from 'react';
import RepositoriesFactory from '../../repositories/RepositoriesFactory';
import type { GasEvent } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import type {
  DataRetrievalState,
  GasEventDataRetrievalContextType,
} from '../../type/StateContextType';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { GasEventsContext } from './GasEventsContext';
import { gasEventsReducer } from './gasEventsReducer';

const initialState: Omit<DataRetrievalState<GasEvent, undefined>, 'filter'> = {
  data: [],
  isLoading: false,
};

export const GasEventsProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(gasEventsReducer, initialState);
  const { show } = useSnackbarContext();

  const gasEventsRepository = useMemo(
    () => RepositoriesFactory.createGasEventRepository(),
    []
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

      const data = await gasEventsRepository.getAll();

      dispatch({
        type: 'LOADED',
        payload: data,
      });
    } catch (error) {
      handleError(error);
    }
  }, [gasEventsRepository, handleError]);

  const submit = useCallback(async () => {
    console.log('called');
  }, []);

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
