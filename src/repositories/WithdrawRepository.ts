import { orderBy, QueryConstraint } from 'firebase/firestore';
import type DataProvider from '../services/Data/DataProvider';
import FirestoreDataProvider from '../services/Data/FirestoreDataProvider';
import type { Withdrawal } from '../type/AppType';
import { rows } from '../utils/Const';
import { withdrawalDataMapper } from '../utils/dataMappers';
import type BaseRepository from './BaseRepository';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class WithdrawRepository implements BaseRepository<
  Withdrawal,
  string
> {
  private readonly dataProvider: DataProvider<Withdrawal, string>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<Withdrawal>();
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
    this.dataProvider.createOne(data);
  }

  // MOCK NOW, SOLVE LATER
  async getByUnique(unique: string): Promise<Withdrawal> {
    console.log(unique);
    await delay(2000);
    return rows[0];
  }

  async deleteByUnique(unique: string): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }
  /*async updateOne(data: Withdrawal): Promise<Withdrawal> {} */
}
