import React, { useEffect, useState } from "react";
import {
	GetBookingService,
	bookingDeleteService,
} from "../../../../services/apiServices/apiService";

const TableLayout = () => {
	const [state, setState] = useState([]);
	const [user, setUser] = useState({});

	const [id, setId] = useState(0);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		GetBookingService().then(e => setState(e.data.data));
	}, [loading]);

	const setDetails = id => {
		let x = state.find(e => e.id === id);

		setUser(x);
	};

	let mainData = JSON.parse(user?.user || JSON.stringify({}));
	let reservice = JSON.parse(user?.reservice || JSON.stringify({}));
	let serviceData = JSON.parse(
		user?.additionlrequirements || JSON.stringify([{}])
	);

	const deleteHandler = () => {
		bookingDeleteService(id).then(e => {
			setLoading(!loading);
			const toast = document.getElementById("liveToastBok");
			toast.classList.add("show");
			setTimeout(() => {
				toast.classList.remove("show");
			}, 6000);
		});
	};

	return (
		<>
			<table className='table table-hover '>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Amount</th>
						<th>Date</th>
						<th></th>
					</tr>
				</thead>

				{state.length > 0 ? (
					<tbody>
						{[]
							.concat(state)
							.reverse()
							?.map((e, i) => {
								const user = JSON.parse(e.user);
								return (
									<tr>
										<th>{i}</th>
										<td>{user.fname}</td>
										<td>{e.email}</td>
										<td>$ {Number(e.amount).toFixed(2)}</td>
										<td>{`${e.bookingDate.split(" ")[0].split("T")[0]}  /  ${
											e.bookingDate.split(" ")[1]
										}`}</td>
										<td>
											<button
												onClick={() => setDetails(e.id)}
												type='button'
												data-bs-toggle='modal'
												data-bs-target='#exampleModal'
												className='btn btn-primary btn-sm '>
												Details
											</button>
										</td>

										<td>
											<button
												onClick={() => setId(e.id)}
												data-bs-toggle='modal'
												data-bs-target='#bModal'
												className='btn btn-danger'>
												<i className='fa fa-trash' aria-hidden='true' />
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				) : (
					<tbody>
						<tr className='d-flex justify-content-center mt-3'>
							<h2 style={{ width: "100%" }}>No Data Available</h2>
						</tr>
					</tbody>
				)}
			</table>

			<div
				className='modal fade'
				id='exampleModal'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog modal-lg'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Booking Details
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							/>
						</div>

						<div className='modal-body'>
							<div className='p-2'>
								<div className=''>
									<h6>User Details</h6>
									<p className='mt-3'>
										<span className='fw-bold'>name : </span>
										{`${mainData.fname} ${mainData.lname}`}
									</p>

									<p className='mt-3'>
										<span className='fw-bold'>email : </span>
										{mainData.email}
									</p>

									<p className='mt-3'>
										<span className='fw-bold'>address : </span>
										{mainData.appartment} , {mainData.city} <br />{" "}
										{mainData.state} , {mainData.pincode}
									</p>

									<p className='mt-3'>
										<span className='fw-bold'>address : </span>
										{mainData.phone}
									</p>
								</div>

								<div className='pt-4'>
									<h6>Payment Details</h6>
									<p className='mt-3'>
										<span className='fw-bold'>transaction id : </span>
										{user.clientpi}
									</p>
									<p>
										<span className='fw-bold'>amount : </span>$
										{Number(user.amount).toFixed(2)}
									</p>
									<p>
										<span className='fw-bold'>discount : </span>
										{user.discount}
									</p>
									{Number(user.discount) !== 0 && (
										<p>
											<span className='fw-bold'>discount coupon : </span>
											{user.discountcode}
										</p>
									)}
								</div>

								<div className='pt-4'>
									<h6>Booking Details</h6>

									<p className='mt-3'>
										<span className='fw-bold'>service: </span>
										{user.servicetype}
									</p>
									<p className='mt-3'>
										<span className='fw-bold'>addition requirement: </span>
										{reservice.type}
									</p>

									<p className='mt-3'>
										<span className='fw-bold'>reservice: </span>
										{serviceData.map(e => `${e.title} , `)}
									</p>
									<p className='mt-3'>
										<span className='fw-bold'>booking date : </span>
										{user?.bookingDate?.split("T")[0]} -{" "}
										{user?.bookingDate?.split(" ")[1]}
									</p>
								</div>

								<div className='pt-4'>
									<h5>Message</h5>

									<p className='mt-3'>{user.message}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className='modal fade'
				id='bModal'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Booking detail
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							You want to delete this booking detail ?
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'>
								Cancel
							</button>
							<button
								data-bs-dismiss='modal'
								onClick={deleteHandler}
								type='button'
								className='btn btn-danger'>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class='position-fixed top-0  end-0 p-3' style={{ zIndex: 11 }}>
				<div
					id='liveToastBok'
					class='toast text-white bg-primary'
					role='success'
					aria-live='assertive'
					aria-atomic='true'>
					<div class='d-flex'>
						<div class='toast-body'>Booking detail deleted succesfully</div>
						<button
							type='button'
							class='btn-close btn-close-white me-2 m-auto'
							data-bs-dismiss='toast'
							aria-label='Close'></button>
					</div>
				</div>
			</div>
		</>
	);
};

export default TableLayout;
