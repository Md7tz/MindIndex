import Model from "./index.mjs";
import User from "./User.mjs";
import { MAX_STRING_LENGTH } from "../config/constants.mjs";

/**
 * @class Profile
 * @extends Model
 * @memberof Model
 * @description Represents a profile in the database.
 *
 * @typedef {Object} Profile
 * @property {number} id            - The unique identifier of the profile.
 * @property {string} bio           - A short biography of the user.
 * @property {string} avatar_url    - The URL of the profile's avatar image.
 * @property {string} address       - The profile's address.
 * @property {string} birth_date    - The user's birth date.
 * @property {string} gender        - The user's gender. Maximum length is 1 character (M or F).
 * @property {string} occupation    - The user's occupation.
 * @property {string} interests     - The user's interests.
 * @property {string} created_at    - The timestamp when the profile record was created.
 * @property {string} updated_at    - The timestamp when the profile record was last updated.
 * @property {string} deleted_at    - The timestamp when the profile record was soft-deleted.
 */

export default class Profile extends Model {
  // Table name for Profile objects
  static tableName = "profiles";

  // Relation mappings for Profile objects
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "profiles.user_id",
          to: "users.id",
        },
      },
    };
  }

  // JSON schema for profile objects
  static jsonSchema = {
    type: "object",
    required: [],
    properties: {
      id: { type: "integer" },
      bio: { type: "string", maxLength: MAX_STRING_LENGTH },
      avatar_url: { type: "string", maxLength: MAX_STRING_LENGTH },
      address: { type: "string", maxLength: MAX_STRING_LENGTH },
      birth_date: { type: "string", maxLength: MAX_STRING_LENGTH },
      gender: { type: "string", maxLength: 1 },
      occupation: { type: "string", maxLength: MAX_STRING_LENGTH },
      interests: { type: "string", maxLength: MAX_STRING_LENGTH },
      created_at: { type: "string" },
      updated_at: { type: ["string", "null"] },
      deleted_at: { type: ["string", "null"] },
    },
  };
}
