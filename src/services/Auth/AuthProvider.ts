import type { LoginCredentials, RequestResult, User } from '../../type/AppType';

export default interface AuthProvider {
  signIn: (credentials: LoginCredentials) => Promise<RequestResult<User>>;
  logout: () => Promise<void>;
}
