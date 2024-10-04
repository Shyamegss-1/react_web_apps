import React, { useEffect, useState } from "react";

export default function Table({
	col,
	dateHandler,
	newPatient,
	setNewPatient,
	loaded,
}) {
	const [state, setstate] = useState([]);

	useEffect(() => {
		let obj = new Object();
		let array = new Array();

		if (col.length > 0) {
			for (let date of col) {
				for (const [key, values] of Object.entries(date)) {
					if (key.includes("appi")) {
						obj[key] = values;
					}
				}
				obj["id"] = date.id;
				obj["date"] = date.date;
				array.push(obj);
				obj = {};
			}
			setstate(array);
		}
	}, [col]);

	return (
		<div className='modal-content model-content-1'>
			<div className='modal-header mb-5'>
				<div className='third-popup-header'>
					<h1 className='modal-title fs-5'>Book Appointment </h1>
					<span className='check-flex '>
						<input
							type='checkbox'
							defaultChecked
							onChange={e => setNewPatient(e.target.checked)}
						/>
						<p> I'm a new patient at this practice</p>
					</span>
					<p className='reason'> Reason for visit</p>
					<select className='form-select' aria-label='Default select example'>
						<option selected>
							{newPatient ? "Initial Appointment" : "Follow up Appointment"}
						</option>
					</select>
				</div>
			</div>

			<div className='modal-body'>
				<div className='third-popup-body'>
					<div className='upper-body lower-body bg-light p-3'>
						<div className='row'>
							<div className='col-lg-5'>
								<div className='third-popup-text'>
									<h3>Choose a time</h3>
								</div>

								<div className='dr-dic mt-5'>
									<div className='row'>
										<div className='col-lg-3'>
											<div className='img-text'>
												<p>
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

							<div className='col-lg-7'>
								<div className=''>
									<table
										className='table-data table'
										style={{ width: "100%" }}
										cellSpacing='20px'>
										<thead>
											<tr>
												{col.map(e => (
													<th key={e.day}>
														<p>
															{e.day.slice(0, 3)}{" "}
															<span>
																{e.date.split(" ")[0] +
																	" " +
																	e.date.split(" ")[1]}
															</span>
														</p>
													</th>
												))}
											</tr>
										</thead>

										{loaded ? (
											<tbody>
												<tr>
													{[...Array(7)].map((_, e) => (
														<td
															onClick={() => {
																state[e]?.appi_10 === "not booked"
																	? dateHandler(
																			`appi_10-${state[e]?.id}`,
																			state[e]?.date
																	  )
																	: "";
															}}
															className={
																state[e]?.appi_10 === "booked"
																	? "booked"
																	: state[e]?.appi_10 === "navl"
																	? "navll"
																	: "nbooked"
															}
															key={e}>
															<p>
																{state[e]?.appi_10 === "booked"
																	? "booked"
																	: state[e]?.appi_10 === "navl"
																	? "N / A"
																	: "10:00 am"}
															</p>
														</td>
													))}
												</tr>

												<tr>
													{[...Array(7)].map((_, e) => (
														<td
															onClick={() => {
																state[e]?.appi_11 === "not booked"
																	? dateHandler(
																			`appi_11-${state[e]?.id}`,
																			state[e]?.date
																	  )
																	: "";
															}}
															className={
																state[e]?.appi_11 === "booked"
																	? "booked"
																	: state[e]?.appi_11 === "navl"
																	? "navll"
																	: "nbooked"
															}
															key={e}>
															<p>
																{state[e]?.appi_11 === "booked"
																	? "booked"
																	: state[e]?.appi_11 === "navl"
																	? "N / A"
																	: "11:00 am"}
															</p>
														</td>
													))}
												</tr>

												<tr>
													{[...Array(7)].map((_, e) => (
														<td
															onClick={() => {
																state[e]?.appi_12 === "not booked"
																	? dateHandler(
																			`appi_12-${state[e]?.id}`,
																			state[e]?.date
																	  )
																	: "";
															}}
															className={
																state[e]?.appi_12 === "booked"
																	? "booked"
																	: state[e]?.appi_12 === "navl"
																	? "navll"
																	: "nbooked"
															}
															key={e}>
															<p>
																{state[e]?.appi_12 === "booked"
																	? "booked"
																	: state[e]?.appi_12 === "navl"
																	? "N / A"
																	: "12:00 pm"}
															</p>
														</td>
													))}
												</tr>

												<tr>
													{[...Array(7)].map((_, e) => (
														<td
															onClick={() => {
																state[e]?.appi_02 === "not booked"
																	? dateHandler(
																			`appi_02-${state[e]?.id}`,
																			state[e]?.date
																	  )
																	: "";
															}}
															className={
																state[e]?.appi_02 === "booked"
																	? "booked"
																	: state[e]?.appi_02 === "navl"
																	? "navll"
																	: "nbooked"
															}
															key={e}>
															<p>
																{state[e]?.appi_02 === "booked"
																	? "booked"
																	: state[e]?.appi_02 === "navl"
																	? "N / A"
																	: "02:00 pm"}
															</p>
														</td>
													))}
												</tr>

												<tr>
													{[...Array(7)].map((_, e) => (
														<td
															onClick={() => {
																state[e]?.appi_03 === "not booked"
																	? dateHandler(
																			`appi_03-${state[e]?.id}`,
																			state[e]?.date
																	  )
																	: "";
															}}
															className={
																state[e]?.appi_03 === "booked"
																	? "booked"
																	: state[e]?.appi_03 === "navl"
																	? "navll"
																	: "nbooked"
															}
															key={e}>
															<p>
																{state[e]?.appi_03 === "booked"
																	? "booked"
																	: state[e]?.appi_03 === "navl"
																	? "N / A"
																	: "03:00 pm"}
															</p>
														</td>
													))}
												</tr>
											</tbody>
										) : (
											<div className='pixal-loader col-lg-7 d-flex justify-content-center'>
												<svg viewBox='25 25 50 50'>
													<circle r='20' cy='50' cx='50'></circle>
												</svg>
											</div>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className='lower-body bg-light p-3'>
						<div className='row'>
							<div className='col-lg-5'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
