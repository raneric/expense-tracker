import type { GasEvent } from '../../type/AppType';
import type {
  DataRetrievalAction,
  GasEventsDataRetrievalState,
} from '../../type/StateContextType';

export const gasEventsReducer = (
  state: GasEventsDataRetrievalState,
  action: DataRetrievalAction<GasEvent, undefined>
): GasEventsDataRetrievalState => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
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
    default:
      return state;
  }
};
