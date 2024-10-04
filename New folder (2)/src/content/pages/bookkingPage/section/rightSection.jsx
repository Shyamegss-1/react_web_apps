import React from "react";

const RightSection = () => {
	return (
		<div className='right-section'>
			<div className='row'>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src='/SVG/clock.svg' alt='' />
						<h4>Timely Service </h4>
						<p>
							Our dedicated team is at your service around the clock to complete
							cleaning tasks in a timely manner.
						</p>
					</div>
				</div>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src='/SVG/cleaning.svg' alt='' />
						<h4>Quality Cleaning</h4>
						<p>
							We use high-quality cleaning equipment and products to ensure
							spotless cleaning surfaces for you.
						</p>
					</div>
				</div>
				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src='/SVG/flexiblity.svg' alt='' />
						<h4>Flexibility</h4>
						<p>
							You can get our cleaning services at your convenient schedule,
							whether it be the day or after hours.
						</p>
					</div>
				</div>

				<div className='col-md-12 my-3'>
					<div className='text-center'>
						<img src='/SVG/customize.svg' alt='' />
						<h4>Customized Plans</h4>
						<p>
							Our cleaning service firm offers you customized cleaning plans
							that align with your unique needs.
						</p>
					</div>
				</div>
			</div>

			<div className='col-md-12 my-3'>
				<div className='text-center'>
					<img src='/SVG/pricing.svg' alt='' />
					<h4>Competitive Pricing</h4>
					<p>
						We maintain quality, are transparent about our pricing, and provide
						affordable cleaning services.
					</p>
				</div>
			</div>

			<div className='col-md-12 my-3'>
				<div className='text-center'>
					<img src='/SVG/cash.svg' alt='' />
					<h4>CASH FREE PAYMENT</h4>
					<p>Pay securely online.</p>
				</div>
			</div>
		</div>
	);
};

export default RightSection;
