import React, { useEffect, useState } from "react";
import { GeCouponService } from "../../../../services/apiServices/apiService";

const CouponTable = () => {
	const [state, setstate] = useState([]);
	useEffect(() => {
		GeCouponService().then(e => setstate(e.data.data));
	}, []);
	return (
		<>
			<table className='table table-hover '>
				<thead>
					<tr>
						<th>#</th>
						<th>Discount code</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
				</thead>

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
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default CouponTable;
