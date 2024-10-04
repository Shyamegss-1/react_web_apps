import React, { useEffect, useRef, useState } from "react";
import RightSection from "./section/rightSection";
import Summary from "./section/summray";
import {
	selectOptions,
	CommercialOptions,
	selectAddExtras,
	CommercialAddExtras,
	OfficeAddExtras,
	OfficeOptions,
	JanitorialAddExtras,
	JanitorialOptions,
} from "../../_mock/data";
import {
	bookingService,
	createPaymentChuck,
	giftCardRedeemeService,
} from "../../../services/apiServices/apiService";
import StripPaymentInitate from "../../payment_booking";

const AlertHandler = (type, message) => {
	let div = document.getElementsByClassName("alert");

	if (type === "warning") {
		div[0].classList.remove("alert-success");
		div[0].classList.add("alert-warning");
		div[0].style.display = "block";
		div[0].innerHTML = message;
	} else if (type === "error") {
		div[0].classList.remove("alert-success");
		div[0].classList.add("alert-danger");
		div[0].style.display = "block";
		div[0].innerHTML = message;
	} else if (type === "success") {
		div[0].classList.remove("alert-danger");
		div[0].classList.remove("alert-warning");
		div[0].classList.add("alert-success");
		div[0].style.display = "block";
		div[0].innerHTML = message;
	}

	setTimeout(() => (div[0].style.display = "none"), 7000);
};

const Index = () => {
	const [state, setState] = useState("ROOMS");

	const [services, setServices] = useState([]);

	const [addons, setAddons] = useState([]);

	const [selectedAddons, setSelectedAddons] = useState([]);

	const [date, setDate] = useState("");

	const [updated, setUpdated] = useState("");

	const [coupon, setCoupon] = useState("");

	const [discountAmount, setDiscountAmount] = useState(0);

	const [process, setProcess] = useState(false);

	const [space, setSpace] = useState(0);

	const [subPrice, setSubPrices] = useState([]);

	const [clpi, setClpi] = useState("");

	const [l, setL] = useState(false);

	const [addonPrice, setAddonPrice] = useState([]);

	const [total, setTotal] = useState(0);

	const [serviceType, setServiceType] = useState("Residential Cleaning");

	const [max, setMax] = useState(0);

	const [homeservice, setHomeService] = useState(85);

	const localDB = "455156465487";

	const oneRef = useRef(false);

	const [cleaningType, setCleaningType] = useState({
		type: "One Time",
		discount: 0,
	});

	const [others, setOthers] = useState({
		termsandCondition: false,
		comment: "",
	});

	const [userData, setUserData] = useState({
		fname: "",
		lname: "",
		email: "",
		phone: "",
		address: "",
		appartment: "",
		city: "",
		state: "",
		pincode: "",
	});

	const userDataHandler = e => {
		setUserData({
			...userData,
			[e.target.id]: e.target.value,
		});
	};

	const spaceValHandler = values => {
		// let obj = {};
		let arr = [];

		values.map(e => {
			arr.push({
				id: arr.length + 1,
				ge: e.title,
				vl: e.options.map(e => e.title).pop(),
				price: e.options.map(e => e.amount).pop(),
			});
		});

		// setSpace(obj);
		setSubPrices(arr);
	};

	useEffect(() => {
		if (state === "HOME" || state === "ROOMS") {
			setServices(selectOptions);

			setAddons(selectAddExtras);

			spaceValHandler(selectOptions);
		} else if (state === "SPACE") {
			setServices(CommercialOptions);
			setAddons(CommercialAddExtras);

			spaceValHandler(CommercialOptions);
		} else if (state === "OFFICE") {
			setServices(OfficeOptions);
			setAddons(OfficeAddExtras);
			spaceValHandler(OfficeOptions);
		} else if (state === "JANITOR") {
			setServices(JanitorialOptions);
			setAddons(JanitorialAddExtras);
			spaceValHandler(JanitorialOptions);
		}
	}, [state]);

	const addOnsHandler = e => {
		if (!selectedAddons.includes(e)) {
			setSelectedAddons([...selectedAddons, e]);
		} else {
			let array = [...selectedAddons];
			const index = array.indexOf(e);

			if (index > -1) {
				array.splice(index, 1);
				setSelectedAddons(array);
			}
		}
	};

	const dateFunction = (aaaa, vla) => {
		var date = new Date(aaaa);
		date.setDate(date.getDate() + vla);
		let month = date.toString().split(" ")[1];
		let day = date.toString().split(" ")[0];

		return `${month},${date.getDate()} ${day}`;
	};

	const saveSpaceValHandler = (e, arr) => {
		setSpace({
			...space,
			[e.target.name]: e.target.value,
		});

		// if (e.target.value.toLowerCase().includes("bedroom")) {
		//   let pruc = e.target.value.split(" ")[0];

		//   if (pruc !== 1) {
		//     setPrice({ id: 1, pricing: 95 + 15 * (Number(pruc) - 1) });
		//   } else {
		//     setPrice({ id: 1, pricing: 95 });
		//   }
		// }

		let existingItem = subPrice.find(el =>
			arr.options.some(e => el.vl === e.title)
		);

		if (existingItem) {
			let ahar = arr.options.filter(v => v.title === e.target.value);
			existingItem.price = ahar[0].amount;
			existingItem.vl = ahar[0].title;
		}
	};

	const additionRequirementHandler = ea => {
		let price = [...addonPrice];

		const hasAlready = price.find(ls => ls.title === ea.title);

		if (!hasAlready) {
			price.push({ title: ea.title, amount: ea.amount });
			setAddonPrice(price);
		} else {
			let newPrice = price.filter(et => et.title !== ea.title);
			setAddonPrice(newPrice);
		}
	};

	useEffect(() => {
		let nooe = 0;
		let riri = 0;

		if (subPrice) {
			subPrice.forEach(jj => (nooe += jj.price));
		}

		if (addonPrice.length > 0) {
			addonPrice.forEach(e => (riri += e.amount));
		}

		setTotal(nooe + riri);
	}, [subPrice, additionRequirementHandler, saveSpaceValHandler, addonPrice]);

	const clientSecret = new URLSearchParams(window.location.search).get(
		"redirect_status"
	);

	useEffect(() => {
		let dd = JSON.parse(localStorage.getItem(localDB));
		if (oneRef.current === false) {
			oneRef.current = true;
			if (clientSecret === "succeeded") {
				bookingService({ ...dd })
					.then(e => {
						if (e.status === 201) {
							createPaymentChuck({
								createchuk: true,
								email: dd.email,
								amount: dd.amount.trim(),
								clientpi: dd.clientpi,
								status: clientSecret,
							})
								.then(el => {
									if (el.status === 201) {
										alert("service Booked Successfully");
										localStorage.removeItem(localDB);

										setTimeout(() => {
											window.location.href =
												"https://thewpwebsites.com/Consuela-Clean-Palm/carpet-cleaning/";
										}, 4000);
									}
								})
								.catch(err => {
									if (err) {
										alert(
											"something went wrong ! if your payment has been deducted contact us"
										);
									}
								});
						}
					})
					.catch(err => {
						console.log(err);
						if (err) {
							alert("something went wrong try again");
						}
					});
			} else if (clientSecret === "succeeded") {
				alert("failed");
			}
		}
	}, []);

	const fireSubmit = () => {
		let primaryButton = document.getElementById("submit2");

		let datas = {
			user: JSON.stringify(userData),
			email: userData.email,
			bookingDate: updated,
			servicetype: serviceType,
			additionlrequirements: JSON.stringify(addonPrice),
			reservice: JSON.stringify(cleaningType),
			discountcode: coupon,
			discount: discountAmount,
			message: others.comment,
			clientpi: clpi,
			amount: max.toFixed(2),
		};

		localStorage.setItem(localDB, JSON.stringify(datas));

		primaryButton.click();
	};

	const bookingHandler = () => {
		let isUserFill = Object.values(userData).every(tl => tl !== "");

		if (isUserFill && others.termsandCondition && date) {
			Object.entries(userData).map(([keys, values]) => {
				document.getElementById(keys).style.border = "1px solid #dee2e6";
			});

			fireSubmit();
		} else if (!isUserFill) {
			Object.entries(userData).map(([keys, values]) => {
				if (values === "") {
					document.getElementById(keys).style.border = "1px solid red";
				}
			});
			alert("Plese complete the user details");
		} else if (!others.termsandCondition) {
			alert("Accept terms and conditions");
		} else if (date === "") {
			alert("Select a date for Cleaning");
		}
	};

	const discountCouponHandler = () => {
		setProcess(true);
		let to = document.getElementById("olo").innerHTML;

		if (coupon === "") {
			alert("enter a valid coupon code");
			setProcess(false);
		} else {
			giftCardRedeemeService(coupon)
				.then(e => {
					if (e.status === 200) {
						if (Number(e.data.DiscountAmount) > Number(to)) {
							setProcess(false);
							alert(
								` Your total is less then the coupon amount . If you want to redeem this coupon add $ ${
									Number(e.data.DiscountAmount) - Number(to)
								} more`
							);
						} else {
							setDiscountAmount(e.data.DiscountAmount);
							AlertHandler("success", "Coupon code applied successfully");
						}
					}
				})
				.catch(e => {
					AlertHandler("error", e.data.message);
					setProcess(false);
				});
		}
	};

	const servicetype = new URLSearchParams(window.location.search).get(
		"service"
	);

	useEffect(() => {
		if (servicetype !== null) {
			if (servicetype === "Carpet-Cleaning-Services") {
				setState("ROOMS");
			} else if (servicetype === "Office-Cleaning") {
				setState("OFFICE");
			} else if (servicetype === "Commercial") {
				setState("SPACE");
			} else if (servicetype === "Janitorial") {
				setState("JANITOR");
			} else if (servicetype === "home") {
				setState("HOME");
			}
		}
	}, []);

	const newDateFunction = (time, val) => {
		const date = new Date(time);
		date.setDate(date.getDate() + val);

		return date.toISOString();
	};

	return (
		<>
			<div
				style={{
					width: "100%",
					margin: "auto",
					position: "relative",
				}}>
				<div
					className='alert alert-success position-fixed w-25 text-align-center'
					style={{
						left: "40%",
						zIndex: "111",
						textAlign: "center",
						display: "none",
					}}
					role='alert'>
					Please Complete the require details.
				</div>
			</div>

			<section className='form-section mt-5'>
				<div className='container position-relative'>
					<div className='row'>
						<div className='col-md-8'>
							<div className='form'>
								<div className='form-content text-center'>
									<h2>Book Now</h2>
									<p>Fill up the details and book us for cleaning services.</p>
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>SELECT SERVICE</h3>
										<select
											name='services'
											id='services'
											className='form-control form-select shadow-none'
											value={state}
											onChange={e => {
												setState(e.target.value);
												setServiceType(() =>
													e.target.value === "ROOMS"
														? "Air BnB Special Cleaning"
														: e.target.value === "SPACE"
														? "Commercial Cleaning"
														: e.target.value === "OFFICE"
														? "Office Cleaning"
														: e.target.value === "JANITOR"
														? "Janitorial service"
														: e.target.value === "HOME"
														? "Home Cleaning"
														: "Move-in/Move-Out Cleaning"
												);
											}}>
											<option value='ROOMS'>Air BnB Special Cleaning</option>
											<option value='HOME'>Home Cleaning</option>
											<option value='OFFICE'>Office Cleaning</option>
											<option value='JANITOR'>Janitorial service</option>
											<option value='SPACE'>Commercial cleaning</option>
										</select>
									</div>

									{state === "HOME" && (
										<div className='col-md-12 mt-3'>
											<select
												name='services'
												id='services'
												className='form-control form-select shadow-none'
												value={homeservice}
												onChange={e => setHomeService(e.target.value)}>
												<option value={85}>Regular</option>
												<option value={120}>Deep clean</option>
												<option value={225}>Move in/out</option>
											</select>
										</div>
									)}
								</div>

								<div className='divider-form-section'></div>

								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>
											DESCRIBE YOUR {state !== "EVENT" ? "SPACE" : "EVENT"}
										</h3>

										<div className='row'>
											{([...services] || selectOptions).map((e, index) => (
												<div className='col-md-6 my-2' key={index}>
													<select
														name={e.title.replaceAll(" ", "_")}
														id={e.title}
														onChange={el => saveSpaceValHandler(el, e)}
														className='form-control form-select shadow-none'>
														{e.options.map((e, index) => (
															<option
																selected={e.title?.split("-")[1] === "None"}
																value={e.title}
																key={index.amount}>
																{e.title}
															</option>
														))}
													</select>
												</div>
											))}
										</div>
									</div>
								</div>

								{state !== "OFFICE" && (
									<div className='divider-form-section'></div>
								)}
								<div className='row p-x'>
									<div className='col-md-12'>
										{state !== "OFFICE" && <h3>ADD EXTRAS</h3>}
										<div className='row'>
											{(addons || selectAddExtras).map((e, i) => {
												return (
													<div
														onClick={() => {
															addOnsHandler(e.title);
															additionRequirementHandler(e);
														}}
														key={i}
														className={
															"col-md-3 text-center" +
															(selectedAddons.includes(e.title)
																? " active"
																: "")
														}>
														<div className='img-box'>
															<img
																style={{ maxWidth: "55px" }}
																src={e.imagePath}
																alt=''
															/>
														</div>
														<p className='mt-2'>{e.title}</p>
													</div>
												);
											})}
										</div>
									</div>
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>SCHEDULE YOUR APPOINTMENT</h3>
										<p>
											Select the date and time you would like us to schedule
											your booking for {serviceType}. If you need a last-minute
											booking, connect with us at +1 (850) 761-4447.
										</p>
									</div>
									<div className='col-md-6'>
										<input
											type='date'
											min={new Date().toISOString().split("T")[0]}
											className='form-control'
											onChange={e => {
												// console.log(new Date(e.target.value).toISOString());
												setDate(e.target.value);
												setUpdated(
													`${newDateFunction(e.target.value, 0)} 8:00AM-10:00AM`
												);
											}}
										/>
									</div>
									<div className='col-md-6'>
										<select
											className='form-control form-select'
											name=''
											id=''
											onChange={e => setUpdated(e.target.value)}>
											{date === "" ? (
												<option value=''>--:---</option>
											) : (
												<>
													<optgroup label={dateFunction(date, 0)}>
														<option
															selected
															value={`${newDateFunction(
																date,
																0
															)} 8:00AM-10:00AM`}>
															8:00AM - 10:00AM
														</option>
														<option
															value={`${newDateFunction(
																date,
																0
															)} 10:00AM-12:00PM`}>
															10:00AM - 12:00PM
														</option>

														<option
															value={`${newDateFunction(
																date,
																0
															)} 12:00PM-2:00PM`}>
															12:00PM - 2:00PM
														</option>

														<option
															value={`${newDateFunction(
																date,
																0
															)} 2:00PM-4:00PM`}>
															2:00PM - 4:00PM
														</option>
													</optgroup>

													<optgroup label={dateFunction(date, 1)}>
														<option
															value={`${newDateFunction(
																date,
																1
															)} 8:00AM-10:00AM`}>
															8:00AM - 10:00AM
														</option>
														<option
															value={`${newDateFunction(
																date,
																1
															)} 10:00AM-12:00PM`}>
															10:00AM - 12:00PM
														</option>
														<option
															value={`${newDateFunction(
																date,
																1
															)} 12:00PM-2:00PM`}>
															12:00PM - 2:00PM
														</option>
														<option
															value={`${newDateFunction(
																date,
																1
															)} 2:00PM-4:00PM`}>
															2:00PM - 4:00PM
														</option>
													</optgroup>

													<optgroup label={dateFunction(date, 2)}>
														<option
															value={`${newDateFunction(
																date,
																2
															)} 8:00AM-10:00AM`}>
															8:00AM - 10:00AM
														</option>
														<option
															value={`${newDateFunction(
																date,
																2
															)} 10:00AM-12:00PM`}>
															10:00AM - 12:00PM
														</option>
														<option
															value={`${newDateFunction(
																date,
																2
															)} 12:00PM-2:00PM`}>
															12:00PM - 2:00PM
														</option>
														<option
															value={`${newDateFunction(
																date,
																2
															)} 2:00PM-4:00PM`}>
															2:00PM - 4:00PM
														</option>
													</optgroup>
												</>
											)}
										</select>
									</div>
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>HOW OFTEN DO YOU WANT THE SERVICE?</h3>
										<p>
											It's all about matching you with the perfect clean for
											your home. Scheduling is flexible. Cancel or reschedule
											anytime. Discounts are applied based on selection.
										</p>
									</div>
									{eerw.map(({ type, discount }) => (
										<div
											style={{ cursor: "pointer" }}
											className='col-md-3'
											onClick={() =>
												setCleaningType({
													type,
													discount,
												})
											}>
											<div
												className={
													"often-border" +
													" " +
													(type === cleaningType.type ? "offen-background" : "")
												}>
												{type}
											</div>
										</div>
									))}
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>ENTER YOUR DETAILS</h3>
										<p>
											This information will be used to contact you about your
											service.
										</p>
									</div>
									<div className='col-md-6 my-2'>
										<input
											id='fname'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='First Name*'
											className='form-control'
										/>
									</div>

									<div className='col-md-6 my-2'>
										<input
											id='lname'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='Last Name*'
											className='form-control'
										/>
									</div>
									<div className='col-md-6 my-2'>
										<input
											inputMode='email'
											id='email'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='Email*'
											className='form-control'
										/>
									</div>
									<div className='col-md-6 my-2'>
										<input
											id='phone'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='Phone*'
											className='form-control'
										/>
									</div>
									{/* </div>
											<div className="divider-form-section"></div>
											<div className="row p-x">
												<div className="col-md-12">
												<h3>ADDRESS</h3>
												<p>Where would you like us to clean?</p>
												</div> */}

									<div className='col-md-8 my-2'>
										<input
											id='address'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='Address*'
											className='form-control'
										/>
									</div>
									<div className='col-md-4 my-2'>
										<input
											id='appartment'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='Apt/Suite #'
											className='form-control'
										/>
									</div>
									<div className='col-md-6 my-2'>
										<input
											id='city'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='City*'
											className='form-control'
										/>
									</div>
									<div className='col-md-3 my-2'>
										<select
											id='state'
											onChange={e => userDataHandler(e)}
											className='form-control form-select'>
											<option value='' selected='selected'>
												State*
											</option>
											<option value='AK'>AK</option>
											<option value='AL'>AL</option>
											<option value='AR'>AR</option>
											<option value='AZ'>AZ</option>
											<option value='CA'>CA</option>
											<option value='CO'>CO</option>
											<option value='CT'>CT</option>
											<option value='DC'>DC</option>
											<option value='DE'>DE</option>
											<option value='FL'>FL</option>
											<option value='GA'>GA</option>
											<option value='HI'>HI</option>
											<option value='IA'>IA</option>
											<option value='ID'>ID</option>
											<option value='IL'>IL</option>
											<option value='IN'>IN</option>
											<option value='KS'>KS</option>
											<option value='KY'>KY</option>
											<option value='LA'>LA</option>
											<option value='MA'>MA</option>
											<option value='MD'>MD</option>
											<option value='ME'>ME</option>
											<option value='MI'>MI</option>
											<option value='MN'>MN</option>
											<option value='MO'>MO</option>
											<option value='MS'>MS</option>
											<option value='MT'>MT</option>
											<option value='NC'>NC</option>
											<option value='ND'>ND</option>
											<option value='NE'>NE</option>
											<option value='NH'>NH</option>
											<option value='NJ'>NJ</option>
											<option value='NM'>NM</option>
											<option value='NV'>NV</option>
											<option value='NY'>NY</option>
											<option value='OH'>OH</option>
											<option value='OK'>OK</option>
											<option value='OR'>OR</option>
											<option value='PA'>PA</option>
											<option value='RI'>RI</option>
											<option value='SC'>SC</option>
											<option value='SD'>SD</option>
											<option value='TN'>TN</option>
											<option value='TX'>TX</option>
											<option value='UT'>UT</option>
											<option value='VA'>VA</option>
											<option value='VT'>VT</option>
											<option value='WA'>WA</option>
											<option value='WI'>WI</option>
											<option value='WV'>WV</option>
											<option value='WY'>WY</option>
										</select>
									</div>
									<div className='col-md-3 my-2'>
										<input
											id='pincode'
											onChange={e => userDataHandler(e)}
											type='text'
											placeholder='Zip Code*'
											className='form-control'
										/>
									</div>
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>ADD DISCOUNT CODE</h3>
									</div>
									<div className='col-md-6 my-2'>
										<input
											onChange={e => setCoupon(e.target.value)}
											type='text'
											placeholder='Discount Code (or leave this blank)'
											className='form-control'
										/>
									</div>
									<div className='col-md-6 my-2'>
										<button
											disabled={process}
											className='btn apply-btn'
											onClick={() => discountCouponHandler()}>
											Apply
										</button>
									</div>
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>ADD SPECIAL INSTRUCTIONS</h3>
									</div>
									<div className='col-md-12 my-2'>
										<textarea
											onChange={e =>
												setOthers({
													...others,
													comment: e.target.value,
												})
											}
											className='form-control'
											style={{ height: "100px" }}
											placeholder='If you wish to give any special instructions, write here. '
										/>
									</div>
								</div>

								<div className='row p-x'>
									<div className='col-md-12'>
										<h3>SELECT PAYMENT METHOD</h3>
									</div>

									<div className='col-md-12 my-2'>
										<StripPaymentInitate
											setClpi={setClpi}
											setL={setL}
											amount={max}
											state={userData}
										/>
									</div>

									<p>
										I authorize Consuela to charge my credit card for
										agreed-upon purchases. I understand that my information will
										be secured and saved to file for further transactions on my
										account.
									</p>
								</div>
								<div className='divider-form-section'></div>
								<div className='row p-x'>
									<div className='col-md-12'>
										<p>
											You agree to our&nbsp;
											<a href='https://onlinewebsitedemo.com/Premium-Pro-Cleaners/privacy-policy/'>
												Terms of Service
											</a>
											and&nbsp;
											<a href='https://onlinewebsitedemo.com/Premium-Pro-Cleaners/privacy-policy/'>
												Privacy Policy
											</a>
											.
										</p>
									</div>
									<div className='col-md-12'>
										<div className='check-box d-flex'>
											<input
												type='checkbox'
												onChange={e =>
													setOthers({
														...others,
														termsandCondition: e.target.checked,
													})
												}
											/>
											<p>
												&nbsp; by clicking the Book Now button. I agree to the
												Terms of Service and Privacy Policy.
											</p>
										</div>
									</div>
									<div className='book-now-btn text-center'>
										<button
											onClick={() => bookingHandler()}
											className='btn apply-btn'
											type='submit'>
											<span id='button-text'>
												{l ? (
													<div className='spinner' id='spinner'></div>
												) : (
													"Book now"
												)}
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className='col-md-4'>
							<RightSection />

							<Summary
								updated={updated}
								cleaningType={cleaningType}
								addonPrice={addonPrice}
								date={date}
								discountAmount={discountAmount}
								space={space}
								total={total}
								setMax={setMax}
								subPrice={subPrice}
								state={state}
								homeservice={homeservice}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Index;

const eerw = [
	{ type: "One Time", discount: 0 },
	{ type: "Weekly", discount: 33.48 },
	{ type: "Biweekly", discount: 34.87 },
	{ type: "Monthly", discount: 37.2 },
];
