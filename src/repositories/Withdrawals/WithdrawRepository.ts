import { orderBy, type QueryConstraint } from 'firebase/firestore';
import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import type { Withdrawal } from '../../type/AppType';
import { withdrawalDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';
import { removeDuplicateValues } from '../../utils/validationUtilities';

export default class WithdrawRepository
  implements BaseRepository<Withdrawal, QueryConstraint>
{
  private readonly dataProvider: DataProvider<Withdrawal, QueryConstraint>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<Withdrawal>(
      COLLECTIONS.withdrawals,
      withdrawalDataMapper
    );
  }

  async getAll(constraints?: QueryConstraint[]): Promise<Withdrawal[]> {
    const queryConstraint = constraints
      ? constraints
      : [orderBy('date', 'desc')];

    return await this.dataProvider.getAll(queryConstraint);
  }

  async getReasonsList(constraints: QueryConstraint[]): Promise<string[]> {
    const withdrawals = await this.dataProvider.getAll(constraints);
    const reasons = withdrawals.flatMap((withdrawal) => withdrawal.reasons);
    return removeDuplicateValues<string>(reasons);
  }

  async createOne(data: Withdrawal): Promise<void> {
    await this.dataProvider.createOne(data);
  }

  async getByUnique(unique: string | number): Promise<Withdrawal> {
    return await this.dataProvider.getByUnique(unique);
  }

  async deleteByUnique(unique: string | number): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }

  async updateOne(data: Withdrawal): Promise<void> {
    const { id: idToUpdate, ...rest } = data;
    await this.dataProvider.updateOne(idToUpdate!, rest);
  }
}
