import type { QueryConstraint } from 'firebase/firestore';
import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import { type GasEvent } from '../../type/AppType';
import { gasEventsDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';

export default class GasEventsRepository implements BaseRepository<
  GasEvent,
  string,
  QueryConstraint
> {
  private readonly dataProvider: DataProvider<
    GasEvent,
    string,
    QueryConstraint
  >;
  constructor() {
    this.dataProvider = new FirestoreDataProvider<GasEvent>(
      COLLECTIONS.gasEvents,
      gasEventsDataMapper
    );
  }
  async getAll(constraints?: QueryConstraint[]): Promise<GasEvent[]> {
    return await this.dataProvider.getAll(constraints);
  }
  async createOne(data: GasEvent): Promise<void> {
    await this.dataProvider.createOne(data);
  }
  async getByUnique(unique: string): Promise<GasEvent> {
    return await this.dataProvider.getByUnique(unique);
  }
  async deleteByUnique(unique: string): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }
  async updateOne(data: GasEvent): Promise<void> {
    const id = data.id;
    delete data.id;
    await this.dataProvider.updateOne(id!, data);
  }
}
