import React, { useState } from "react";
import StripPaymentInitate from "../../../stripe";

const Checkout = ({ checkoutHandler, state, setClpi }) => {
	const [l, setL] = useState(false);
	const allValuesFilled = Object.values(state).every(value => value !== "");

	const clientSecret = new URLSearchParams(window.location.search).get(
		"redirect_status"
	);

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isValidEmail = emailPattern.test(state.youremail);
	const isValidEmail2 = emailPattern.test(state.senderemail);

	return (
		<div className='col-12 py-4 px-md-5'>
			<div className='mb-3'>
				<img
					className='d-md-block d-none'
					src='https://spruse.launch27.com/images/cards.png'
					alt='card'
				/>
				<img
					className='d-md-none d-blocks w-100'
					src='https://spruse.launch27.com/images/cards.png'
					alt='card'
				/>
			</div>

			<div>
				{(allValuesFilled || clientSecret) && (
					<StripPaymentInitate setClpi={setClpi} setL={setL} state={state} />
				)}
			</div>

			<div className='mb-md-5 mb-4'>
				I authorize Premium Pro Cleaners to charge my credit card above for
				agreed upon purchases.
			</div>

			{isValidEmail ||
				(isValidEmail2 && (
					<p style={{ color: "red", marginBottom: "30px" }}>
						Please Enter the Valid email
					</p>
				))}
			<div className='row'>
				<div className='col-md-2 col-12 mb-md-0 mb-3'>
					<button
						onClick={() => checkoutHandler()}
						type='button'
						id='submit'
						disabled={!isValidEmail || !isValidEmail2}
						className='rounded-pill px-4 btn btn-success btn-lg p-2'>
						<span id='button-text'>
							{l ? <div className='spinner' id='spinner'></div> : "Pay now"}
						</span>
					</button>
				</div>
				<div className='col-md-2 col-8'>
					<button
						className='rounded-pill px-4 btn fw-bolder btn-lg pe-none'
						style={{ background: "#00000026" }}>
						FINAL PRICE
					</button>
				</div>
				<div className='col-md-2 col-4'>
					<button
						className='rounded-pill px-4 btn fw-bolder btn-lg pe-none'
						style={{ background: "#00000026" }}>
						$
						{state.amount === ""
							? "0.00"
							: Number(state.amount.trim()).toFixed(2)}
					</button>
				</div>
			</div>

			<div></div>
		</div>
	);
};

export default Checkout;
