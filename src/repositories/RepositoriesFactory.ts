import type { GasEvent, UserInfo, Withdrawal } from '../type/AppType';
import type BaseRepository from './BaseRepository';
import GasEventsRepository from './gasEvents/GasEventsRepository';
import UsersInfoRepository from './UsersInfo/UsersInfoRepository';
import MockWithdrawRepository from './Withdrawals/MockWithdrawRepository';
import WithdrawRepository from './Withdrawals/WithdrawRepository';

export default class RepositoriesFactory {
  private static withdrawRepositoryInstance: BaseRepository<Withdrawal, string>;
  private static userInfoRepositoryInstance: BaseRepository<UserInfo, string>;
  private static gasEventsRepository: BaseRepository<GasEvent, string>;

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

  public static createGasEventRepository() {
    if (!RepositoriesFactory.gasEventsRepository) {
      RepositoriesFactory.gasEventsRepository = new GasEventsRepository();
    }
    return RepositoriesFactory.gasEventsRepository;
  }
}
