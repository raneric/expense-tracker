import {
  getDocs,
  query,
  type CollectionReference,
  type DocumentData,
  type Query,
  type QueryConstraint,
} from 'firebase/firestore';
import type DataProvider from './DataProvider';
import { rows } from '../../utils/Const';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class MockDataProvider<
  Withdrawal,
  string,
> implements DataProvider<Withdrawal, string> {
  private collectionReference: CollectionReference<DocumentData, DocumentData>;
  constructor(
    collectionReference: CollectionReference<DocumentData, DocumentData>
  ) {
    this.collectionReference = collectionReference;
  }

  async getAll(
    dataMapper: (data: DocumentData) => Withdrawal,
    queryConstraints?: QueryConstraint[]
  ): Promise<Withdrawal[]> {
    await delay(2000);
    return rows as Withdrawal[];
  }
  async createOne(data: Withdrawal): Promise<void> {
    console.log(data);
  }
}
