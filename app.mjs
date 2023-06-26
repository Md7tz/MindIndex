import express from "express";
import next from "next";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";
import knex from "knex";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { Model } from "objection";
import PaymentController from "./controllers/Payment.mjs";

import _dbConfig from "./knexfile.js";
import swaggerDocs from "./config/swagger.mjs";

import api from "./routes/api.mjs";
import Passport from "./middlewares/Passport.mjs";

import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const upload = multer();

let dbConfig = null;

switch (process.env.NODE_ENV) {
  case 'production':
    dbConfig = _dbConfig.production;
    break;
  case 'development':
    dbConfig = _dbConfig.development;
    break;
  case 'test':
    dbConfig = _dbConfig.docker;
    break;
  default:
    throw new Error(`Unknown environment: ${NODE_ENV}`);
}

const db = knex(dbConfig);
const server = express();

// Middleware
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(upload.any());
server.use(morgan("dev"));

// Serve static files from the 'public' directory
server.use(express.static("public"));

// Stripe endpoints
server.post("/subscribe", bodyParser.json(), async (req, res) => {
  try {
    const { user } = req.body;
    const session = await stripeInstance.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: "price_1NKw9nEYJpcZy5dC7dAqMFBL",
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
    // res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

server.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("error with webhook: ", err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // Save this payment in the database, payment_status can still be 'awaiting payment'
        await PaymentController.createPayment(session);

        // Check if the order is paid
        // A delayed notification payment will have an `unpaid` status, as
        // the server is still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === "paid") {
          PaymentController.fulfillPayment(session);
          console.log("Payment fulfilled from completed checkout session");
        }

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;

        // Fulfill the purchase as the payment is successful
        PaymentController.fulfillPayment(session);
        console.log("Payment fulfilled from successful async payment");

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;

        // Send an email to the customer asking them to retry their order
        emailCustomerAboutFailedPayment(session);
        console.log("Payment failed from async payment");

        break;
      }
    }

    response.status(200).end();
  }
);

const emailCustomerAboutFailedPayment = (session) => {
  // send email to customer using session object after payment failure
  console.log("Emailing customer", session);
};

// use express.json() instead of body-parser for the rest of the api routes
server.use(express.json());

// Routers
server.use(`/api`, api);

// Serve Swagger UI at /docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handle all other routes
server.all("*", (req, res) => {
  return handle(req, res);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Bind the database instance to the Objection.js Model
Model.knex(db);
// Initialize bearer authentication
Passport.initialize();

export default server;
