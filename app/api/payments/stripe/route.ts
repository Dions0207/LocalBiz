import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-01", // Versión actualizada
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, orderId, businessId } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency: currency.toLowerCase(),
      metadata: {
        orderId,
        businessId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      success: true,
    });
  } catch (error) {
    console.error("Stripe payment error:", error);
    return NextResponse.json(
      {
        error: "Payment processing failed",
      },
      { status: 500 }
    );
  }
}
