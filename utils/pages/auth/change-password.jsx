import { useRef, useState } from 'react';
import router from 'next/router';
import { DASHBOARD_URL } from 'constants';
import { useForm } from 'react-hook-form';
import { useAxios } from 'hooks';
import { changePasswordAPI, newPasswordAPI } from 'services/auth';
import axios from 'axios';
import { getToken, getUserId } from 'services';
import { useToasts } from 'react-toast-notifications';

const ChangePassword = () => {
	const { addToast } = useToasts();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	// const [current_password, setCurrentPassword] = useState('')
	// const [password, setPassword] = useState('')
	// const [password_confirmation, setpassword_confirmation] = useState('')

	const password = useRef({});
	password.current = watch('password', '');

	const onSubmit = async (input) => {
		const userId = getUserId();
		const { response, error, loading, statusCode } = await useAxios(changePasswordAPI(input, userId));
		if (statusCode == 400 || statusCode == 422) {
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} else if (statusCode === 200) {
			addToast(response.message, { appearance: 'success', autoDismiss: true });
			router.push(DASHBOARD_URL);
		}
	};

	return (
		<div>
			<div>
				<div className="app-content content">
					<div className="content-overlay"></div>
					<div className="header-navbar-shadow"></div>
					<div className="content-wrapper">
						<section>
							<h3 className="wizard-title">Update Password</h3>
							<div className="wizard">
								<div className="col-md-6 offset-md-3 justify-content-center">
									<div className="mt-2">
										<form>
											<div className="col-xl-12">
												<div className="form-group">
													<label htmlFor="exampleInputIcon3">Current Password</label>
													<div className="input-group">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<span className="fa fa-lock"></span>
															</span>
														</div>
														<input
															className="form-control form-control-lg"
															placeholder="Current Password"
															type="password"
															{...register('current_password', {
																required: 'The current password field is required',
															})}
														/>
													</div>
													{errors.current_password && (
														<span className="mt-5 text-danger">
															{errors.current_password.message}
														</span>
													)}
												</div>
											</div>

											<div className="col-xl-12">
												<div className="form-group">
													<label htmlFor="exampleInputIcon3">New Password</label>
													<div className="input-group">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<span className="fa fa-lock"></span>
															</span>
														</div>
														<input
															className="form-control form-control-lg"
															placeholder="New Password"
															type="password"
															name="password"
															{...register('password', {
																required: 'The password field is required',
															})}
														/>
													</div>
													{errors.password && (
														<span className="mt-2 text-danger">
															{errors.password.message}
														</span>
													)}
												</div>
											</div>

											<div className="col-xl-12">
												<div className="form-group">
													<label htmlFor="exampleInputIcon3">Confirmed Password</label>
													<div className="input-group">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<span className="fa fa-lock"></span>
															</span>
														</div>
														<input
															className="form-control form-control-lg"
															placeholder="Confirmed Password"
															type="password"
															name="password_confirmation"
															{...register('password_confirmation', {
																required: 'The current password field is required',
																validate: (value) =>
																	value === password.current ||
																	'The confirm passwords do not match',
															})}
														/>
													</div>
													{errors.password_confirmation && (
														<span className="mt-2 text-danger">
															{errors.password_confirmation.message}
														</span>
													)}
												</div>
											</div>

											<div className="col-xl-12 pb-5">
												{/* "step-2.html" */}
												<button
													className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn default_gradient"
													onClick={handleSubmit(onSubmit)}
												>
													Update Password <i className="fa fa-angle-right"> </i>
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
