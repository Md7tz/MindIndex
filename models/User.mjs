import bcrypt from "bcrypt";
import Model from "./index.mjs";
import Profile from "./Profile.mjs";
import Collection from "./Collection.mjs";
import Note from "./Note.mjs";
import { MAX_STRING_LENGTH } from "../config/constants.mjs";

/**
 * @class User
 * @extends Model
 * @memberof Model
 * @description Represents a user in the database.
 *
 * @property {Number} id               - The incremental ID of the user.
 * @property {String} username         - The username of the user.
 * @property {String} password         - The password of the user.
 * @property {String} email            - The email of the user.
 * @property {String} fullname         - The full name of the user.
 * @property {Date} created_at         - The timestamp of when the user was created.
 * @property {Date|null} updated_at    - The timestamp of when the user was last updated, or null if it has not been updated.
 * @property {Date|null} deleted_at    - The timestamp of when the user was deleted, or null if it has not been deleted.
 */

export default class User extends Model {
  // Table name for User objects
  static tableName = "users";

  static get hidden() {
    return ["password"];
  }

  // Relations
  static get relationMappings() {
    return {
      profiles: {
        relation: Model.HasOneRelation,
        modelClass: Profile,
        join: {
          from: "users.id",
          to: "profiles.user_id",
        },
      },
      collections: {
        relation: Model.HasManyRelation,
        modelClass: Collection,
        join: {
          from: "users.id",
          to: "collections.user_id",
        },
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: Note,
        join: {
          from: "users.id",
          to: "notes.user_id",
        },
      },
    };
  }

  // JSON schema for User objects
  static jsonSchema = {
    type: "object",
    required: ["username", "password", "email", "fullname"],
    properties: {
      id: { type: "integer" },
      username: { type: "string", maxLength: MAX_STRING_LENGTH },
      password: { type: "string", maxLength: MAX_STRING_LENGTH },
      email: { type: "string", maxLength: MAX_STRING_LENGTH },
      fullname: { type: "string", maxLength: MAX_STRING_LENGTH },
      created_at: { type: "string" },
      updated_at: { type: ["string", "null"] },
      deleted_at: { type: ["string", "null"] },
    },
  };

  // verifyPassword
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // hashPassword
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}
