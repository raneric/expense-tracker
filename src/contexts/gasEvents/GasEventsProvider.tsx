import dayjs from 'dayjs';
import { where } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import RepositoriesFactory from '../../repositories/RepositoriesFactory';
import type { GasEvent, GasFormDialogData } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import type {
  DataRetrievalState,
  GasEventDataRetrievalContextType,
} from '../../type/StateContextType';
import { useUserContext } from '../auth/UserContext';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { GasEventsContext } from './GasEventsContext';
import { gasEventsReducer } from './gasEventsReducer';

const initialState: Omit<DataRetrievalState<GasEvent, undefined>, 'filter'> = {
  data: [],
  isLoading: false,
};

export const GasEventsProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(gasEventsReducer, initialState);
  const { state: userState } = useUserContext();
  const { show } = useSnackbarContext();

  const constraints = useMemo(
    () => [where('ownerId', '==', userState.user?.id)],
    [userState.user]
  );

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
      const data = await gasEventsRepository.getAll(constraints);
      dispatch({
        type: 'LOADED',
        payload: data,
      });
    } catch (error) {
      handleError(error);
    }
  }, [gasEventsRepository, handleError, constraints]);

  const submit = useCallback(
    async (data: GasFormDialogData) => {
      const previousGas = state.data.find((value) => value.type === 'previous');
      const currentGas = state.data.find((value) => value.type === 'current');
      try {
        if (userState.user) {
          const newGasEvent: GasEvent = {
            startDate: data.date,
            ownerId: userState.user?.id,
            endDate: null,
            type: 'current',
            totalDays: 0,
            price: data.price,
          };
          await gasEventsRepository.createOne(newGasEvent);
        }

        if (previousGas) {
          previousGas.type = 'done';
          await gasEventsRepository.updateOne(previousGas);
        }

        if (currentGas) {
          currentGas.endDate = data.date;
          currentGas.type = 'previous';
          currentGas.totalDays = dayjs(currentGas.endDate).diff(
            dayjs(currentGas.startDate),
            'day'
          );
          await gasEventsRepository.updateOne(currentGas);
        }
      } catch (error: unknown) {
        show((error as Error).message, 'error');
      }
    },
    [state.data, gasEventsRepository, show, userState.user]
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
