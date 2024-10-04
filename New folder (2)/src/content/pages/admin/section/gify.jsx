import React, { useEffect, useState } from "react";
import { GetgiftCardService } from "../../../../services/apiServices/apiService";

const GifyTableLayout = () => {
	const [state, setState] = useState([]);

	useEffect(() => {
		GetgiftCardService().then(e => setState(e.data.card));
	}, []);

	return (
		<>
			<table className='table table-hover '>
				<thead>
					<tr>
						<th>#</th>
						<th>From</th>
						<th>To</th>
						<th>Amount</th>
						<th>Message</th>
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
									<td>
										{e.from} <br /> {e.youremail}
									</td>
									<td>
										{e.to} <br /> {e.senderemail}
									</td>
									<td>$ {Number(e.amount).toFixed(2)}</td>
									<td>{e.Message}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default GifyTableLayout;
