import React, { useEffect } from "react";
import GiftCardTable from "./section/giftCardTable";
import GifyTableLayout from "./section/gify";
import PaymentTable from "./section/paymentTable";
import CouponTable from "./section/coupon";

const Index = () => {
	const clientSecret = new URLSearchParams(window.location.search).get("admin");
	let validate = "199972f3f50e4d62908a4061b5ec126aeaf2";

	useEffect(() => {
		if (clientSecret && clientSecret === validate) {
			return;
		} else {
			window.location.href =
				"https://thetestingserver.com/Premium-Pro-Cleaners/";
		}
	}, []);

	return (
		<div className='container my-5 mx-auto'>
			<div className='row'>
				<div className='col-12 card mb-5 p-3 shadow'>
					<h3>Gift Card</h3>
					<GifyTableLayout />
				</div>

				<div className='col-12 mb-5 card p-3 shadow'>
					<h3>Bookings</h3>
					<GiftCardTable />
				</div>

				<div className='col-12 card mb-5 p-3 shadow'>
					<h3>payment</h3>
					<PaymentTable />
				</div>

				<div className='col-12 card mb-5 p-3 shadow'>
					<h3>Used Coupon</h3>
					<CouponTable />
				</div>
			</div>
		</div>
	);
};

export default Index;
