import Payment from "../models/Payment.mjs"; // Assuming you have a Payment model
import Stripe from "../config/stripe.mjs"
import { HTTP } from "../config/constants.mjs";

export default class PaymentController {

  /**
   * @openapi
   * /api/stripe/subscribe:
   *   post:
   *     summary: Create a new Stripe subscription session.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   email:
   *                     type: string
   *     responses:
   *       '200':
   *         description: Success. Returns the URL of the Stripe checkout session.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 url:
   *                   type: string
   *       '500':
   *         description: Internal Server Error.
   */
  static async subscribeStripe(req, res) {
    try {
      const { user } = req.body;

      if (!user || !user.email) {
        // Handle the case where the user or email is missing
        throw new Error("Invalid user or email");
      }

      const session = await Stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
          {
            price: "price_1NOOKlCK0LpumkW1jZZrsbaC",
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          userId: user.id,
        },
      });

      res.json({ url: session.url });
    } catch (err) {
      console.log("error: ", err);
      res.status(err.statusCode || HTTP.INTERNAL_SERVER_ERROR).json(err.message);
    }
  }

  /**
   * @openapi
   * /api/stripe/webhook:
   *   post:
   *     summary: Handle Stripe webhook events.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       '200':
   *         description: Success. Webhook event successfully handled.
   *       '400':
   *         description: Bad Request. Error with the webhook payload or signature.
   */
  static async callbackStripe(req, res) {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    try {
      const event = Stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          // Save this payment in the database, payment_status can still be 'awaiting payment'
          await Payment.createPayment(session, "stripe");

          // Check if the order is paid
          // A delayed notification payment will have an `unpaid` status, as
          // the server is still waiting for funds to be transferred from the customer's
          // account.
          if (session.payment_status === "paid") {
            Payment.fulfillPayment(session, "stripe");
            console.log("Payment fulfilled from completed checkout session");
          }

          break;
        }

        case "checkout.session.async_payment_succeeded": {
          const session = event.data.object;

          // Fulfill the purchase as the payment is successful
          Payment.fulfillPayment(session, "stripe");
          console.log("Payment fulfilled from successful async payment");

          break;
        }

        case "checkout.session.async_payment_failed": {
          const session = event.data.object;

          console.log("Payment failed from async payment");

          break;
        }
      }

      res.status(HTTP.OK).end();
    } catch (err) {
      console.log("error with webhook: ", err);
      res.status(HTTP.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }
  }

  /**
   * @openapi
   * /api/subscription/{id}:
   *   get:
   *     summary: Get subscription details by user ID.
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         description: User ID.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Success. Returns subscription details.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 metadata:
   *                   type: object
   *                   properties:
   *                     subscribed:
   *                       type: boolean
   *                     date:
   *                       type: string
   *                       format: date-time
   *                     payment_status:
   *                       type: string
   *                     amount:
   *                       type: number
   *                     currency:
   *                       type: string
   *       '404':
   *         description: Not Found. User is not subscribed or subscription not found.
   *       '500':
   *         description: Internal Server Error.
   */
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

      if (subscription.status !== "paid") {
        return res
          .status(HTTP.NOT_FOUND)
          .json({ message: "This user is not subscribed" });
      }

      return res.status(HTTP.OK).json({
        message: "User is subscribed.",
        metadata: {
          subscribed: true,
          date: subscription.created_at,
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
