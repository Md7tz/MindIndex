import Model from "./index.mjs";
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from "../config/constants.mjs";
import User from "./User.mjs";

export default class Payment extends Model {
  static tableName = "payments";

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "payments.user_id",
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "amount", "currency", "status", "transaction_id"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        amount: { type: "number" },
        currency: { type: "string", minLength: 3, maxLength: 3 },
        status: { type: "string", minLength: 1, maxLength: 20 },
        transaction_id: {
          type: "string",
          minLength: 1,
          maxLength: MAX_STRING_LENGTH,
        },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        deleted_at: { type: ["string", "null"] },
      },
    };
  }
}
