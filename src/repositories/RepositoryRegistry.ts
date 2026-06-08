import { type RepositoryType } from '../type/AppType';
import { REPOSITORY_LIST } from '../utils/Const';
import GasEventsRepository from './gasEvents/GasEventsRepository';
import SavingRepository from './saving/SavingRepository';
import UsersInfoRepository from './UsersInfo/UsersInfoRepository';
import WithdrawRepository from './Withdrawals/WithdrawRepository';

export class RepositoryRegistry {
  private static readonly instances = new Map();

  static get(type: RepositoryType) {
    if (!this.instances.has(type)) {
      this.instances.set(type, this.build(type));
    }

    return this.instances.get(type);
  }

  private static build(type: RepositoryType) {
    switch (type) {
      case REPOSITORY_LIST.Withdraw:
        return new WithdrawRepository();

      case REPOSITORY_LIST.UserInfo:
        return new UsersInfoRepository();

      case REPOSITORY_LIST.GasEvent:
        return new GasEventsRepository();

      case REPOSITORY_LIST.Saving:
        return new SavingRepository();
    }
  }
}
