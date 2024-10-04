import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import "./index.css";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_SECRET);

export default function StripPaymentInitate({ setL, setClpi, amount, state }) {
	const [clientSecret, setClientSecret] = useState("");
	const [data, setData] = useState("");

	const ref = useRef(false);

	useEffect(() => {
		if (ref.current === false) {
			ref.current = true;
			fetch(
				"https://premium-pro-cleaner.vercel.app/api/v1/payment/ini-fioccc",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: state.fname,
						email: state.email,
						amount: amount,
					}),
				}
			)
				.then(res => res.json())
				.then(data => {
					setData({
						amount: data.clientData.amount,
						address: data.clientData.amount,
						clientSecret: data.clientData.client_secret,
					});

					setClpi(data.clientSecret);
					setClientSecret(data.clientSecret);
				});
		}
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className='App fixxx'>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm
						pppp={state}
						setL={setL}
						clientSecret={clientSecret}
						clientData={data}
					/>
				</Elements>
			)}
		</div>
	);
}
