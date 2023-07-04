import Model from "./index.mjs";
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from "../config/constants.mjs";
import User from "./User.mjs";

/**
 * @class Payment
 * @extends Model
 * @memberof Model
 * @description Represents a payment in the database.
 * 
 * @property {Number} id               - The incremental ID of the payment.
 * @property {Number} user_id          - The ID of the user who made the payment.
 * @property {String} gateway          - The payment gateway used to make the payment.
 * @property {Number} amount           - The amount of the payment.
 * @property {String} currency         - The currency of the payment.
 * @property {String} status           - The status of the payment.
 * @property {String} transaction_id   - The transaction ID of the payment.
 * @property {Date} created_at         - The timestamp of when the payment was created.
 * @property {Date|null} updated_at    - The timestamp of when the payment was last updated, or null if it has not been updated.
 * @property {Date|null} deleted_at    - The timestamp of when the payment was deleted, or null if it has not been deleted.
 */
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

  static async createPayment(session, paymentMethod) {
    try {
      let payment;

      switch (paymentMethod) {
        case "stripe":
          const { amount_total, currency, payment_status, id } = session;
          const userId = parseInt(session.metadata.userId);
          // if price is 12.00, stripe returns 1200 so we need to divide by 100
          const amount = amount_total / 100;

          await Payment.transaction(async (trx) => {
            payment = await Payment.query(trx).insert({
              user_id: userId,
              gateway: paymentMethod,
              amount,
              currency,
              status: payment_status,
              transaction_id: id,
            });
          });
          break;
        default:
          throw new Error("Invalid payment method");
      }

      return payment;
    } catch (error) {
      console.error(error);
    }
  }

  static async fulfillPayment(session, paymentMethod) {
    try {
      let payment;

      switch (paymentMethod) {
        case "stripe":
          const { id, payment_status } = session;

          await Payment.transaction(async (trx) => {
            payment = await Payment.query(trx)
              .where("transaction_id", id)
              .patch({ status: payment_status });

            if (!payment) {
              console.log("Payment not found");
            }
          });
          break;
        default:
          throw new Error("Invalid payment method");
      }

      return payment;
    } catch (error) {
      console.error(error);
    }
  }
}
