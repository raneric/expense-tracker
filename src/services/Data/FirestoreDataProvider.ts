import {
  CollectionReference,
  getDocs,
  Query,
  query,
  QueryConstraint,
  type DocumentData,
} from 'firebase/firestore';
import type DataProvider from './DataProvider';

export default class FirestoreDataProvider<T, U> implements DataProvider<T, U> {
  private collectionReference: CollectionReference<DocumentData, DocumentData>;

  constructor(
    collectionReference: CollectionReference<DocumentData, DocumentData>
  ) {
    this.collectionReference = collectionReference;
  }

  async getAll(
    dataMapper: (data: DocumentData) => T,
    queryConstraints?: QueryConstraint[]
  ): Promise<T[]> {
    let dataQuery: Query<DocumentData, DocumentData>;

    if (queryConstraints) {
      dataQuery = query(query(this.collectionReference, ...queryConstraints));
    } else {
      dataQuery = query(this.collectionReference);
    }
    const data = await getDocs(dataQuery);
    return data.docs.map(dataMapper);
  }
  async createOne(data: T): Promise<void> {
    console.log(data);
  }
  /*  getByUnique: (unique: U) => Promise<T>;
 
  deleteByUnique: (unique: U) => Promise<void>;
  updateOne: (data: T) => Promise<T>;*/
}
