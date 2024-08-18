import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 327,
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 5,
};
export default function CheckoutForm({ handlepayFailed, handleClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://rubypets.co.uk/checkOut",
        },
        redirect: "if_required",
      });


      if (error) {

        setIsLoading(false);

      }
      else if (paymentIntent && paymentIntent.status === "succeeded") {

        handleClose('success')
        setIsLoading(false);



      } else {

        handlepayFailed()
        setIsLoading(false);

      }
    } catch (error) {

      setIsLoading(false);

    }


  }

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <div className="place-order-btn1">
          <button className="bg-primaryPurple w-full p-3 mt-4 rounded-xl text-white font-semibold text-base disabled:opacity-50 h-12 flex justify-center items-center hover:opacity-90" disabled={isLoading || !stripe || !elements} id="submit">

            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
            </span>
          </button>
        </div>
        {
        }
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>

  )
}
