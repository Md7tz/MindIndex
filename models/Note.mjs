import Model from "./index.mjs";
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from "../config/constants.mjs";

/**
 * @class Note
 * @extends Model
 * @memberof Model
 * @description Represents a note in the database.
 *
 * @property {Number} id               - The incremental ID of the note.
 * @property {String} title            - The title of the note.
 * @property {String|Text} body        - The body of the note.
 * @property {Date} created_at         - The timestamp of when the note was created.
 * @property {Date|null} updated_at    - The timestamp of when the note was last updated, or null if it has not been updated.
 * @property {Date|null} deleted_at    - The timestamp of when the note was deleted, or null if it has not been deleted.
 * @property {String|null} full_text    - The ts_vector column for full-text search.
 */
export default class Note extends Model {
  // Set the database table name for Note objects
  static tableName = "notes";

  // Define the JSON schema for Note objects
  static jsonSchema = {
    type: "object",
    required: ["title", "body"],
    properties: {
      id: { type: "integer" },
      title: { type: "string", maxLength: MAX_STRING_LENGTH },
      body: { type: "string", maxLength: MAX_TEXT_LENGTH },
      user_id: { type: "integer" },
      created_at: { type: "string" },
      updated_at: { type: ["string", "null"] },
      deleted_at: { type: ["string", "null"] },
    },
  };
  // Custom query method for full-text search
  static async search(query, page = 1, pageSize = 10) {
    const fuzzyQuery = query ? `${query}:*` : "";
    if (fuzzyQuery.trim() === "") {
      // Query is empty, retrieve data without filtering
      const allResultsQuery = await this.query()
        .whereNull("deleted_at")
        .page(page - 1, pageSize);

      const countQuery = await this.query().whereNull("deleted_at").count();

      const totalNonDeletedItems = countQuery[0].count;

      return {
        results: allResultsQuery.results,
        totalNonDeletedItems: totalNonDeletedItems,
      };
    }

    const resultsQuery = await this.query()
      .whereNull("deleted_at")
      .whereRaw(`full_text @@ to_tsquery(?)`, [fuzzyQuery])
      .page(page - 1, pageSize);

    const countQuery = await this.query()
      .whereNull("deleted_at")
      .whereRaw(`full_text @@ to_tsquery(?)`, [fuzzyQuery])
      .count();

    const totalNonDeletedItems = countQuery[0].count;

    return {
      results: resultsQuery.results,
      totalNonDeletedItems: totalNonDeletedItems,
    };
  }
}
