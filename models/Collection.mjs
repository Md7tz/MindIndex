import Model from "./index.mjs";
import Flashcard from "./Flashcard.mjs";
import User from "./User.mjs";
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from "../config/constants.mjs";

/**
 * @class Collection
 * @extends Model
 * @memberof Model
 * @description Represents a collection in the database.
 *
 * @property {Number} id               - The incremental ID of the collection.
 * @property {Number} user_id          - The ID of the user who owns the collection.
 * @property {String} name             - The name of the collection.
 * @property {String} description      - The description of the collection.
 * @property {Date} created_at         - The timestamp of when the collection was created.
 * @property {Date|null} updated_at    - The timestamp of when the collection was last updated, or null if it has not been updated.
 * @property {Date|null} deleted_at    - The timestamp of when the collection was deleted, or null if it has not been deleted.
 * @property {String|null} full_text    - The ts_vector column for full-text search.
 */

export default class Collection extends Model {
  // Table name for Collection objects
  static tableName = "collections";

  // JSON schema for Collection model
  static jsonSchema = {
    type: "object",
    required: ["user_id", "name", "description"],
    properties: {
      id: { type: "integer" },
      user_id: { type: "integer" },
      name: { type: "string", maxLength: MAX_STRING_LENGTH },
      description: { type: "string", maxLength: MAX_TEXT_LENGTH },
      created_at: { type: "string" },
      updated_at: { type: ["string", "null"] },
      deleted_at: { type: ["string", "null"] },
    },
  };

  // Relations
  static get relationMappings() {
    return {
      flashcards: {
        relation: Model.HasManyRelation,
        modelClass: Flashcard,
        join: {
          from: "collections.id",
          to: "flashcards.collection_id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "collections.user_id",
          to: "users.id",
        },
      },
    };
  }

  // Custom query method for full-text search
  static async search(query, page = 1, pagesize = 9) {
    const fuzzyQuery = query ? `${query}:*` : "";
    if (fuzzyQuery.trim() === "") {
      // Query is empty, retrieve data without filtering
      const query = await this.query()
        .whereNotDeleted()
        .page(page - 1, pagesize);

      const count = await this.query()
        .whereNotDeleted()
        .count();

      const totalNonDeletedItems = count[0].count;

      return {
        results: query.results,
        total: totalNonDeletedItems,
      };
    }

    const resultsQuery = await this.query()
      .whereNotDeleted()
      .whereRaw(`full_text @@ to_tsquery(?)`, [fuzzyQuery])
      .page(page - 1, pagesize);

    const countQuery = await this.query()
      .whereNotDeleted()
      .whereRaw(`full_text @@ to_tsquery(?)`, [fuzzyQuery])
      .count();

    const totalNonDeletedItems = countQuery[0].count;

    return {
      results: resultsQuery.results,
      total: totalNonDeletedItems,
    };
  }


}
