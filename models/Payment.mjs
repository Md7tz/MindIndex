import Model from "./index.mjs";
import { MAX_STRING_LENGTH, MAX_TEXT_LENGTH } from "../config/constants.mjs";
import User from "./User.mjs";
import Stripe from "../config/stripe.mjs"

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

          await Payment.transaction(async (trx) => {
            payment = await Payment.query(trx).insert({
              user_id: userId,
              amount: amount_total,
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
              .patchAndFetch({ status: payment_status });

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
