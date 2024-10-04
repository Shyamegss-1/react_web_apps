import React from "react";

export default function AppointmentList({ el }) {
	const getDay = date => {
		var currentDate = new Date(date.toLowerCase());

		const options = { weekday: "long" };
		const dayName = currentDate.toLocaleDateString("en-US", options);

		return dayName;
	};

	const getDate = date => {
		var currentDate = new Date(date.toLowerCase());

		return currentDate.toLocaleDateString();
	};

	const getTime = time => {
		const ned = time?.split("-")?.splice(0, 1)?.join(" ")?.split("_")[1];
		const m = ned === "02" || ned === "12" || ned === "03" ? "Pm" : "Am";
		return `${ned} : 00 ${m}`;
	};

	const isExpired = date => {
		let x = new Date(date.toLowerCase());
		let y = new Date();

		if (y.toLocaleDateString() > x.toLocaleDateString()) {
			return true;
		} else if (y.toLocaleDateString() === x.toLocaleDateString()) {
			return false;
		} else if (y.toLocaleDateString() < x.toLocaleDateString()) {
			return false;
		}
	};

	const getCrDate = date => {
		const c = new Date(date);
		return c.toLocaleDateString();
	};

	return (
		<li
			class='list-group-item list-group-item-action col-6'
			style={isExpired(el.date) ? { background: "#ebebeb" } : {}}>
			<div
				className='d-flex p-2 cl-h2mb flex-wrap'
				style={{
					columnGap: "30px",
				}}>
				<div>
					<h5>Appointment Timing</h5>
					<h6>{getDate(el.date)}</h6>
					<h6>{getDay(el.date)}</h6>
					<h6>{getTime(el.slot)}</h6>
				</div>

				<div>
					<h5>
						{el.fname} {el.lname}
					</h5>
					<h6>{el.dob}</h6>
					<h6>50/1/5210</h6>
					<h6>{el.phone}</h6>
					<h6>{el.email}</h6>
				</div>

				{el.typeofinsurance !== "No Insurance" && (
					<div>
						<h5>Insurance Details</h5>
						<h6>{el.insurancememberid}</h6>
						<h6>{el.insurancegroupid}</h6>
					</div>
				)}

				<div>
					<div className='mt-3' style={{ border: "none" }}>
						<h5>Reference :</h5>
						<h6>{el.hearabout}</h6>
					</div>
				</div>

				<div style={{ border: "none" }} className='mt-5'>
					<h5>Additional information</h5>
					<p>{el.additonalnote}</p>
				</div>

				<div className='f-tags' style={{ border: "none" }}>
					<a href='#' class='tag blue-t'>
						{getCrDate(el.time)}
					</a>

					{el.patientType === "true" && (
						<a href='#' class='tag'>
							New Patient
						</a>
					)}

					{isExpired(el.date) && (
						<a href='#' class='tag gray-t '>
							Expire
						</a>
					)}
				</div>
			</div>
		</li>
	);
}
