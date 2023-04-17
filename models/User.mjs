import BaseModel from "./index.mjs";
import { MAX_STRING_LENGTH } from "../config/constants.mjs";

/**
 * @class User
 * @extends BaseModel
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

export default class User extends BaseModel {
  // Table name for User objects
  static tableName = "users";

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
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
      deleted_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

