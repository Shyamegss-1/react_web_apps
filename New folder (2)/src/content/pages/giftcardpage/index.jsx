import React, { useState, useEffect, useRef } from "react";
import Form from "./section/form";
import Checkout from "./section/checkout";
import {
	giftCardService,
	createPaymentChuck,
} from "../../../services/apiServices/apiService";

const Index = () => {
	const localDB = "6723233";

	let localData = JSON.parse(localStorage.getItem(localDB));

	const [clpi, setClpi] = useState("");

	const oneRef = useRef(false);

	const [state, setState] = useState({
		amount: "",
		to: "",
		senderemail: "",
		from: "",
		youremail: "",
		discountCode: "",
		Message: "",
	});

	const clientSecret = new URLSearchParams(window.location.search).get(
		"redirect_status"
	);

	useEffect(() => {
		const toast = document.getElementsByClassName("toast")[0];

		let time;
		if (oneRef.current === false) {
			oneRef.current = true;
			if (clientSecret === "succeeded") {
				giftCardService({ ...localData })
					.then(e => {
						if (e.status === 201) {
							createPaymentChuck({
								createchuk: true,
								email: localData.youremail,
								amount: localData.amount.trim(),
								clientpi: localData.orderid,
								status: clientSecret,
							}).then(async y => {
								time = 5000;
								if (y.status === 200 || y.status === 201) {
									localStorage.removeItem(localDB);
									toast.style.display = "block";
									toast.classList.remove("text-bg-danger");
									toast.classList.add("text-bg-success");
									document.getElementsByClassName("toast-body")[0].innerHTML =
										"Gift card Sent successfully";
								}

								setTimeout(() => {
									window.location.href =
										"https://thewpwebsites.com/Consuela-Clean-Palm/gift-card/";
								}, 4000);
							});
						}
					})
					.catch(err => {
						if (err.data.err.includes("isEmail")) {
							toast.classList.remove("text-bg-success");
							toast.classList.add("text-bg-danger");
							time = 5000;
							toast.style.display = "block";
						}
					});
			} else if (clientSecret !== null && clientSecret !== "succeeded") {
				document.getElementsByClassName("toast")[0].style.display = "block";
			}
		}

		setTimeout(() => {
			toast.style.display = "none";
		}, time || 6000);
	}, []);

	const inputHandler = e => {
		setState({
			...state,
			[e.target.name]: e.target.value.includes("$")
				? e.target.value.slice(1)
				: e.target.value,
		});
	};

	const submitHandler = () => {
		const allValuesFilled = Object.values(state).every(value => value !== "");
		let primaryButton = document.getElementById("submit");

		if (allValuesFilled) {
			Object.keys(state).forEach(key => {
				document.getElementById(key).style.border = "1px solid #dee2e6";
			});

			localStorage.setItem(
				localDB,
				JSON.stringify({ ...state, orderid: clpi })
			);

			primaryButton.click();
		} else {
			Object.entries(state).forEach(([key, value]) => {
				if (value === "") {
					document.getElementById(key).style.border = "1px solid red";
				}
			});
		}
	};

	const toasthandler = () => {
		document.getElementsByClassName("toast")[0].style.display = "none";
	};

	return (
		<>
			<div
				className='toast align-items-center text-bg-danger border-0 position-fixed'
				role='alert'
				aria-live='assertive'
				aria-atomic='true'
				style={{ top: "15px", right: "15px" }}>
				<div className='d-flex'>
					<div className='toast-body'>Payment Failed !! try again</div>
					<button
						onClick={() => toasthandler()}
						type='button'
						className='btn-close btn-close-white me-2 m-auto'
						data-bs-dismiss='toast'
						aria-label='Close'></button>
				</div>
			</div>

			<div
				className='container my-5 px-5 rounded pt-5'
				style={{
					background: "url(https://spruse.launch27.com/images/darkbg.png)",
				}}>
				<div className='row'>
					<div className='col-md-12 py-4'>
						<h4
							className='d-flex flex-row fs-3'
							style={{ whiteSpace: "nowrap" }}>
							Gift Card <hr className='ms-3 w-100' />
						</h4>
					</div>

					<Form
						state={state}
						handler={inputHandler}
						Fields={Fields}
						Options={Options}
					/>

					<div className='col-md-5 pe-md-5'>
						<div
							className='card p-4 me-md-5'
							style={{
								boxShadow:
									"rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
							}}>
							<div className='d-flex justify-content-between pt-2 mb-4'>
								<div className='fw-bold'>Consuela</div>
								<div className='fw-bold'>
									$ {state.amount === "" ? "0" : state.amount}
								</div>
							</div>

							<div className='row justify-content-end align-items-end flex-column'>
								<div className='message col-7 mb-3 fw-bold'>
									Dear{" "}
									<span>{state.to === "" ? "Recipient name" : state.to}</span>,
								</div>

								<div className='message col-7 mb-4'>
									<p>{state.Message === "" ? "Your message" : state.Message}</p>
								</div>

								<div className='message col-12'>
									<p className='fw-bold'>
										Code: <span>XXXX-XXXX-XXXX</span>
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12 py-4'>
						<h4
							className='d-flex flex-row fs-3'
							style={{ whiteSpace: "nowrap" }}>
							Checkout <hr className='ms-3 w-100' />
						</h4>
					</div>

					<Checkout
						setClpi={setClpi}
						checkoutHandler={submitHandler}
						state={state}
					/>
				</div>
			</div>
		</>
	);
};

export default Index;

const Fields = [
	{ title: "To *", id: 1, type: "text", name: "to" },
	{ title: "Recipient Email *", id: 2, type: "email", name: "senderemail" },
	{ title: "From *", id: 3, type: "text", name: "from" },
	{ title: "Your Email *", id: 4, type: "email", name: "youremail" },
	{ title: "Discount Code", id: 6, type: "text", name: "discountCode" },
];

const Options = [
	{ id: 1, amount: "$ 100" },
	{ id: 2, amount: "$ 150" },
	{ id: 3, amount: "$ 200" },
	{ id: 4, amount: "$ 250" },
	{ id: 5, amount: "$ 300" },
	{ id: 6, amount: "$ 350" },
	{ id: 7, amount: "$ 400" },
	{ id: 8, amount: "$ 450" },
	{ id: 9, amount: "$ 500" },
	{ id: 10, amount: "$ 550" },
	{ id: 11, amount: "$ 600" },
	{ id: 12, amount: "$ 600" },
	{ id: 13, amount: "$ 800" },
	{ id: 14, amount: "$ 1000" },
	{ id: 15, amount: "$ 1500 " },
];
