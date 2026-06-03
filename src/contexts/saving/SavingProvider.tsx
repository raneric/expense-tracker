import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react';
import type { Saving } from '../../type/AppType';
import type {
  DataRetrievalState,
  DateFilter,
} from '../../type/StateContextType';
import { getErrorMessage } from '../../utils/errorFunctions';
import { useUserContext } from '../auth/UserContext';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { SavingContext } from './SavingContext';
import { savingReducer } from './savingReducer';
import { orderBy, where } from 'firebase/firestore';
import RepositoriesFactory from '../../repositories/RepositoriesFactory';
import type SavingRepository from '../../repositories/saving/SavingRepository';

const initialState: DataRetrievalState<Saving, DateFilter | null> = {
  data: [],
  isLoading: false,
  filter: null,
};

export const SavingProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(savingReducer, initialState);
  const { state: userState } = useUserContext();
  const { show } = useSnackbarContext();

  /**
   * Repository instance
   */
  const savingRepository = useMemo(
    () => RepositoriesFactory.createSavingRepository() as SavingRepository,
    []
  );

  const defaultConstraints = useMemo(
    () => [where('ownerId', '==', userState.user?.id), orderBy('month', 'asc')],
    [userState.user]
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
      const savings = await savingRepository.getAll(defaultConstraints);
      dispatch({ type: 'LOADED', payload: savings });
    } catch (error) {
      handleError(error);
    }
  }, [savingRepository, defaultConstraints, handleError]);

  /**
   * Future filtering support
   */
  const filterBy = useCallback(
    async (filter: DateFilter | null) => {
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
    <SavingContext.Provider value={values}>{children}</SavingContext.Provider>
  );
};
