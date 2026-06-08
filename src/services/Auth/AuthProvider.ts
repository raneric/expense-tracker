import type { LoginCredentials, User } from '../../type/AppType';

export default interface AuthProvider {
  signIn: (credentials: LoginCredentials) => Promise<User>;
  reauthenticate: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
