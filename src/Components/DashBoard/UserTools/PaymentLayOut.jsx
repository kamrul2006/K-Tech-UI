import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./Payment";

// Replace this with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_stripe);

function PaymentLayOut() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentPage />
        </Elements>
    );
}

export default PaymentLayOut;
