import React, { useState, useEffect, useCallback } from "react";
import { getUserData } from "../../../services/apiServices/apiService";
import AppointmentList from "./components/list";
import Dateshandler from "./components/dateshandler";

export default function Index() {
	const [state, setState] = useState(1);
	const [first, setfirst] = useState([]);

	const tabHandler = useCallback(
		value => {
			setState(value);
		},
		[state]
	);

	useEffect(() => {
		(async function () {
			let x = [];
			await getUserData().then(e => {
				e.data.data.map(l => {
					let y = {
						slot: l.appointmentslot,
						time: l.createdAt,
						date: l.appdatetime,
						patientType: l.newpatient,
						...JSON.parse(l.patient),
					};
					x.push(y);
				});
			});

			setfirst(x);
		})();
	}, []);

	return (
		<div className='container-sm my-5'>
			<ul className='nav nav-pills'>
				<li className='nav-item'>
					<a
						onClick={() => tabHandler(1)}
						className={`nav-link ${state === 1 ? "active" : ""}`}
						aria-current='page'
						href='#'>
						Appointments
					</a>
				</li>

				<li className='nav-item'>
					<a
						className={`nav-link ${state === 2 ? "active" : ""}`}
						onClick={() => tabHandler(2)}
						href='#'>
						Mangae Dates
					</a>
				</li>
			</ul>

			{state === 1 ? (
				<div className='card my-3 p-3'>
					<div class='card-header'>
						<h3>Appointments</h3>
					</div>

					<div className='card-body'>
						<ul class='list-group row list-group-numbered position-relative'>
							{[]
								.concat(first)
								.reverse()
								.map((el, i) => (
									<AppointmentList el={el} key={i} />
								))}
						</ul>
					</div>
				</div>
			) : (
				<div className='card my-3 p-3'>
					<div class='card-header'>
						<h3>Manage Dates</h3>
					</div>

					<Dateshandler />
				</div>
			)}
		</div>
	);
}
