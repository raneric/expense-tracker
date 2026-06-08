import type { QueryConstraint } from 'firebase/firestore';
import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import type { Saving } from '../../type/AppType';
import { savingDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';

export default class SavingRepository implements BaseRepository<
  Saving,
  string,
  QueryConstraint
> {
  private readonly dataProvider: DataProvider<Saving, string, QueryConstraint>;
  constructor() {
    this.dataProvider = new FirestoreDataProvider<Saving>(
      COLLECTIONS.saving,
      savingDataMapper
    );
  }

  async getAll(constraints?: QueryConstraint[]): Promise<Saving[]> {
    return await this.dataProvider.getAll(constraints);
  }
  async createOne(data: Saving): Promise<void> {
    await this.dataProvider.createOne(data);
  }
  async getByUnique(unique: string): Promise<Saving> {
    return await this.dataProvider.getByUnique(unique);
  }
  async deleteByUnique(unique: string): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }
  async updateOne(data: Saving): Promise<void> {
    await this.dataProvider.updateOne(data.id, data);
  }
}
