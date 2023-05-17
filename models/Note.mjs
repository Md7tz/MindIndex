import Model from './index.mjs';
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from '../config/constants.mjs';

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
 */
export default class Note extends Model {
  // Set the database table name for Note objects
  static tableName = 'notes';

  // Define the JSON schema for Note objects
  static jsonSchema = {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string', maxLength: MAX_STRING_LENGTH },
      body: { type: 'string', maxLength: MAX_TEXT_LENGTH },
      created_at: { type: 'string' },
      updated_at: { type: ['string', 'null'] },
      deleted_at: { type: ['string', 'null'] },
    },
  };
}
