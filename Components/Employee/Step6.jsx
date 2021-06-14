import { useEffect, useState } from 'react';

const Step6 = ({ currentData, goToNextStep, goToPrevStep }) => {
	const [stepInput, setStepInput] = useState({});

	useEffect(() => {
		setStepInput(currentData);
	}, []);

	const handleChange = (e) => {
		if (updatedcurrentData?.input && e.target.name) {
			let newUpdates = {
				...currentData,
				input: {
					...currentData.input,
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
							<div className="form-group col-6">
								<label className="top-label w-100 mb-2">
									Bank Name
									{/* <a href="#" className="btn btn-primary add-icon"><i className="fa fa-plus"></i></a> */}
								</label>
								<div className="row no-gutters">
									<input
										type="text"
										name="bank_name"
										className="form-control form-control-lg "
										placeholder="Enter Bank Name"
									/>
								</div>
							</div>
							<div className="form-group col-6">
								<label className="top-label w-100 mb-2">IFSC Code</label>
								<div className="row no-gutters">
									<input
										type="text"
										name="ifsc"
										className="form-control form-control-lg "
										placeholder="Enter IFSC Code"
									/>
								</div>
							</div>
							<div className="form-group col-6">
								<label className="top-label w-100 mb-2">Account number</label>
								<div className="row no-gutters">
									<input
										type="password" autoComplete="off"
										name="account_number"
										className="form-control form-control-lg "
										placeholder="Enter Account number"
									/>
								</div>
							</div>

							{/* <div className="col-lg-6">
                                <div className="form-group mt-1 mb-3">
                                    <label className="w-100 mb-1">Upload Document
                                                    <a href="#" className="btn btn-primary add-icon"><i className="fa fa-plus"></i></a>
                                    </label>
                                    <div className="custom-file">
                                        <input type="file" className="form-control custom-file-input" id="customFile" aria-label="File upload" />
                                        <label className="custom-file-label" htmlFor="customFile">Upload</label>
                                    </div>
                                </div>
                            </div> */}
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
									className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
								>
									SUBMIT <i className="fa fa-angle-right"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Step6;
