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

  // Get subscription by user ID.
  static async getSubscriptionByUserId(req, res, next) {
    try {
      const { id } = req.params;

      const subscription = await Payment.query()
        .where("user_id", id)
        .orderBy("created_at", "desc")
        .first();

      if (!subscription) {
        return res
          .status(HTTP.NOT_FOUND)
          .json({ message: "This user is not subscribed" });
      }

      const subscriptionDate = subscription.updated_at
        ? subscription.updated_at
        : subscription.created_at;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const isWithinThirtyDays = subscriptionDate > thirtyDaysAgo;

      if (subscription.status !== "paid" || !isWithinThirtyDays) {
        return res
          .status(HTTP.NOT_FOUND)
          .json({ message: "This user is not subscribed" });
      }

      return res.status(HTTP.OK).json({
        message: "User is subscribed.",
        metadata: {
          subscribed: true,
          subscriptionDate,
          payment_status: subscription.status,
          amount: subscription.amount,
          currency: subscription.currency,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
