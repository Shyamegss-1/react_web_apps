import React from "react";

export const IMAGEBASE =
	import.meta.env.MODE === "development" ? "" : "/cleaner";

const RightSection = () => {
	return (
		<div className='right-section'>
			<div className='row'>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src={IMAGEBASE + "/SVG/clock.svg"} alt='' />
						<h4>Timely Service </h4>
						<p>
							Our team is dedicated to their work and is able to work
							efficiently to complete tasks in a timely manner.
						</p>
					</div>
				</div>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src={IMAGEBASE + "/SVG/Quality-Cleaning.svg"} alt='' />
						<h4>Quality Cleaning</h4>
						<p>
							Use high-quality cleaning equipment and products to ensure clean
							surfaces and provide a thorough service effectively.
						</p>
					</div>
				</div>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src={IMAGEBASE + "/SVG/flexiblity.svg"} alt='' />
						<h4>Flexibility</h4>
						<p>
							We provide services at times that are convenient for the client,
							whether it be during the day or after hours.
						</p>
					</div>
				</div>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src={IMAGEBASE + "/SVG/customize.svg"} alt='' />
						<h4>Customized Plans</h4>
						<p>
							A cleaning service firm should be able to develop customized
							cleaning plans based on the specific needs of the client.
						</p>
					</div>
				</div>
			</div>
			<div className='col-md-12 my-3'>
				<div className='text-center'>
					<img src={IMAGEBASE + "/SVG/pricing.svg"} alt='' />
					<h4>Competitive Pricing</h4>
					<p>
						We maintain quality and are transparent about our pricing, and
						provide detailed estimates for our services.
					</p>
				</div>
			</div>

			<div className='col-md-12 my-3'>
				<div className='text-center'>
					<img src={IMAGEBASE + "/SVG/cash.svg"} alt='' />
					<h4>CASH FREE PAYMENT</h4>
					<p>Pay securely online.</p>
				</div>
			</div>
		</div>
	);
};

export default RightSection;
