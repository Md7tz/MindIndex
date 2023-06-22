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
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(upload.any());
server.use(morgan("dev"));

// Serve static files from the 'public' directory
server.use(express.static("public"));

// Routers
server.use(`/api`, api);
// -----------------------------------------------
server.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const session = await stripeInstance.checkout.sessions.create({
      customer_email: email,
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
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      case "checkout.session.completed":
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const lineItems = sessionWithLineItems.line_items;

        fulfillOrder(lineItems);
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    response.status(200).end();
  }
);

const fulfillOrder = (lineItems) => {
  console.log("Fulfilling order", lineItems);
};
// -----------------------------------------------

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
