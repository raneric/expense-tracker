import type { GasEvent, Saving, UserInfo, Withdrawal } from '../type/AppType';
import type BaseRepository from './BaseRepository';
import GasEventsRepository from './gasEvents/GasEventsRepository';
import SavingRepository from './saving/SavingRepository';
import UsersInfoRepository from './UsersInfo/UsersInfoRepository';
import MockWithdrawRepository from './Withdrawals/MockWithdrawRepository';
import WithdrawRepository from './Withdrawals/WithdrawRepository';

export default class RepositoriesFactory {
  private static withdrawRepositoryInstance: BaseRepository<Withdrawal, string>;
  private static userInfoRepositoryInstance: BaseRepository<UserInfo, string>;
  private static gasEventsRepository: BaseRepository<GasEvent, string>;
  private static savingRepositoryInstance: BaseRepository<Saving, string>;

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

  public static createSavingRepository() {
    if (!RepositoriesFactory.savingRepositoryInstance) {
      RepositoriesFactory.savingRepositoryInstance = new SavingRepository();
    }
    return RepositoriesFactory.savingRepositoryInstance;
  }
}
