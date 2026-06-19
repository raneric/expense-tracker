export const LOCAL_STORAGE_KEY = 'expense_tracker_user';
export const DRAWER_STATE_KEY = 'drawer_collapse_state';

export const getDataFromStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return null;
  }
};

export const clearDataOnStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};

export const storeDataToStorage = (key: string, email: string): void => {
  try {
    localStorage.setItem(key, email);
  } catch (error) {
    console.error('Failed to store user in localStorage:', error);
  }
};
