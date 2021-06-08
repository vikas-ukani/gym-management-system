import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usersCreateAPI, usersRoleListAPI } from 'services/users';
import { useAxios } from 'hooks';
import { useToasts } from 'react-toast-notifications';
import router from 'next/router';
import { USERS_LIST_URL } from 'constants';
import Link from 'next/link';

const Create = () => {
	const { addToast } = useToasts();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const password = useRef({});
	password.current = watch('password', '');
	const [roles, setRoles] = useState([]);

	useEffect(async () => {
		const { response, statusCode } = await useAxios(usersRoleListAPI());
		if (statusCode == 200) {
			let rolesList = response?.data;
			if (rolesList) {
				setRoles(rolesList);
			}
		}
	}, []);

	const onSubmit = async (input) => {
		if (input.is_active === 'true') {
			input.is_active = true;
		} else {
			input.is_active = false;
		}
		input.role_ids = [5];
		const { response, error, loading, statusCode } = await useAxios(usersCreateAPI(input));
		if (statusCode == 400 || statusCode == 422) {
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} else if (statusCode === 201) {
			addToast(response.message, { appearance: 'success', autoDismiss: true });
			router.push(USERS_LIST_URL);
		}
	};

	return (
		<div>
			<div className="app-content content">
				<div className="content-overlay"> </div>
				<div className="header-navbar-shadow"> </div>
				<div className="content-wrapper">
					<div className="content-header row"> </div>

					<div className="content-body">
						<section>
							<h3 className="wizard-title text-capitalize text-left mb-3 text_theme_primary">
								Add User Details
							</h3>
							<form role="form">
								<div className="tab-content">
									<div className="tab-pane active" role="tabpanel" id="step1">
										<div className="row">
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label">First Name</label>
													<input
														type="text"
														className="form-control form-control-lg"
														name="first_name"
														{...register('first_name', {
															required: 'The first name is required.',
														})}
													/>
													{errors.first_name && (
														<p className=" text-danger">{errors.first_name.message}</p>
													)}
												</div>
											</div>

											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label">Last Name</label>
													<input
														type="text"
														className="form-control form-control-lg"
														name="last_name"
														{...register('last_name', {
															required: 'The last name is required.',
														})}
													/>
													{errors.last_name && (
														<p className=" text-danger">{errors.last_name.message}</p>
													)}
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label">Email</label>
													<input
														type="text"
														className="form-control form-control-lg"
														name="email"
														{...register('email', {
															required: 'The email is required.',
															pattern: {
																value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
																message: 'Enter a valid e-mail address',
															},
														})}
													/>
													{errors.email && (
														<p className=" text-danger">{errors.email.message}</p>
													)}
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label text-capitalize">mobile</label>
													<input
														type="text"
														className="form-control form-control-lg"
														name="mobile"
														{...register('mobile', {
															required: 'The mobile is required.',
															pattern: {
																value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
																message: 'Enter a valid mobile number ',
															},
														})}
													/>
													{errors.mobile && (
														<p className=" text-danger">{errors.mobile.message}</p>
													)}
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label text-capitalize">password</label>
													<input
														type="text"
														className="form-control form-control-lg"
														name="password"
														{...register('password', {
															required: 'The password is required.',
														})}
													/>
													{errors.password && (
														<p className=" text-danger">{errors.password.message}</p>
													)}
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label text-capitalize">
														password confirmation
													</label>
													<input
														type="text"
														className="form-control form-control-lg"
														name="password_confirmation"
														{...register('password_confirmation', {
															required: 'The password confirmation is required.',
															validate: (value) =>
																value === password.current ||
																'The confirm passwords do not match',
														})}
													/>
													{errors.password_confirmation && (
														<p className=" text-danger">
															{errors.password_confirmation.message}
														</p>
													)}
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label">User Role </label>
													<div className="form-group">
														<div className="form-group">
															<div className="form-group">
																<select
																	className="select2 form-control"
																	name="role_ids"
																	{...register('role_ids', {
																		required: 'The role is required.',
																	})}
																>
																	<option value="">Select an User Role.</option>
																	{roles.map((role) => {
																		return (
																			<option key={role.id} value={role.id}>
																				{role.name}
																			</option>
																		);
																	})}
																</select>
															</div>
															{errors.role_ids && (
																<p className=" text-danger">
																	{errors.role_ids.message}
																</p>
															)}
														</div>

														{/* <Select
															closeMenuOnSelect={false}
															components={animatedComponents}
															defaultValue={[{ value: 2, label: 'SAdmin' }]}
															isMulti
															onChange={this.onChange}
															options={roles}
														/> */}
														{/* {...register("role_ids", {
                                                            required: "The role is required.",
                                                        })} */}
													</div>
												</div>
											</div>
											<div className="col-xl-6">
												<div className="col-xl-12">
													<div className="form-group">
														<label className="text-capitalize"> active</label>
														<ul className="list-unstyled mb-0">
															<li className="d-inline-block mr-2">
																<fieldset>
																	<div className="vs-radio-con">
																		<input
																			type="radio"
																			name="is_active"
																			defaultChecked={true}
																			value={true}
																			{...register('is_active', {
																				required: 'The active is required.',
																			})}
																		/>
																		<span className="vs-radio">
																			<span className="vs-radio--border"></span>
																			<span className="vs-radio--circle"></span>
																		</span>
																		<span className=""> Active </span>
																	</div>
																</fieldset>
															</li>
															<li className="d-inline-block mr-2">
																<fieldset>
																	<div className="vs-radio-con">
																		<input
																			type="radio"
																			name="is_active"
																			defaultChecked={false}
																			value={false}
																			{...register('is_active', {
																				required: 'The active is required.',
																			})}
																		/>
																		<span className="vs-radio">
																			<span className="vs-radio--border"></span>
																			<span className="vs-radio--circle"></span>
																		</span>
																		<span className="">Inactive</span>
																	</div>
																</fieldset>
															</li>
														</ul>
													</div>
												</div>
												{/* {errors.is_active && <p className=" text-danger">{errors.is_active.message}</p>} */}
											</div>
										</div>
										<div className="row my-1">
											<div className="col-6 "></div>
											<div className="col-6  ">
												{/* className="btn bg-gradient-primary round btn-lg mr-1 mb-1 mr-auto float-right next-step text-white" */}
												<button
													onClick={handleSubmit(onSubmit)}
													className={
														'float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn default_gradient'
													}
												>
													Create{' '}
												</button>
												<Link href={`/users`}>
													<a
														className={
															'float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn'
														}
													>
														Cancel
													</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</form>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Create;
