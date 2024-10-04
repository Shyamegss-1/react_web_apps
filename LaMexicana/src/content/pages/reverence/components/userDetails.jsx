import React from "react";

export default function UserDetails({
	setDataHandler,
	setData,
	data,
	date,
	trow,
}) {
	const ned = trow?.split("-")?.splice(0, 1)?.join(" ")?.split("_")[1];

	return (
		<div className='modal-content model-content-2'>
			<div className='modal-header'>
				<div className='third-popup-header '>
					<h1 className='modal-title fs-5'>Book Appointment </h1>
					<div className='dr-dic  mt-4'>
						<div className='row'>
							<div className='col-lg-3'>
								<div className='img-text'>
									<p>
										<img
											src='https://icarepsychiatryservices.com/wp-content/uploads/2023/04/iCare-Psychiatryf.png'
											alt='icarepsychiatryservices'
										/>
									</p>
								</div>
							</div>
							<div className='col-lg-9'>
								<div className='discription'>
									<h4>
										{date} - {ned}:00{" "}
										{ned === "02" || ned === "12" || ned === "03" ? "Pm" : "Am"}
									</h4>
									<p>
										<span>iCare psychiatry services</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='upper-body upper-body1 '>
				<div className='form'>
					<form action=''>
						<div className='row'>
							<div className='col-6 my-3'>
								<label for='fname' className='form-lable'>
									First Name:
								</label>
								<input
									id='fname'
									type='text'
									className='form-control'
									placeholder='required *'
									value={data.fname}
									onChange={e => setDataHandler(e)}
								/>
							</div>
							<div className='col-6 my-3'>
								<label for='lname' className='form-lable'>
									Last Name:
								</label>
								<input
									id='lname'
									type='text'
									className='form-control'
									placeholder='required *'
									value={data.lname}
									onChange={e => setDataHandler(e)}
								/>
							</div>

							<div className='col-6 my-3'>
								<label for='email' className='form-lable'>
									Email:
								</label>

								<input
									id='email'
									type='text'
									className='form-control'
									placeholder='required *'
									value={data.email}
									onChange={e => setDataHandler(e)}
								/>
							</div>

							<div className='col-6 my-3'>
								<label for='phone' className='form-lable'>
									Phone:
								</label>
								<input
									id='phone'
									type='text'
									className='form-control'
									placeholder='required *'
									value={data.phone}
									onChange={e => setDataHandler(e)}
								/>
							</div>

							<div className='col-3 my-3'>
								<label for='dob' className='form-lable'>
									Date of Birth :
								</label>
								<input
									id='dob'
									type='date'
									className='form-control'
									placeholder='required *'
									value={data.dob}
									onChange={e => setDataHandler(e)}
								/>
							</div>

							<div className='col-12 my-3'>
								<div className='check-form'>
									<span className='check-flex '>
										<input
											checked={data.agr1}
											type='checkbox'
											id='agr1'
											onChange={e =>
												setData({ ...data, ["agr1"]: e.target.checked })
											}
										/>
										<p>
											I have read and agreed to the
											<a href='##'> Privacy Policy</a> and
											<a href='##'>Terms of Use</a> that I am at least 13 and
											have the authority to make this appointment
										</p>
									</span>

									<span className='check-flex '>
										<input
											checked={data.agr2}
											type='checkbox'
											id='agr2'
											onChange={e =>
												setData({ ...data, ["agr2"]: e.target.checked })
											}
										/>
										<p>
											I agree to receive text messages from this practice and
											understand that message frequency and data rates may apply
										</p>
									</span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
