import { useAxios } from "hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  usersListAPI,
  updateActiveDeactiveIdAPI,
  deleteUserByIdAPI,
} from "services/users";
import { USERS_CREATE_URL, USERS_UPDATE_URL } from "constants";
import { filter, findWhere } from "underscore";
import { Switch } from "antd";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const Users = () => {
  const { addToast } = useToasts();

  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const callingUserData = async () => {
    const { response, error, loading, statusCode } = await useAxios(
      usersListAPI()
    );
    if (statusCode === 200) {
      let { list, count } = response.data;
      setTotalCount(count);
      setUsers(list);
    } else {
    }
  };

  useEffect(async () => {
    callingUserData();
  }, []);

  const deleteRow = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let oldLists = users;
        const foundList = findWhere(oldLists, { id });
        if (foundList && foundList.id) {
          const { response, error, loading, statusCode } = await useAxios(
            deleteUserByIdAPI(id)
          );
          if (statusCode === 200) {
            let newLists = filter(oldLists, (list) => list.id !== foundList.id);
            setUsers(newLists);
            setTotalCount(totalCount - 1);
            addToast(response.message, {
              appearance: "success",
              autoDismiss: true,
            });
          } else {
            addToast(response.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
        Swal.fire("Deleted!", "", "success");
      }
    });

    if (foundUser && foundUser.id) {
      // const { response, error, loading, statusCode } = await useAxios(deleteUserByIdAPI(id))
      // if (statusCode === 200) {
      //     let newUsers = filter(oldUsers, user => user.id !== foundUser.id)
      //     console.log('newUsers', newUsers);
      //     setUsers(newUsers)
      //     addToast(response.message, { appearance: 'success', autoDismiss: true })
      // } else {
      //     addToast(response.message, { appearance: 'error', autoDismiss: true })
      // }
    }
  };

  const onActiveChange = async (checked, id) => {
    // updateActiveDeactiveIdAPI
    let params = { is_active: checked };
    const { response, error, loading, statusCode } = await useAxios(
      updateActiveDeactiveIdAPI(params, id)
    );
    if (statusCode === 200) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(response.message, { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"> </div>
          {/* <UserLists /> */}
          <div className="content-body">
            <section>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <h3 className="wizard-title text_theme_primary text-left">
                    Users List{" "}
                    <div className="badge badge-light badge-sm text_theme_primary badge-pill">
                      {totalCount}
                    </div>
                  </h3>
                </div>
                <div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-25 offset-lg-6 text-sm-right text-center">
                  <Link href={`${USERS_CREATE_URL}`}>
                    <button
                      className={
                        "btn btn-pill mb-sm-0 mb-2 waves-effect waves-light text_theme_primary custom_btn"
                      }
                    >
                      <i className="fa fa-plus"> </i> Add New User
                    </button>
                  </Link>
                </div>
              </div>

              <div className="pb-4 mt-1">
                <div className="table-responsive-sm shadow-soft rounded">
                  {users.length == 0 && (
                    <div className="p-5 font-large-1 text-center">
                      {" "}
                      Loading...
                    </div>
                  )}
                  {users.length > 0 && (
                    <table className="table membership-table table-hover table-borderless ">
                      <thead>
                        <tr>
                          <th className="table-date table-primary">
                            User Name
                          </th>
                          <th className="table-date table-primary">Email</th>
                          <th className="table-date table-primary">Mobile</th>
                          <th className="table-date table-primary">Role</th>
                          <th className="table-date table-primary">Active</th>
                          <th className="table-date table-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => {
                          return (
                            <tr key={user.id}>
                              {/* <td className="text-center text-capitalize">
																<img src={"https://images.pexels.com/photos/3405555/pexels-photo-3405555.png?auto=compress&crop=entropy&cs=tinysrgb&dpr=2&fit=crop&h=50&w=50"}
																	class="mx-auto d-block rounded-circle img-sm" alt="User" />
															</td> */}
                              <td className="text-center text-capitalize">
                                {user.first_name} {user?.last_name}
                              </td>
                              <td
                                className="text-center "
                                className="text-center"
                              >
                                {user.email}
                              </td>
                              <td className="text-center ">{user.mobile}</td>
                              <td className="text-center ">
                                <div className="badge badge-secondary text-dark font-weight-bold p-50">
                                  {user?.roles[0]?.name}
                                </div>
                              </td>
                              <td className="text-center ">
                                <Switch
                                  defaultChecked={user.is_active}
                                  onChange={(e) => onActiveChange(e, user.id)}
                                />
                              </td>
                              {/* <td className="text-center edit-delete-member-rate "> */}
                              <td className="text-center ">
                                <Link href={`${USERS_UPDATE_URL}/${user.id}`}>
                                  <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary custom_btn">
                                    <i className="fa fa-edit"></i>
                                  </div>
                                </Link>

                                <div
                                  onClick={() => deleteRow(user.id)}
                                  className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary"
                                >
                                  <i className="fa fa-trash"></i>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
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
      </div>
    </div>
  );
};

export default Users;
