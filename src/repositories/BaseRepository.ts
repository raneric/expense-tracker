/**
 * Generic base repository contract for CRUD operations which interact with {@link DataProvider}.
 *
 * @template T Application data model model type.
 * @template U Unique identifier type used to locate a single entity.
 * @template Q Query constraint/filter type used when retrieving collections.
 */
export default interface BaseRepository<T, U, Q> {
  /**
   * Retrieves all entities that match the provided constraints.
   *
   * @param constraints Optional list of query constraints or filters.
   * @returns A promise that resolves to an array of matching entities.
   */
  getAll: (constraints?: Q[]) => Promise<T[]>;

  /**
   * Creates a new entity.
   *
   * @param data Entity data to create.
   * @returns A promise that resolves when the entity has been created.
   */
  createOne: (data: T) => Promise<void>;

  /**
   * Retrieves a single entity by its unique identifier.
   *
   * @param unique Unique identifier of the entity.
   * @returns A promise that resolves to the matching entity.
   */
  getByUnique: (unique: U) => Promise<T>;

  /**
   * Deletes an entity by its unique identifier.
   *
   * @param unique Unique identifier of the entity to delete.
   * @returns A promise that resolves when the entity has been deleted.
   */
  deleteByUnique: (unique: U) => Promise<void>;

  /**
   * Updates an existing entity.
   *
   * @param data Updated entity data.
   * @returns A promise that resolves when the entity has been updated.
   */
  updateOne: (data: T) => Promise<void>;
}
