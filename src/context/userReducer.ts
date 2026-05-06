import type { UserAction, UserState } from './UserContext.tsx';

// Reducer
export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { user: action.payload, loading: false, error: null };
    case 'LOGIN_FAILURE':
      return { user: null, loading: false, error: action.payload };
    case 'LOGOUT':
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};
