import type { Withdrawal } from '../../type/AppType';
import type {
  DataRetrievalAction,
  DataRetrievalState,
  DateFilter,
} from '../../type/StateContextType';

export const withdrawalReducer = (
  state: DataRetrievalState<Withdrawal, DateFilter>,
  action: DataRetrievalAction<Withdrawal, DateFilter>
): DataRetrievalState<Withdrawal, DateFilter> => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'FILTER':
      return {
        ...state,
        isLoading: true,
        filter: action.payload,
      };
    case 'LOADED':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
      };
    case 'RESET_FILTER':
      return {
        ...state,
        filter: null,
      };
    default:
      return state;
  }
};
