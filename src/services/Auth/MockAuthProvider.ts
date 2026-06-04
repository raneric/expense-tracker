import type { LoginCredentials } from '../../type/AppType';
import { clearStoredUser } from '../../utils/localStorageUtilities';
import type AuthProvider from './AuthProvider';
import { validateCredentials } from '../../utils/validationUtilities';
import { users } from '../../test/MockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class MockAuthProvider implements AuthProvider {
  async signIn(credentials: LoginCredentials) {
    validateCredentials(credentials);
    await delay(1000);
    return users[0];
  }

  async logout() {
    clearStoredUser();
  }
}
