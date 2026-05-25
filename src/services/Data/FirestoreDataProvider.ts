import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Query,
  query,
  QueryConstraint,
  updateDoc,
  type DocumentData,
  type WithFieldValue,
} from 'firebase/firestore';
import { firestoreDb } from '../../config/firebase';
import type DataProvider from './DataProvider';
export default class FirestoreDataProvider<
  T extends WithFieldValue<DocumentData>
> implements DataProvider<T, string>
{
  private docsCollection: string;

  constructor(docsCollection: string) {
    this.docsCollection = docsCollection;
  }

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
    await addDoc(this.getCollectionReference(), data);
  }

  async getByUnique(
    id: string,
    dataMapper: (data: DocumentData) => T
  ): Promise<T> {
    const result = await getDoc(this.getDocReference(id));
    return dataMapper(result);
  }

  async deleteByUnique(id: string): Promise<void> {
    await deleteDoc(this.getDocReference(id));
  }

  async updateOne(id: string, data: T): Promise<void> {
    await updateDoc(this.getDocReference(id), data);
  }
  private getCollectionReference() {
    return collection(firestoreDb, this.docsCollection);
  }

  public getDocReference(id: string) {
    return doc(firestoreDb, this.docsCollection, id);
  }
}
