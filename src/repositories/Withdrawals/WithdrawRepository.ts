import { orderBy, type QueryConstraint } from 'firebase/firestore';
import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import type { Withdrawal } from '../../type/AppType';
import { withdrawalDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';
import { removeDuplicateValues } from '../../utils/validationUtilities';

export default class WithdrawRepository
  implements BaseRepository<Withdrawal, string>
{
  private readonly dataProvider: DataProvider<Withdrawal, string>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<Withdrawal>(
      COLLECTIONS.withdrawals
    );
  }

  async getAll(constraints?: QueryConstraint[]): Promise<Withdrawal[]> {
    const queryConstraint = constraints
      ? constraints
      : [orderBy('date', 'desc')];

    return await this.dataProvider.getAll(
      withdrawalDataMapper,
      queryConstraint
    );
  }

  async getReasonsList(constraints: QueryConstraint[]): Promise<string[]> {
    const withdrawals = await this.dataProvider.getAll(
      withdrawalDataMapper,
      constraints
    );
    const reasons = withdrawals.flatMap((withdrawal) => withdrawal.reasons);
    return removeDuplicateValues<string>(reasons);
  }

  async createOne(data: Withdrawal): Promise<void> {
    await this.dataProvider.createOne(data);
  }

  async getByUnique(unique: string): Promise<Withdrawal> {
    return await this.dataProvider.getByUnique(unique, withdrawalDataMapper);
  }

  async deleteByUnique(unique: string): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }

  async updateOne(data: Withdrawal): Promise<void> {
    const idToUpdate = data.id!;
    delete data.id;
    await this.dataProvider.updateOne(idToUpdate, data);
  }
}
