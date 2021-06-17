import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setCookie } from 'services';

const Step6 = ({ currentData, goToNextStep, goToPrevStep }) => {
	/** Input */
	const [stepInput, setStepInput] = useState({});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setStepInput(currentData);
		reset({ ...currentData });
	}, []);



	/** SUBMITTING FORM */
	const onSubmit = (inputData) => {
		let UpdatedData = {}
		if (stepInput) {
			UpdatedData = {
				...stepInput,
				...inputData,
			};
		} else {
			UpdatedData = {
				...inputData,
			};
		}
		setCookie("step6", UpdatedData);
		console.log("SAVED!!");
		goToNextStep(UpdatedData);
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
										defaultValue={stepInput?.bank_name}
										{...register('bank_name', {
											required: "Bank name is required"
										})}
									/>
									{errors.bank_name && (
										<span className=" text-danger">
											{errors.bank_name.message}
										</span>
									)}
								</div>
							</div>
							<div className="form-group col-6">
								<label className="top-label w-100 mb-2">IFSC Code</label>
								<div className="row no-gutters">
									<input
										type="text"
										name="bank_ifsc_code"
										className="form-control form-control-lg "
										placeholder="Enter Bank IFSC  Code"
										defaultValue={stepInput?.bank_ifsc_code}
										{...register('bank_ifsc_code', {
											required: "Bank IFSC is required"
										})}
									/>
									{errors.bank_ifsc_code && (
										<span className=" text-danger">
											{errors.bank_ifsc_code.message}
										</span>
									)}
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
										defaultValue={stepInput?.bank_account_number}
										{...register('bank_account_number', {
											required: "Account number is required"
										})}
									/>
									{errors.bank_account_number && (
										<span className=" text-danger">
											{errors.bank_account_number.message}
										</span>
									)}
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
									onClick={handleSubmit(onSubmit)}
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
