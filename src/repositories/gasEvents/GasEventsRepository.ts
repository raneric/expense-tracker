import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import { type GasEvent } from '../../type/AppType';
import { gasEventsDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';

export default class GasEventsRepository implements BaseRepository<
  GasEvent,
  string
> {
  private readonly dataProvider: DataProvider<GasEvent, string>;
  constructor() {
    this.dataProvider = new FirestoreDataProvider<GasEvent>(
      COLLECTIONS.gasEvents
    );
  }
  async getAll(): Promise<GasEvent[]> {
    return await this.dataProvider.getAll(gasEventsDataMapper);
  }
  async createOne(data: GasEvent): Promise<void> {
    console.log(data);
  }
  async getByUnique(unique: string): Promise<GasEvent> {
    return await this.dataProvider.getByUnique(unique, gasEventsDataMapper);
  }
  async deleteByUnique(unique: string): Promise<void> {
    console.log(unique);
  }
  async updateOne(data: GasEvent): Promise<void> {
    console.log(data);
  }
}
