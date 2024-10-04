import React, { useEffect, useState } from "react";
import { GetPaymenTData } from "../../../../services/apiServices/apiService";

const PaymentTable = () => {
	const [state, setstate] = useState([]);

	useEffect(() => {
		GetPaymenTData().then(e => setstate(e.data.data));
	}, []);

	return (
		<>
			<table className='table table-hover '>
				<thead>
					<tr>
						<th>#</th>
						<th>Email</th>
						<th>Amount</th>
						<th>Status</th>
						<th>Transaction id</th>
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
									<td>{e.email}</td>
									<td>$ {Number(e.amount).toFixed(2)}</td>
									<td>{e.status}</td>
									<td>{e.clientpi}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default PaymentTable;
