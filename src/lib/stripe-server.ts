import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

export function getServerStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    // Do NOT throw at import/build time; throw only when an API actually needs Stripe.
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
  }

  if (!stripeSingleton) {
    stripeSingleton = new Stripe(secret, {
      apiVersion: "2025-08-27.basil",
      typescript: true,
    });
  }
  return stripeSingleton;
}

export default getServerStripe;
