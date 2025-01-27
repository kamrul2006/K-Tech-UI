import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import axiosSecure from "../../../Hooks/axiosSecure";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";
import Swal from "sweetalert2";

function PaymentPage() {
    const {id} = useParams()
    console.log(id)

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecurity = axiosSecure()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const totalPrice = 9.99


    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [trId, setTrId] = useState(null)

    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        axiosSecurity.post('/createPaymentIntent', { price: totalPrice })
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })

    }, [totalPrice, axiosSecurity])



    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null)
        setSuccess(null)
        setTrId(null)

        if (!stripe || !elements) {
            return; // Stripe.js has not loaded
        }

        const cardElement = elements.getElement(CardElement);

        // Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setError(error.message, 'hhh');
        }


        // ------confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: user.email || "anonymous",
                    name: user.displayName || "anonymous"
                }
            }
        })
        if (confirmError) {
            console.log(confirmError)
            setError(confirmError.message)
        }
        else {
            if (paymentIntent.status == 'succeeded') {
                axiosSecurity.put(`/sub`, { id })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Payment Successful.",
                                text: "Your made the subscription.",
                                icon: "success"
                            });

                            navigate('/dashboard/userHome')
                        }
                    });
                setSuccess("Payment successful!");
                setTrId(paymentIntent.id)







            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">


            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">PAYMENT</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Card Element */}
                    <div className="border border-gray-300 rounded-lg p-3">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": { color: "#aab7c4" },
                                    },
                                    invalid: { color: "#9e2146" },
                                },
                            }}
                        />

                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret}
                        className="w-full btn btn-info"
                    >
                        Pay
                    </button>


                </form>

                {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-sm text-green-500 text-center mt-2">{success}</p>}
                {trId && <p className="text-sm text-blue-500 text-center mt-2">Your Transaction ID: {trId}</p>}

            </div>
        </div>
    );
}

export default PaymentPage;
