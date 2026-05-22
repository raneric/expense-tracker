import type { UserInfo, Withdrawal } from '../type/AppType';
import type BaseRepository from './BaseRepository';
import UsersInfoRepository from './UsersInfo/UsersInfoRepository';
import MockWithdrawRepository from './Withdrawals/MockWithdrawRepository';
import WithdrawRepository from './Withdrawals/WithdrawRepository';

export default class RepositoriesFactory {
  private static withdrawRepositoryInstance: BaseRepository<Withdrawal, string>;
  private static userInfoRepositoryInstance: BaseRepository<UserInfo, string>;

  public static createWithdrawRepository(useMock: boolean = false) {
    if (!RepositoriesFactory.withdrawRepositoryInstance) {
      if (useMock) {
        RepositoriesFactory.withdrawRepositoryInstance =
          new MockWithdrawRepository();
      } else {
        RepositoriesFactory.withdrawRepositoryInstance =
          new WithdrawRepository();
      }
    }
    return RepositoriesFactory.withdrawRepositoryInstance;
  }

  public static createUserInfoRepository() {
    if (!RepositoriesFactory.userInfoRepositoryInstance) {
      RepositoriesFactory.userInfoRepositoryInstance =
        new UsersInfoRepository();
    }
    return RepositoriesFactory.userInfoRepositoryInstance;
  }
}
