import React, { useEffect, useState } from "react";

const Summary = ({
	date,
	subPrice,
	addonPrice,
	cleaningType,
	total,
	updated,
	discountAmount,
	setMax,
}) => {
	const [salestax, setSalestax] = useState(0);

	useEffect(() => {
		let h = total + 20;
		let x = (h / 100) * 6;
		setSalestax(x);

		subPrice.every(e => e?.vl?.split("-")[1] === "None") === true
			? setMax(0)
			: setMax(x + 20 + salestax - cleaningType.discount - discountAmount);
	}, [total]);

	return (
		<div className='summery-section mt-5 position-sticky' style={{ top: 15 }}>
			<div className='summery-title text-center'>
				<h3 className='py-4'>BOOKING SUMMARY</h3>
			</div>
			<div className='summery-body p-4'>
				<div className='row'>
					<div className='col-md-2'>
						<i className='fa fa-home fa-2x'></i>
					</div>
					<div className='col-md-10'>
						<ul className='list-unstyled'>
							{/* <li className="d-flex justify-content-between">
							{space?.Bedrooms && (
							<>
								<div>{space?.Bedrooms || "1 bedroom"}</div>
								<div>$ {price?.pricing?.toFixed(2) || "95.00"}</div>{" "}
							</>
							)}
						</li> */}
							<li>
								<ul className='py-2'>
									{subPrice.every(e => e.vl.split("-")[1] === "None") !==
										true && (
										<li className='d-flex justify-content-between'>
											<div>Service Charge</div>
											<div>$ 20.00</div>
										</li>
									)}

									{subPrice
										?.filter(e => e.vl.split("-")[1] !== "None")
										.map(e => (
											<li
												key={e?.id}
												className='d-flex justify-content-between'>
												<div>{e.vl}</div>
												<div>$ {e.price?.toFixed(2)}</div>
											</li>
										))}

									{addonPrice.map(et => (
										<li
											key={et?.title}
											className='d-flex justify-content-between'>
											<div>{et?.title}</div>
											<div>$ {et?.amount?.toFixed(2)}</div>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-2'>
						<i className='fa fa-calendar fa-2x'></i>
					</div>

					<div className='col-md-10'>
						<p>
							{date === "" && updated === ""
								? "Choose service date..."
								: updated !== ""
								? updated.split(" ").slice(0, -1).join(" ", ",").split("T")[0]
								: date}
						</p>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-2'>
						<i className='fa fa-refresh fa-2x'></i>
					</div>
					<div className='col-md-10'>
						<p>{cleaningType.type}</p>
					</div>
				</div>
			</div>

			<div className='summery-footer pt-3'>
				<div className='px-4'>
					<ul className='list-unstyled'>
						<li className='d-flex justify-content-between'>
							<p>SUB-TOTAL</p>
							<p>
								${" "}
								{subPrice.every(e => e.vl.split("-")[1] === "None") === true
									? "0.00"
									: (total + 20)?.toFixed(2)}
							</p>
						</li>

						<li className='d-flex justify-content-between'>
							<p>SALES TAX</p>
							<p>
								${" "}
								{subPrice.every(e => e.vl.split("-")[1] === "None") === true
									? "0.00"
									: salestax.toFixed(2)}
							</p>
						</li>

						{cleaningType.type !== "One Time" && (
							<li className='d-flex justify-content-between'>
								<p>DISCOUNT</p>
								<p>$ - {cleaningType.discount?.toFixed(2)}</p>
							</li>
						)}

						{discountAmount > 0 && (
							<li className='d-flex justify-content-between'>
								<p>Coupon:applied</p>
								<p>$ - {discountAmount}</p>
							</li>
						)}

						<li className='d-flex justify-content-between'>
							<p>TOTAL</p>
							<p>
								$&nbsp;
								<span id='olo'>
									{subPrice.every(e => e.vl.split("-")[1] === "None") === true
										? "0.00"
										: (
												total +
												20 +
												salestax -
												cleaningType.discount -
												discountAmount
										  )?.toFixed(2)}
								</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Summary;
