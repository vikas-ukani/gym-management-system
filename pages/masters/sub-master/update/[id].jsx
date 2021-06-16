import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserByIdAPI, getUserByIdAPI, usersRoleListAPI } from 'services/users';
import { useAxios } from 'hooks';
import { useToasts } from 'react-toast-notifications';
import router, { useRouter } from 'next/router';
import { USERS_LIST_URL } from 'constants';
import Link from 'next/link';
import { Select } from 'antd';

const UpdateUser = ({ id }) => {
	const [user, setUser] = useState(null);
	const [roles, setRoles] = useState([]);
	const [selectedRoles, setSelectedRoles] = useState([]);

	const { addToast } = useToasts();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		reValidateMode: "onSubmit"
	  });

	useEffect(async () => {
		const { response, statusCode } = await useAxios(usersRoleListAPI());
		if (statusCode == 200) {
			let rolesList = response?.data;
			if (rolesList) {
				setRoles(rolesList);
			}
		}

		if (id) {
			const {
				response: { data },
				statusCode,
			} = await useAxios(getUserByIdAPI(id));
			if (statusCode == 200) {
				setUser(data);
				if (data && data.roles) {
					setSelectedRoles([data?.roles[0]?.id]);
				}
				reset({ defaultValue: { ...user, role_ids: selectedRoles } });
			}
		}
	}, []);

	if (!id) {
		return <div></div>;
	}
	const onSubmit = async (input) => {
		if (selectedRoles && selectedRoles.length == 0) {
			addToast('Please select any user role.', { appearance: 'error', autoDismiss: true });
			return false;
		}
		if (input.is_active === 'true' || input.is_active === 1) {
			input.is_active = true;
		} else {
			input.is_active = false;
		}
		input.role_ids = selectedRoles;
		const { response, error, loading, statusCode } = await useAxios(updateUserByIdAPI(input, id));
		if (statusCode == 400 || statusCode == 422) {
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} else if (statusCode === 200) {
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
							<div className="row">
								<div className="col-lg-3 col-sm-6 col-12">
									<h3 className="wizard-title text_theme_primary text-left">Update User</h3>
								</div>
								{/* <div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-25 offset-lg-6 text-sm-right text-center">
                                    <Link href={"/users/create"}>
                                        <a className={"btn btn-pill btn-primary mb-sm-0 mb-2 waves-effect waves-light text_theme_primary"}>
                                            <i className="fa fa-plus"> </i>{" "}
                                            Add New User
                                        </a>
                                    </Link>
                                </div> */}
							</div>
							<form role="form" className="pb-4 mt-1">
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
														defaultValue={user?.first_name}
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
														defaultValue={user?.last_name}
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
														defaultValue={user?.email}
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
														defaultValue={user?.mobile}
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
											{/* <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label className="top-label text-capitalize">password</label>
                                                    <input type="text" className="form-control form-control-lg"
                                                        name="password"
                                                        {...register("password", {
                                                            required: "The password is required.",
                                                        })}
                                                    />
                                                    {errors.password && <p className=" text-danger">{errors.password.message}</p>}
                                                </div>
                                            </div> */}
											{/* <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label className="top-label text-capitalize">password confirmation</label>
                                                    <input type="text" className="form-control form-control-lg"
                                                        name="password_confirmation"
                                                        {...register("password_confirmation", {
                                                            required: "The password confirmation is required.",
                                                            validate: value =>
                                                                value === password.current || "The confirm passwords do not match"
                                                        })}
                                                    />
                                                    {errors.password_confirmation && <p className=" text-danger">{errors.password_confirmation.message}</p>}
                                                </div>
                                            </div> */}
											<div className="col-xl-6">
												<div className="form-group">
													<label className="top-label">User Role </label>
													<div className="form-group">
														<Select
															mode="multiple"
															placeholder="Select any roles."
															value={selectedRoles}
															style={{ width: '100%' }}
															onChange={(role) => setSelectedRoles(role)}
															name="role_ids"
														>
															{roles.map((role) => {
																return (
																	<Select.Option key={role.id} value={role.id}>
																		{role.name}
																	</Select.Option>
																);
															})}
														</Select>
														{errors.role_ids && (
															<p className=" text-danger">{errors.role_ids.message}</p>
														)}
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
																			defaultChecked={
																				user?.is_active === true ||
																				user?.is_active === 1
																			}
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
																			defaultChecked={
																				user?.is_active === false ||
																				user?.is_active === 0
																			}
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
														{errors.is_active && (
															<p className=" text-danger">{errors.is_active.message}</p>
														)}
													</div>
												</div>
												{/* {errors.is_active && <p className=" text-danger">{errors.is_active.message}</p>} */}
											</div>
										</div>
										<div className="row">
											<div className="col-6 "></div>
											<div className="col-6  ">
												{/* className="float-right btn bg-gradient-primary round btn-lg mr-1 mb-1 mr-auto  next-step text-white" */}
												<button
													onClick={handleSubmit(onSubmit)}
													className={
														'float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient'
													}
												>
													Update{' '}
												</button>
												<Link href={`${USERS_LIST_URL}`}>
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

export const getServerSideProps = async ({ params }) => {
	return { props: { id: params.id } };
};

export default UpdateUser;
