import React, { useEffect, useState } from "react";
import GiftCardTable from "./section/giftCardTable";
import GifyTableLayout from "./section/gify";
import PaymentTable from "./section/paymentTable";
import CouponTable from "./section/coupon";
import { couponBookService } from "../../../services/apiServices/apiService";

const Index = () => {
	const clientSecret = new URLSearchParams(window.location.search).get("admin");
	let validate = "199972f3f50e4d62908a4061b5ec126aeaf2";

	const [state, setState] = useState({
		amount: null,
		coupon: null,
		coupontype: "fixed",
	});

	const [couponData, setCouponData] = useState({});

	useEffect(() => {
		if (clientSecret && clientSecret === validate) {
			return;
		} else {
			window.location.href = "https://thepreview.pro/LaMexicana/";
		}
	}, []);

	const inputHandler = event => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const submitHandler = () => {
		couponBookService(state).then(response => {
			setCouponData(response.data.data);
			alert("Coupon has been added successfully");
		});
	};

	return (
		<div className='container my-5 mx-auto'>
			<div className='row'>
				{/* <div className='col-12 card mb-5 p-3 shadow'>
					<h3>Gift Card</h3>
					<GifyTableLayout />
				</div> */}

				<div className='col-12 mb-5 card p-3 shadow'>
					<h3>Bookings</h3>
					<GiftCardTable />
				</div>

				<div className='col-12 card mb-5 p-3 shadow'>
					<h3>payment</h3>
					<PaymentTable />
				</div>

				<div className='col-12 card mb-5 p-3 shadow'>
					<h3>Create Discount Coupon</h3>

					<div className='row align-items-end'>
						<div className='col-4'>
							<label for='' className='fw-bold'>
								Coupon code
							</label>
							<input
								onChange={event => inputHandler(event)}
								name='coupon'
								type='text'
								className='form-control'
							/>
						</div>
						<div className='col-4'>
							<label for='' className='fw-bold'>
								Amount / Percent
							</label>
							<input
								onChange={event => inputHandler(event)}
								name='amount'
								type='number'
								className='form-control'
							/>
						</div>

						<div className='col-4'>
							<label for='' className='fw-bold'>
								Coupon Type
							</label>
							<select
								onChange={event => inputHandler(event)}
								name='coupontype'
								id=''
								className='form-control form-select'>
								<option value='Fixed'>fix ammount</option>
								<option value='Percentage'>
									percentage (amount should be less then 100)
								</option>
							</select>
						</div>
						<div className='col-4 mt-4'>
							<button onClick={submitHandler} className='btn btn-primary'>
								Create Coupon
							</button>
						</div>
					</div>
				</div>

				<div className='col-12 card mb-5 p-3 shadow'>
					<h3>Used Coupon</h3>
					<CouponTable data={couponData} />
				</div>
			</div>
		</div>
	);
};

export default Index;
