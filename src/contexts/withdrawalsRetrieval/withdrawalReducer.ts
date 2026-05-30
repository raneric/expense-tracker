import type {
  WithdrawalRetrievalAction,
  WithdrawalRetrievalState,
} from '../../type/StateContextType';
import { getDefaultDateFilterRange } from '../../utils/dataGeneratorUtilities';

export const withdrawalReducer = (
  state: WithdrawalRetrievalState,
  action: WithdrawalRetrievalAction
): WithdrawalRetrievalState => {
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
        filter: getDefaultDateFilterRange(),
      };
    case 'LOAD_REASONS':
      return {
        ...state,
        reasons: action.payload,
      };
    default:
      return state;
  }
};
