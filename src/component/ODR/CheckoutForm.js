import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import './CheckoutForm.css';
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

import CheckoutForm1 from './CheckoutForm1'
import { url, STRIPE_KEY } from '../../environment'
import Box from "@mui/material/Box";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 327,
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 5,
};
const CheckoutForm = ({ total, openModal }) => {

    const stripe = useStripe();

    const elements = useElements();
    const [loading, setLoading] = React.useState(false);
    const [Refresh, setRefresh] = useState(0);

    const stripePromise = loadStripe(
        'pk_test_51PFsNB08ZDzoXpLEzP4uFGQ9hdOrLtTgmdXDOgLvMjWdYCV8Z8EGheRcZjtzXgltIQ51OiMLdozUuc8QCfaL11Vk003pbrL8J9'
    );
    const [clientSecret, setClientSecret] = useState('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
    const [payStripe, setPayStripe] = useState(false);
    // const [total, setTotal] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');
    let elementsStripe;


    const handlepayFailed = () => {

    };

    const handlePaymentIntent = async (e) => {
        e.preventDefault()
        handleOpenPay()
        const response = await fetch(`http://54.179.193.192:8000/api/payment/intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: Number(total.split('.')[0]),
                currency: "usd",
                country: "UK",
            }),
        });
        const result = await response.json();

        if (result.success) {
            const { clientSecret } = result.body;
            setClientSecret(clientSecret);
            const stripe = await loadStripe("pk_test_51PFsNB08ZDzoXpLEzP4uFGQ9hdOrLtTgmdXDOgLvMjWdYCV8Z8EGheRcZjtzXgltIQ51OiMLdozUuc8QCfaL11Vk003pbrL8J9");

            const appearance = {
                theme: "flat",
            };

            elementsStripe = stripe.elements({ appearance, clientSecret });

            const paymentElementOptions = {
                layout: "tabs",
            };

            const paymentElement = elementsStripe.create(
                "payment",
                paymentElementOptions
            );
            // console.log(clientSecret);
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setPaymentProcessing(false);
        } else {
            setPaymentSucceeded(true);
            setPaymentProcessing(false)
            setErrorMessage('');;
        }
    };
    const handleOpenPay = () => setPayStripe(true);
    const handleClosePay = (e) => {
        setPayStripe(false); debugger
        if (e == 'success') {
            openModal()
        }

    };


    return (
        <form onSubmit={handlePaymentIntent} className="form-container">
            {/* <div className="card-element">
                <CardElement />
            </div> */}
            <Modal
                open={payStripe}
                onClose={() => {
                    handleClosePay();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : clientSecret ? (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm1
                                handlepayFailed={handlepayFailed}
                                handleClose={handleClosePay}
                            />
                        </Elements>
                    ) : null}
                </Box>
            </Modal>
            <button
                type="submit"
                // onClick={handleSubmit}
                disabled={!stripe || paymentProcessing || paymentSucceeded}
                // disabled={isLoading || cartItem.length === 0}
                className="bg-primaryPurple w-full p-3 rounded-xl text-white font-semibold text-base disabled:opacity-50 h-12 flex justify-center items-center hover:opacity-90">
                {paymentProcessing ? 'Processing...' : `Pay ${total ? total : 0}`}
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {paymentSucceeded && <div className="success-message">Payment Successful!</div>}
        </form>
    );
};

export default CheckoutForm;
