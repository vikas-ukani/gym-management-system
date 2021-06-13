import { useEffect, useState } from 'react';
import { Select } from 'antd';

const Step3 = ({ currentInput, goToNextStep, goToPrevStep }) => {
	const [stepInput, setStepInput] = useState({});
	const [specialization, setSpecialization] = useState();
	const [experience, setExperience] = useState();
	const specializations = [
		{
			id: 1,
			name: 'Aerobic',
		},
		{
			id: 2,
			name: 'Cross Fit',
		},
		{
			id: 3,
			name: 'Cycling',
		},
		{
			id: 4,
			name: 'Kick Boxing',
		},
		{
			id: 5,
			name: 'Pilates',
		},
	];
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
							<div className="col-xl-6">
								<div className="form-group">
									<label className="w-100">
										Education{' '}
										<a href="#" className="btn btn-primary add-icon waves-effect waves-light">
											<i className="fa fa-plus"></i>
										</a>
									</label>
									<input type="text" className="form-control form-control-lg" />
								</div>
							</div>
							<div className="col-xl-6">
								<div className="form-group">
									<label className="top-label">Years of experience</label>
									<Select
										className=""
										placeholder="Select experience."
										value={3}
										style={{ width: '100%' }}
										onChange={(id) => setExperience(id)}
										name="experience"
									>
										{/* {specializations.map((role) => {
											return ( */}
										<Select.Option value={1}>1 Year</Select.Option>
										<Select.Option value={2}>2 Year</Select.Option>
										<Select.Option value={3}>3 Year</Select.Option>
										<Select.Option value={4}>4 Year</Select.Option>
										<Select.Option value={5}>5 Year</Select.Option>
										{/* );
										})} */}
									</Select>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="form-group">
									<div className="row">
										<div className="col-xl-12">
											<label className="w-100">
												Specialized
												{/* <a href="#" className="btn btn-primary add-icon">
													<i className="fa fa-plus"></i>
												</a> */}
											</label>
											{/* specializations */}
											<div className="input-group mb-1 mt-1">
												<Select
													mode="multiple"
													placeholder="Select any specializations."
													value={specialization}
													style={{ width: '100%' }}
													onChange={(id) => setSpecialization(id)}
													name="specializations"
												>
													{specializations.map((role) => {
														return (
															<Select.Option key={role.id} value={role.id}>
																{role.name}
															</Select.Option>
														);
													})}
												</Select>
												{/* <div className="input-group-prepend">
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
												/> */}
											</div>
										</div>
									</div>
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
									className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary  default_gradient"
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

export default Step3;
