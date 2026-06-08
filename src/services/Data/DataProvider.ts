/**
 * Generic abstraction for data persistence operations.
 *
 * @template T Datasource entity type managed by the provider. (Raw type)
 * @template U The unique identifier type used to retrieve or delete an entity.
 * @template Q The query constraint type used to filter results.
 */
export default interface DataProvider<T, U, Q> {
  /**
   * Retrieves all entities matching the provided query constraints.
   *
   * @param queryConstraints Optional collection of query constraints used to filter the result set.
   * @returns A promise that resolves to an array of entities.
   */
  getAll(queryConstraints?: Q[]): Promise<T[]>;

  /**
   * Persists a new entity.
   *
   * @param data The entity to create.
   * @returns A promise that resolves when the entity has been created.
   */
  createOne(data: T): Promise<void>;

  /**
   * Retrieves a single entity using its unique identifier.
   *
   * @param unique The unique identifier of the entity.
   * @returns A promise that resolves to the matching entity.
   * @throws If no entity matching the identifier can be found.
   */
  getByUnique(unique: U): Promise<T>;

  /**
   * Deletes an entity using its unique identifier.
   *
   * @param unique The unique identifier of the entity to delete.
   * @returns A promise that resolves when the entity has been deleted.
   */
  deleteByUnique(unique: U): Promise<void>;

  /**
   * Updates an existing entity.
   *
   * @param id The identifier of the entity to update.
   * @param data The updated entity data.
   * @returns A promise that resolves when the update is complete.
   */
  updateOne(id: string, data: T): Promise<void>;
}
