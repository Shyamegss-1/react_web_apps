import React from "react";

function InsuranceDetails({
	setData,
	data,
	setDataHandler,
	newPatient,
	date,
	trow,
}) {
	const ned = trow?.split("-")?.splice(0, 1)?.join(" ")?.split("_")[1];
	return (
		<div className='modal-content model-content-2'>
			<div className='modal-header'>
				<div className='third-popup-header'>
					<h1 className='modal-title fs-5'>Book Appointment</h1>
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
									{date} - {ned}:00
									{ned === "02" || ned === "12" || ned === "03" ? "Pm" : "Am"}
									<p>
										<span>iCare psychiatry services</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='modal-body'>
				<div className='third-popup-body'>
					<div className='upper-body upper-body2'>
						<div className='form'>
							<form action=''>
								<div className='row'>
									<div className='col-12 my-3'>
										<label for='lfname' className='form-lable'>
											Insurance :
										</label>
										<select
											value={data.typeofinsurance}
											id='typeofinsurance'
											onChange={e => setDataHandler(e)}
											className='form-select'
											aria-label='Default select example'>
											<option>No Insurance</option>
											<option selected>Other Insurance</option>
										</select>
									</div>

									{data.typeofinsurance === "Other Insurance" && (
										<>
											<div className='col-12 my-3'>
												<label for='insurancememberid' className='form-lable'>
													Insurance Mamber ID#
												</label>
												<input
													id='insurancememberid'
													type='text'
													className='form-control'
													placeholder='required *'
													onChange={e => setDataHandler(e)}
												/>
											</div>
											<div className='col-12 my-3'>
												<label for='insurancegroupid' className='form-lable'>
													Insurance Group ID#
												</label>
												<input
													onChange={e => setDataHandler(e)}
													id='insurancegroupid'
													type='text'
													className='form-control'
													placeholder='required *'
												/>
											</div>
										</>
									)}

									<div className='col-12 my-3'>
										<label for='additonalnote' className='form-lable'>
											Additional notes for the practice
										</label>
										<textarea
											onChange={e => setDataHandler(e)}
											id='additonalnote'
											className='form-control'
											placeholder='required *'
											value={data.additonalnote}
											style={{
												height: " 100%",
												minHeight: "100px",
											}}></textarea>
									</div>

									{newPatient && (
										<div className='col-12 my-3'>
											<label for='lfname' className='form-lable'>
												How did you hear about us?
											</label>
											<select
												value={data.hearabout}
												id='hearabout'
												onChange={e => setDataHandler(e)}
												className='form-select'
												aria-label='Default select example'>
												<option> Insurance</option>
												<option> Online search e.g. Google, Bing</option>
												<option>
													Online review site e.g. yelp, healthgrades
												</option>
												<option> Referral from healthcare provider</option>
												<option> Referral from friend.colleague</option>
												<option>Local advertisement</option>
												<option selected>Other</option>
											</select>
										</div>
									)}

									<div className='col-12 my-3'>
										<div className='check-form'>
											<span className='check-flex '>
												<input
													checked={data.agr3}
													type='checkbox'
													onChange={e =>
														setData({ ...data, ["agr3"]: e.target.checked })
													}
												/>
												<p>
													I have read and agreed to the
													<a href='##'> Privacy Policy</a> and
													<a href='##'>Terms of Use</a> that I am at least 13
													and have the authority to make this appointment
												</p>
											</span>
											<span className='check-flex '>
												<input
													checked={data.agr4}
													type='checkbox'
													onChange={e =>
														setData({ ...data, ["agr4"]: e.target.checked })
													}
												/>
												<p>
													I agree to receive text messages from this practice
													and understand that message frequency and data rates
													may apply
												</p>
											</span>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='lower-body'></div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(InsuranceDetails);
