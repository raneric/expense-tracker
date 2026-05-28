import { orderBy, type QueryConstraint } from 'firebase/firestore';
import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import type { Withdrawal } from '../../type/AppType';
import { withdrawalDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class WithdrawRepository implements BaseRepository<
  Withdrawal,
  string
> {
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

  async createOne(data: Withdrawal): Promise<void> {
    await this.dataProvider.createOne(data);
  }

  // MOCK NOW, IMPLEMENT LATER
  async getByUnique(unique: string): Promise<Withdrawal> {
    console.log(unique);
    await delay(2000);
    throw new Error('getByUnique from WithdrawRepository not yet implemented');
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
