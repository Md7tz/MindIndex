import BaseModel from "./index.mjs";
import Flashcard from "./Flashcard.mjs";
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from "../config/constants.mjs";

/**
 * @class Collection
 * @extends BaseModel
 * @memberof Model
 * @description Represents a collection in the database.
 *
 * @property {Number} id               - The incremental ID of the collection.
 * @property {String} name             - The name of the collection.
 * @property {String} description      - The description of the collection.
 * @property {Number} collection_id    - Collection foreign key.
 * @property {Date} created_at         - The timestamp of when the collection was created.
 * @property {Date|null} updated_at    - The timestamp of when the collection was last updated, or null if it has not been updated.
 * @property {Date|null} deleted_at    - The timestamp of when the collection was deleted, or null if it has not been deleted.
 */

export default class Collection extends BaseModel {
  // Table name for Collection objects
  static tableName = "collections";

  // Relations
  static get relationMappings() {
    return {
      flashcards: {
        relation: BaseModel.HasManyRelation,
        modelClass: Flashcard,
        join: {
          from: 'collections.id',
          to: 'flashcards.collection_id'
        }
      }
    }
  };

  // JSON schema for Collection objects
  static jsonSchema = {
    type: "object",
    required: ["name", "description"],
    properties: {
      id: { type: "integer" },
      collection_id: { type: "integer" },
      name: { type: "string", maxLength: MAX_STRING_LENGTH },
      description: { type: 'text', maxLength: MAX_TEXT_LENGTH },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
      deleted_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

