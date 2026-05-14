const LOCAL_STORAGE_KEY = "expense_tracker_user";

export const getStoredUserEmail = (): string | null => {
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to read from localStorage:", error);
    return null;
  }
};

export const clearStoredUser = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
};

export const storeUserEmail = (email: string): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, email);
  } catch (error) {
    console.error("Failed to store user in localStorage:", error);
  }
};
