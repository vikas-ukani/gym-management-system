import { useAxios } from 'hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usersListAPI } from 'services/users';
import { USERS_CREATE_URL } from 'constants';

const UserLists = () => {
	const [users, setUsers] = useState([]);

	const callingUserData = async () => {
		const { response, error, loading, statusCode } = await useAxios(usersListAPI());
		if (statusCode === 200) {
			let { list } = response.data;
			setUsers(list);
		} else {
			console.log('error', error);
		}
	};

	useEffect(async () => {
		callingUserData();
	}, []);

	return (
		<div>
			<div className="content-body">
				<section>
					<div className="row">
						<div className="col-lg-3 col-sm-6 col-12">
							<h3 className="wizard-title text_theme_primary text-left">Users List</h3>
						</div>
						<div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-2 offset-lg-6 text-sm-right text-center">
							<Link href={USERS_CREATE_URL}>
								<a
									className={
										'btn btn-pill btn-primary mb-sm-0 mb-2 waves-effect waves-light text_theme_primary'
									}
								>
									<i className="fa fa-plus"> </i> Add New User
								</a>
							</Link>
						</div>
					</div>

					<div className="pb-4 mt-1">
						<div className="table-responsive-sm shadow-soft rounded">
							<table className="table membership-table">
								<tbody>
									<tr>
										<th className="table-date table-primary">User Name</th>
										<th className="table-date table-primary">Email</th>
										<th className="table-date table-primary">Mobile</th>
										<th className="table-date table-primary">Active</th>
										<th className="table-date table-primary">Actions</th>
									</tr>
									{users.map((user) => {
										return (
											<tr key={user.id}>
												<td className="text-center text-capitalize">
													{user.first_name} {user?.last_name}
												</td>
												<td className="text-center " className="text-center">
													{user.email}
												</td>
												<td className="text-center ">{user.mobile}</td>
												<td className="text-center ">{user.is_active ? 'YES' : 'NO'}</td>
												{/* <td className="text-center edit-delete-member-rate "> */}
												<td className="text-center">
													<div className="btn btn-primary p-50 round m-50 waves-effect waves-light">
														<i className="fa fa-edit"></i>
													</div>
													<div className="btn btn-primary p-50 round m-50 waves-effect waves-light">
														<i className="fa fa-trash"></i>
													</div>
												</td>
											</tr>
										);
									})}

									{/* <tr>
                                        <td colspan="4" className="text-center">
                                            <a href="#" className="btn btn-pill btn-primary waves-effect waves-light">+ Add Package</a>
                                        </td>
                                    </tr> */}
								</tbody>
							</table>
						</div>
						{/* <div className="row mt-2">
                            <div className="col-12">
                                <a href="#" className="btn bg-gradient-primary round btn-lg waves-effect waves-light">SAVE <i className="fa fa-angle-right"></i></a>
                            </div>
                        </div> */}
					</div>
				</section>
			</div>
		</div>
	);
};

export default UserLists;
