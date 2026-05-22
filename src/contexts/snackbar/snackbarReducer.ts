import type {
  SnackbarAction,
  SnackbarState,
} from '../../type/StateContextType';

export const snackbarReducer = (
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.type) {
    case 'PUSH':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case 'REMOVE':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
