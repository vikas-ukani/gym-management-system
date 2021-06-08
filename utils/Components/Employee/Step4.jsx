import { useEffect, useState } from 'react';
import { Select } from 'antd';
const Step4 = ({ currentInput, goToNextStep, goToPrevStep }) => {
	const [stepInput, setStepInput] = useState({});
	const [designation, setDesignation] = useState();

	useEffect(() => {
		setStepInput(currentInput);
	}, []);

	const handleChange = (e) => {
		if (updatedCurrentInput?.input && e.target.name) {
			let newUpdates = {
				...currentInput,
				input: {
					...currentInput.input,
					[e.target.name]: e.target.value,
				},
			};
			setStepInput(newUpdates);
		}
	};

	const stepNext = () => {
		goToNextStep(stepInput);
	};

	const stepPrev = () => {
		goToPrevStep();
	};
	return (
		<div>
			<form role="form" action="index.html" className="login-box">
				<div className="tab-content" id="main_form">
					<div className="tab-pane active" role="tabpanel" id="step1">
						<div className="row">
							<div className="col-lg-6">
								<div className="form-group">
									<div className="custom-file">
										<input
											type="file"
											className="form-control custom-file-input"
											id="customFile"
											aria-label="File upload"
										/>
										<label className="custom-file-label" htmlFor="customFile">
											Profile Picture
										</label>
									</div>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group">
									<label className="top-label">About Me</label>
									<textarea className="form-control form-control-lg" rows="5"></textarea>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="form-group">
									<div className="row">
										<div className="col-xl-4">
											<label className="w-100">
												Designation
												{/* <a href="#" className="btn btn-primary add-icon"><i className="fa fa-plus"></i></a> */}
											</label>
											<Select
												className=""
												placeholder="Select experience."
												value={designation}
												style={{ width: '100%' }}
												onChange={(id) => setDesignation(id)}
												name="experience"
											>
												{/* {specializations.map((role) => {
											return ( */}
												<Select.Option value={1}>Trainer</Select.Option>
												<Select.Option value={2}>Relationship Manager</Select.Option>
												<Select.Option value={3}>Janitor</Select.Option>
												<Select.Option value={4}>Owner</Select.Option>
												{/* );
										})} */}
											</Select>
											{/* <div className="input-group mb-1 mt-1">
												<div className="input-group-prepend">
													<span className="input-group-text">
														<div className="vs-radio-con">
															<input type="radio" name="specialized" value="false" />
															<span className="vs-radio">
																<span className="vs-radio--border"></span>
																<span className="vs-radio--circle"></span>
															</span>
														</div>
													</span>
												</div>
												<input
													className="form-control form-control-lg datepicker"
													type="text"
												/>
											</div> */}
										</div>
									</div>
									{/* <ul className="list-unstyled  mb-0">
										<li className="d-inline-block mr-2 checkbox-mobile">
											<fieldset>
												<div className="vs-radio-con">
													<input type="radio" name="specialized" value="false" />
													<span className="vs-radio">
														<span className="vs-radio--border"></span>
														<span className="vs-radio--circle"></span>
													</span>
													<span className="">Trainer</span>
												</div>
											</fieldset>
										</li>
									</ul> */}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-12 mb-5">
								<a
									onClick={() => stepPrev()}
									className="float-left mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
								>
									<i className="fa fa-angle-left"></i> BACK
								</a>
								<a
									onClick={() => stepNext()}
									className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn default_gradient"
								>
									NEXT <i className="fa fa-angle-right"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Step4;
