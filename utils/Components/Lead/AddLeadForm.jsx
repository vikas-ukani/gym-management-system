const AddLeadForm = () => {
	return (
		<div>
			<form role="form">
				<div className="row">
					<div className="col-xl-6 col-6">
						<div className="form-group">
							<label className="top-label">First Name</label>
							<input type="text" className="form-control form-control-lg" />
						</div>
					</div>

					<div className="col-xl-6 col-6">
						<div className="form-group">
							<label className="top-label">Last Name</label>
							<input type="text" className="form-control form-control-lg" />
						</div>
					</div>

					<div className="col-xl-12">
						<div className="form-group mb-1">
							<ul className="list-unstyled mb-0">
								<li className="d-inline-block mr-2 checkbox-mobile">
									<fieldset>
										<div className="vs-radio-con">
											<input type="radio" name="specialized" value="false" />
											<span className="vs-radio">
												<span className="vs-radio--border"></span>
												<span className="vs-radio--circle"></span>
											</span>
											<span className="">Potential Members</span>
										</div>
									</fieldset>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-6">
						<div className="form-group">
							<label className="h6" htmlFor="exampleInputDate1">
								Phone
							</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<span className="fa fa-mobile fa-2x"></span>
									</span>
								</div>
								<input className="form-control form-control-lg datepicker" type="text" />
							</div>
						</div>
					</div>

					<div className="col-6">
						<div className="form-group">
							<label className="h6" htmlFor="exampleInputDate1">
								Alternate Phone
							</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<span className="fa fa-mobile fa-2x"></span>
									</span>
								</div>
								<input className="form-control form-control-lg datepicker" type="text" />
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="form-group">
							<label className="h6" htmlFor="exampleInputDate1">
								Email
							</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<span className="fa fa-envelope"></span>
									</span>
								</div>
								<input className="form-control form-control-lg datepicker" type="text" />
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-6">
						<div className="form-group">
							<label className="h6" htmlFor="exampleInputDate1">
								Follow up date
							</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<span className="fa fa-calendar"></span>
									</span>
								</div>
								<input className="form-control form-control-lg datepicker" type="text" />
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-6">
						<div className="form-group">
							<label className="h6" htmlFor="exampleInputDate1">
								Time of call
							</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<span className="fa fa-clock-o"></span>
									</span>
								</div>
								<input className="form-control form-control-lg datepicker" type="text" />
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="form-group  mb-1">
							<label className="h6 mb-1" htmlFor="exampleInputDate1">
								Intrusted?
							</label>
							<ul className="list-unstyled specialized-list mb-0">
								<li className="d-inline-block mr-2 checkbox-mobile">
									<fieldset>
										<div className="vs-radio-con">
											<input type="radio" name="specialized" value="false" />
											<span className="vs-radio">
												<span className="vs-radio--border"></span>
												<span className="vs-radio--circle"></span>
											</span>
											<span className="">Not Interested </span>
										</div>
									</fieldset>
								</li>
								<li className="d-inline-block mr-2 checkbox-mobile">
									<fieldset>
										<div className="vs-radio-con">
											<input type="radio" name="specialized" value="false" />
											<span className="vs-radio">
												<span className="vs-radio--border"></span>
												<span className="vs-radio--circle"></span>
											</span>
											<span className="">Interested </span>
										</div>
									</fieldset>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="form-group">
							<label className="top-label">Reason</label>
							<select className="form-control form-control-lg">
								<option value="A+">Expensive Plan</option>
								<option value="a-">less Machinery</option>
								<option value="b+">Facility</option>
								<option value="b-">Substandard Machinery / Equipment</option>
								<option value="o+">Less Fitness Option</option>
								<option value="o-">Location</option>
								<option value="ab+">Other</option>
							</select>
						</div>
					</div>

					<div className="col-12 text-xl-left text-center mb-5">
						<button className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn">
							Save and Exit
						</button>
						<button className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn">
							Continue
						</button>
						<button className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn">
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddLeadForm;
