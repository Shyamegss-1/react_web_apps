import React, { useEffect, useState, useRef } from "react";
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { createPaymentChuck } from "../../services/apiServices/apiService";

export default function CheckoutForm({ setL, pppp, clientSecret }) {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent, data }) => {
				switch (paymentIntent.status) {
					case "succeeded":
						setMessage("Payment succeeded!");
						break;
					case "processing":
						setMessage("Your payment is processing.");
						break;
					case "requires_payment_method":
						setMessage("Your payment was not successful, please try again.");
						break;
					default:
						setMessage("Something went wrong.");
						break;
				}
			});
	}, [stripe]);

	const handleSubmit = async e => {
		e.preventDefault();

		setIsLoading(true);
		setL(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "https://thetestingserver.com/cleaner/",
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
		setL(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<form id='payment-form' onSubmit={handleSubmit}>
			<LinkAuthenticationElement
				id='link-authentication-element'
				onChange={e => setEmail(e.target.value)}
			/>

			<PaymentElement id='payment-element' options={paymentElementOptions} />

			<button
				className='pyyy'
				disabled={isLoading || !stripe || !elements}
				id='submit'
				style={{ display: "none" }}>
				<span id='button-text'>
					{isLoading ? <div className='spinner' id='spinner'></div> : "Pay now"}
				</span>
			</button>

			{message && <div id='payment-message'>{message}</div>}
		</form>
	);
}
