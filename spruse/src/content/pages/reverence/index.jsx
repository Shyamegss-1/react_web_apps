import React, { useEffect, useState } from "react";
import Table from "./components/table";
import UserDetails from "./components/userDetails";
import InsuranceDetails from "./components/insuranceDetails";

import {
	getBookingDates,
	setUserData,
} from "../../../services/apiServices/apiService";

export default function Index() {
	const [date, setDate] = useState();

	const [newPatient, setNewPatient] = useState(true);

	const [trow, setrow] = useState();

	const [loaded, setLoaded] = useState(false);

	const [tableCol, setTableCol] = useState([]);

	const [submit, setSubmit] = useState(false);

	const [display, setDisplay] = useState(1);

	const [status, setStatus] = useState(false);

	const [data, setData] = useState({
		fname: "",
		lname: "",
		email: "",
		phone: "",
		dob: "",
		fname: "",
		agr1: false,
		agr2: false,
		insurance: "",
		insurancememberid: "",
		typeofinsurance: "Other Insurance",
		insurancegroupid: "",
		additonalnote: "",
		hearabout: "Other",
		agr3: false,
		agr4: false,
	});

	useEffect(() => {
		setLoaded(false);
		getBookingDates().then(e => {
			if (e.status === 200) {
				setLoaded(true);
				setTableCol(e.data.booking);
			}
		});
	}, []);

	const postDataHandler = () => {
		setSubmit(true);
		setUserData({
			patient: JSON.stringify(data),
			newpatient: newPatient.toString(),
			appdatetime: date,
			appointmentslot: trow,
		}).then(e => {
			if (e.status === 201) {
				setStatus(true);
				setSubmit(false);
			}
		});
	};

	const ViewHandler = () => {
		if (display === 2) {
			if (
				(data.fname && data.lname && data.email && data.phone && data.dob) ===
				""
			) {
				document.getElementById("require_t_81290").style.display = "block";
			} else {
				setDisplay(state => (state <= 2 ? state + 1 : 3));
				document.getElementById("require_t_81290").style.display = "none";
			}
		} else if (display === 3) {
			if (
				data.typeofinsurance !== "Other Insurance" &&
				data.additonalnote === ""
			) {
				document.getElementById("require_t_81290").style.display = "block";
			} else if (
				data.typeofinsurance === "Other Insurance" &&
				(data.additonalnote && data.insurancegroupid,
				data.insurancememberid) === ""
			) {
				document.getElementById("require_t_81290").style.display = "block";
			} else {
				postDataHandler();
				document.getElementById("require_t_81290").style.display = "none";
			}
		}
	};

	const backViewHandler = () => {
		setDisplay(state => (state > 0 ? state - 1 : 1));
	};

	const dateHandler = (val, yyy) => {
		setDate(yyy);

		setrow(val);

		setDisplay(state => (state <= 2 ? state + 1 : 3));
	};

	const setDataHandler = event => {
		setData({
			...data,
			[event.target.id]: event.target.value,
		});
	};

	const ned = trow?.split("-")?.splice(0, 1)?.join(" ")?.split("_")[1];

	return (
		<div className='pop-main'>
			<div className='pop-up-screen'>
				{!status ? (
					<div className='my-5 container-md'>
						{display === 1 && (
							<Table
								loaded={loaded}
								col={tableCol}
								dateHandler={dateHandler}
								newPatient={newPatient}
								setNewPatient={setNewPatient}
							/>
						)}

						{display === 2 && (
							<UserDetails
								date={date}
								trow={trow}
								setDataHandler={setDataHandler}
								setData={setData}
								data={data}
							/>
						)}

						{display === 3 && (
							<InsuranceDetails
								date={date}
								trow={trow}
								setDataHandler={setDataHandler}
								setData={setData}
								data={data}
								newPatient={newPatient}
							/>
						)}

						{display === (2 || 3) && (
							<div
								id='require_t_81290'
								style={{ display: "none", color: "red" }}>
								* Complete The Required Fields
							</div>
						)}

						{display !== 1 && (
							<div
								className='w-100 mx-auto my-3 d-flex py-4'
								style={{ zIndex: "1111" }}>
								<div className='modal-footer' style={{ columnGap: "10px" }}>
									{!submit ? (
										<button
											onClick={() => backViewHandler()}
											style={{ cursor: "pointer" }}
											type='button'
											className='btn btn-back btn-secondary rounded-pill'
											data-bs-dismiss='modal'>
											Back
										</button>
									) : (
										<button class='btn btn-primary' type='button' disabled>
											<span
												class='spinner-border spinner-border-sm'
												role='status'
												aria-hidden='true'></span>
											Loading...
										</button>
									)}

									{!submit ? (
										<button
											disabled={
												display === 2 && data.agr1 && data.agr2
													? false
													: display === 3 && data.agr3 && data.agr4
													? false
													: true
											}
											onClick={() => ViewHandler()}
											style={{ cursor: "pointer" }}
											type='button'
											className='btn btn-next btn-primary rounded-pill'>
											Continue
											<i
												className='fa fa-arrow-right'
												style={{ marginLeft: "24px" }}></i>
										</button>
									) : (
										<button class='btn btn-primary' type='button' disabled>
											<span
												class='spinner-border spinner-border-sm'
												role='status'
												aria-hidden='true'></span>
											Loading...
										</button>
									)}
								</div>
							</div>
						)}
					</div>
				) : (
					<div className='my-5 lower-body container-md '>
						<div class='row' style={{ borderBottom: "1px solid #dddddd" }}>
							<div class='col-sm-5'>
								<h3 className='my-4'>Appointment request submitted!</h3>
								<div className='dr-dic'>
									<div className='row align-items-center pb-5'>
										<div className='col-lg-3'>
											<div className='img-text'>
												<p>AM</p>
											</div>
										</div>
										<div className='col-lg-9'>
											<div className='discription'>
												{date} - {ned}:00{" "}
												{ned === "02" || ned === "12" || ned === "03"
													? "Pm"
													: "Am"}
												<p>Mr. Akwetey M Akrong PMHNP-BC</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class='row py-5'>
							<h4>
								<span
									className='pick_sbvd p-2'
									dangerouslySetInnerHTML={{ __html: svg }}
								/>
								You're all set !
							</h4>
							<div class='col-xl-5 mt-5'>
								<div className='dr-dic'>
									<div className='row align-items-center pb-5'>
										<div className='col-lg-3'>
											<div className='img-text'>
												<p
													style={{
														height: "117px",
														width: "117px",
														fontSize: "38px",
													}}>
													<img
														src='https://icarepsychiatryservices.com/wp-content/uploads/2023/04/iCare-Psychiatryf.png'
														alt='icarepsychiatryservices'
													/>
												</p>
											</div>
										</div>

										<div className='col-lg-9'>
											<div className='discription'>
												<h4>iCare psychiatry services</h4>
												<p>2601 Springdale Circle, Naperville, IL. 60564</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="30" height="30" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#4bae4f" d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z" data-original="#4bae4f" class=""></path><path fill="#ffffff" d="M379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z" data-original="#ffffff"></path></g></g></svg>`;
