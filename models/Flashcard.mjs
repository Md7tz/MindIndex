import BaseModel from "./index.mjs";
import Collection from "./Collection.mjs";
import { MAX_STRING_LENGTH } from "../config/constants.mjs";

/**
 * @class Flashcard
 * @extends BaseModel
 * @memberof Model
 * @description Represents a flashcard in the database.
 *
 * @property {Number} id               - The incremental ID of the flashcard.
 * @property {String} question         - The question of the flashcard.
 * @property {String} answer           - The answer of the flashcard.
 * @property {Date} created_at         - The timestamp of when the flashcard was created.
 * @property {Date|null} updated_at    - The timestamp of when the flashcard was last updated, or null if it has not been updated.
 * @property {Date|null} deleted_at    - The timestamp of when the flashcard was deleted, or null if it has not been deleted.
 */

export default class Flashcard extends BaseModel {
  // Table name for Flashcard objects
  static tableName = "flashcards";

  // Relations
  static get relationMappings() {
    return {
      collection: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Collection,
        join: {
          from: "flashcards.collection_id",
          to: "collections.id",
        },
      },
    };
  }

  // JSON schema for Flashcard objects
  static jsonSchema = {
    type: "object",
    required: ["question", "answer"],
    properties: {
      id: { type: "integer" },
      question: { type: "string", maxLength: MAX_STRING_LENGTH },
      answer: { type: "string", maxLength: MAX_STRING_LENGTH },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
      deleted_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}
