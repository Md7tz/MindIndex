import Payment from "../models/Payment.mjs"; // Assuming you have a Payment model
import Validator from "validatorjs";
import { HTTP } from "../config/constants.mjs";

export default class PaymentController {
  // Create a new payment.
  static async createPayment(session) {
    try {
      // Extract the payment data from the request body
      const { amount_total, currency, payment_status, id } = session;
      const userId = parseInt(session.metadata.userId);

      await Payment.transaction(async (trx) => {
        const newPayment = await Payment.query(trx).insert({
          user_id: userId,
          amount: amount_total,
          currency,
          status: payment_status,
          transaction_id: id,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Update a payment by transaction ID.
  static async fulfillPayment(session) {
    try {
      // Get the transaction ID from the URL parameters
      const { id, payment_status } = session;

      await Payment.transaction(async (trx) => {
        const updatedPayment = await Payment.query(trx)
          .where("transaction_id", id)
          .patch({ status: payment_status });

        // If no Payment was found, return a 404 response
        if (!updatedPayment) {
          console.log("Payment not found");
        }
        // Return the updated Payment as JSON
        return updatedPayment;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
