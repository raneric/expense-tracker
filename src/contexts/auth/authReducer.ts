import type { AuthState, UserAction } from '../../type/StateContextType';

// Reducer
export const authReducer = (
  state: AuthState,
  action: UserAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        profile: null,
        loading: false,
        isInit: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        profile: null,
        isInit: true,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        profile: null,
        isInit: true,
        error: null,
      };
    case 'AUTH_INITIALIZED':
      return {
        ...state,
        user: action.payload,
        isInit: false,
      };
    case 'LOAD_PROFILE':
      return {
        ...state,
        profile: action.payload,
        isInit: false,
      };
    default:
      return state;
  }
};
