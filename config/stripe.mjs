import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const instance = Stripe(process.env.STRIPE_SECRET_KEY);

export default instance;
