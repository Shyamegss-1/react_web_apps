import React, { useEffect, useState } from "react";
import {
	GeCouponService,
	couponDeleteService,
} from "../../../../services/apiServices/apiService";

const CouponTable = () => {
	const [state, setstate] = useState([]);

	const [id, setId] = useState(0);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		GeCouponService().then(e => setstate(e.data.data));
	}, [loading]);

	const deleteHandler = () => {
		couponDeleteService(id).then(e => {
			setLoading(!loading);
			const toast = document.getElementById("liveToastco");
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
						<th>Discount code</th>
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
								return (
									<tr>
										<th>{i}</th>
										<td>{e.discountcode}</td>
										<td>{e.amount}</td>
										<td>{e.createdAt.split("T")[0]}</td>
										<td>
											<button
												onClick={() => setId(e.id)}
												data-bs-toggle='modal'
												data-bs-target='#cModal'
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
				id='cModal'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Coupon card
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							You want to delete this coupon detail ?
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
					id='liveToastco'
					class='toast text-white bg-primary'
					role='success'
					aria-live='assertive'
					aria-atomic='true'>
					<div class='d-flex'>
						<div class='toast-body'>Coupon detail deleted succesFully</div>
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

export default CouponTable;
