import React, { useEffect, useState } from "react";
import {
	getBookingDates,
	setBookingCell,
} from "../../../../services/apiServices/apiService";

export default function Dateshandler() {
	const [state, setstate] = useState([]);

	const [col, setCol] = useState([]);

	const [status, setStatus] = useState(false);

	useEffect(() => {
		getBookingDates().then(e => {
			if (e.status === 200) {
				setCol(e.data.booking);
				let obj = new Object();
				let array = new Array();

				if (e.data.booking.length > 0) {
					for (let date of e.data.booking) {
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
			}
		});
	}, [status]);

	const dateHandler = (slot, status) => {
		setStatus(true);
		setBookingCell({ slot, status }).then(e =>
			e.status === 200 ? setStatus(false) : setStatus(false)
		);
	};

	return (
		<div className='card-body '>
			{!status ? (
				<table class='table p-sga-table table-borderless'>
					<thead>
						<tr>
							{col.map(e => (
								<th key={e.day}>
									<p>
										<span>{e.date.replace(/\w+[.!?]?$/, "")}</span>
									</p>
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						<tr>
							{[...Array(7)].map((_, e) => (
								<td
									onClick={() => {
										state[e]?.appi_10 !== "booked"
											? dateHandler(
													`appi_10-${state[e]?.id}`,
													state[e]?.appi_10
											  )
											: "";
									}}
									className={
										state[e]?.appi_10 === "booked"
											? "booked"
											: state[e]?.appi_10 === "navl"
											? "navlss"
											: "nbooked"
									}
									key={e}>
									<p>
										{state[e]?.appi_10 === "booked"
											? "booked"
											: state[e]?.appi_10 === "navl"
											? "Not Avalilable"
											: "10:00 Am"}
									</p>
								</td>
							))}
						</tr>

						<tr>
							{[...Array(7)].map((_, e) => (
								<td
									onClick={() => {
										state[e]?.appi_11 !== "booked"
											? dateHandler(
													`appi_11-${state[e]?.id}`,
													state[e]?.appi_11
											  )
											: "";
									}}
									className={
										state[e]?.appi_11 === "booked"
											? "booked"
											: state[e]?.appi_11 === "navl"
											? "navlss"
											: "nbooked"
									}
									key={e}>
									<p>
										{state[e]?.appi_11 === "booked"
											? "booked"
											: state[e]?.appi_11 === "navl"
											? "Not Avalilable"
											: "11:00 Am"}
									</p>
								</td>
							))}
						</tr>

						<tr>
							{[...Array(7)].map((_, e) => (
								<td
									onClick={() => {
										state[e]?.appi_12 !== "booked"
											? dateHandler(
													`appi_12-${state[e]?.id}`,
													state[e]?.appi_12
											  )
											: "";
									}}
									className={
										state[e]?.appi_12 === "booked"
											? "booked"
											: state[e]?.appi_12 === "navl"
											? "navlss"
											: "nbooked"
									}
									key={e}>
									<p>
										{state[e]?.appi_12 === "booked"
											? "booked"
											: state[e]?.appi_12 === "navl"
											? "Not Avalilable"
											: "12:00 Pm"}
									</p>
								</td>
							))}
						</tr>

						<tr>
							{[...Array(7)].map((_, e) => (
								<td
									onClick={() => {
										state[e]?.appi_02 !== "booked"
											? dateHandler(
													`appi_02-${state[e]?.id}`,
													state[e]?.appi_02
											  )
											: "";
									}}
									className={
										state[e]?.appi_02 === "booked"
											? "booked"
											: state[e]?.appi_02 === "navl"
											? "navlss"
											: "nbooked"
									}
									key={e}>
									<p>
										{state[e]?.appi_02 === "booked"
											? "booked"
											: state[e]?.appi_02 === "navl"
											? "Not Avalilable"
											: "02:00 Pm"}
									</p>
								</td>
							))}
						</tr>

						<tr>
							{[...Array(7)].map((_, e) => (
								<td
									onClick={() => {
										state[e]?.appi_03 !== "booked"
											? dateHandler(
													`appi_03-${state[e]?.id}`,
													state[e]?.appi_03
											  )
											: "";
									}}
									className={
										state[e]?.appi_03 === "booked"
											? "booked"
											: state[e]?.appi_03 === "navl"
											? "navlss"
											: "nbooked"
									}
									key={e}>
									<p>
										{state[e]?.appi_03 === "booked"
											? "booked"
											: state[e]?.appi_03 === "navl"
											? "Not Avalilable"
											: "03:00 Pm"}
									</p>
								</td>
							))}
						</tr>
					</tbody>
				</table>
			) : (
				<div className='pixal-loader w-100 col-lg-7 d-flex justify-content-center'>
					<svg viewBox='25 25 50 50'>
						<circle r='20' cy='50' cx='50'></circle>
					</svg>
				</div>
			)}
		</div>
	);
}
