import type { Withdrawal } from '../type/AppType';
import type BaseRepository from './BaseRepository';
import MockWithdrawRepository from './MockWithdrawRepository';
import WithdrawRepository from './WithdrawRepository';

export default class RepositoryFactory {
  private static withdrawRepositoryInstance: BaseRepository<Withdrawal, string>;
  public static createWithdrawRepository() {
    if (!RepositoryFactory.withdrawRepositoryInstance) {
      if (import.meta.env.DEV) {
        RepositoryFactory.withdrawRepositoryInstance =
          new MockWithdrawRepository();
      } else {
        RepositoryFactory.withdrawRepositoryInstance = new WithdrawRepository();
      }
    }
    return RepositoryFactory.withdrawRepositoryInstance;
  }
}
