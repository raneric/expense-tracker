import {
  collection,
  doc,
  getDoc,
  getDocs,
  Query,
  query,
  QueryConstraint,
  type DocumentData,
} from 'firebase/firestore';
import { firestoreDb } from '../../config/firebase';
import type DataProvider from './DataProvider';
export default class FirestoreDataProvider<T> implements DataProvider<
  T,
  string
> {
  private static readonly docsCollection = 'withdrawals';

  async getAll(
    dataMapper: (data: DocumentData) => T,
    queryConstraints?: QueryConstraint[]
  ): Promise<T[]> {
    let dataQuery: Query<DocumentData, DocumentData>;

    if (queryConstraints) {
      dataQuery = query(
        query(this.getCollectionReference(), ...queryConstraints)
      );
    } else {
      dataQuery = query(this.getCollectionReference());
    }
    const data = await getDocs(dataQuery);
    return data.docs.map(dataMapper);
  }

  async createOne(data: T): Promise<void> {
    console.log(data);
  }

  async getByUnique(
    id: string,
    dataMapper: (data: DocumentData) => T
  ): Promise<T> {
    const result = await getDoc(this.getDocReference(id));
    const data = result.data;
    return dataMapper(data);
  }

  private getCollectionReference() {
    return collection(firestoreDb, FirestoreDataProvider.docsCollection);
  }

  public getDocReference(id: string) {
    return doc(firestoreDb, FirestoreDataProvider.docsCollection, id);
  }

  /*  
  deleteByUnique: (unique: U) => Promise<void>;
  updateOne: (data: T) => Promise<T>;*/
}
