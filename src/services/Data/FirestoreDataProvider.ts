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
import type { DataMapper } from '../../type/AppType';

/**
 * Firestore implementation of the {@link DataProvider} contract.
 *
 * Provides generic CRUD operations for a Firestore collection and
 * delegates document-to-entity transformation to the supplied data mapper.
 *
 * @template T The entity type stored in the Firestore collection.
 */
export default class FirestoreDataProvider<
  T extends WithFieldValue<DocumentData>,
> implements DataProvider<T, QueryConstraint> {
  private readonly docsCollection: string;
  private readonly dataMapper: DataMapper<DocumentData, T>;

  /**
   * Creates a new Firestore data provider.
   *
   * @param docsCollection The Firestore collection name used for persistence.
   * @param dataMapper Function responsible for mapping Firestore documents to domain entities.
   */
  constructor(docsCollection: string, dataMapper: DataMapper<DocumentData, T>) {
    this.docsCollection = docsCollection;
    this.dataMapper = dataMapper;
  }

  /**
   * Retrieves all documents from the collection that match the provided query constraints.
   *
   * @param queryConstraints Optional Firestore query constraints used to filter results.
   * @returns A promise that resolves to an array of mapped entities.
   */
  async getAll(queryConstraints?: QueryConstraint[]): Promise<T[]> {
    let dataQuery: Query<DocumentData, DocumentData>;

    if (queryConstraints) {
      dataQuery = query(
        query(this.getCollectionReference(), ...queryConstraints)
      );
    } else {
      dataQuery = query(this.getCollectionReference());
    }

    const data = await getDocs(dataQuery);

    return data.docs.map(this.dataMapper);
  }

  /**
   * Creates a new document in the collection.
   *
   * @param data The entity data to persist.
   * @returns A promise that resolves when the document has been created.
   */
  async createOne(data: T): Promise<void> {
    await addDoc(this.getCollectionReference(), data);
  }

  /**
   * Retrieves a document by its unique identifier.
   *
   * @param id The Firestore document identifier.
   * @returns A promise that resolves to the mapped entity.
   * @throws If the document does not exist or cannot be mapped.
   */
  async getByUnique(id: string): Promise<T> {
    const result = await getDoc(this.getDocReference(id));
    return this.dataMapper(result);
  }

  /**
   * Deletes a document by its unique identifier.
   *
   * @param id The Firestore document identifier.
   * @returns A promise that resolves when the document has been deleted.
   */
  async deleteByUnique(id: string): Promise<void> {
    await deleteDoc(this.getDocReference(id));
  }

  /**
   * Updates an existing document.
   *
   * @param id The Firestore document identifier.
   * @param data The updated entity data.
   * @returns A promise that resolves when the document update is complete.
   */
  async updateOne(id: string, data: T): Promise<void> {
    await updateDoc(this.getDocReference(id), data);
  }

  /**
   * Returns a reference to the configured Firestore collection.
   *
   * @returns The Firestore collection reference.
   */
  private getCollectionReference() {
    return collection(firestoreDb, this.docsCollection);
  }

  /**
   * Returns a reference to a specific document within the collection.
   *
   * @param id The Firestore document identifier.
   * @returns The Firestore document reference.
   */
  public getDocReference(id: string) {
    return doc(firestoreDb, this.docsCollection, id);
  }
}
