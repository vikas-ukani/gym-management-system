import Link from "next/link";

import { LEAVE_MANAGEMENT_CREATE_URL } from "constants";
import moment from "moment";
import { useEffect, useState } from "react";
import { getUserId, userDetail } from "services";
import { USER_ROLE_GYM_OWNER } from "constants";
import LeaveManagementGymOwner from "Components/LeaveManagement/LeaveManagementGymOwner";

const LeaveManagement = () => {

  const MODULE_NAME = "Leave Management";

  const [userType, setUserType] = useState('')

  const leaves = [
    {
      name: "Leave Management",
      description: "This is the dummy leave entry...",
      expiry_date: new Date().toDateString(),
      requested_by: "Alex",
      status: "pending",
    },
    {
      name: "Leave Management",
      description: "This is the dummy leave entry...",
      expiry_date: new Date().toDateString(),
      requested_by: "Martine",
      status: "approved",
    },

    {
      name: "Leave Management",
      description: "This is the dummy leave entry...",
      expiry_date: new Date().toDateString(),
      requested_by: "John",
      status: "rejected",
    },
  ];

  useEffect(() => {
    setUserType(userDetail()?.role)
  })

  return (
    <div>
      <div>
        <div className="app-content content">
          <div className="content-overlay"></div>
          <div className="header-navbar-shadow"></div>
          <div className="content-wrapper">
            <div className="content-header row"> </div>
            <div className="content-body">
              <section>
                <div className="row">
                  <div className="col-6 ">
                    <h3 className="wizard-title text_theme_primary text-left text-capitalize">
                      {MODULE_NAME}
                      {/* <div className="badge badge-light badge-sm text_theme_primary badge-pill">{offers.length}</div> */}
                    </h3>
                  </div>
                  <div className="col-6  mb-lg-0 mt-sm-25 text-sm-right text-center">
                    <Link href={`leave-management/history`}>
                      <a
                        className={
                          "btn btn-pill mb-sm-0 mb-2 waves-effect waves-light text_theme_primary px-1 mx-1  "
                        }
                      >
                        <i className="fa fa-bar-chart-o"> </i> Leave Request History
                      </a>
                    </Link>
                    <Link href={`${LEAVE_MANAGEMENT_CREATE_URL}`}>
                      <a
                        className={
                          "btn btn-pill mb-sm-0 mb-2 waves-effect waves-light text_theme_primary px-1"
                        }
                      >
                        <i className="fa fa-plus"> </i> New Leave Request
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="pb-4 mt-1">
                    {/* IF GYM_OWNER FOUND THEN SHOW LEAVE QUATES */}
                    {userType == USER_ROLE_GYM_OWNER && <LeaveManagementGymOwner />}
                    <div className="table-responsive-sm shadow-soft rounded">
                    {/* {offers.length == 0 && <div className="p-5 font-large-1 text-center">No offers <b>found!</b></div>} */}
                    {/* {offers.length > 0 && */}
                    {userType != USER_ROLE_GYM_OWNER && (
                      <table className="table membership-table table-hover table-borderless ">
                        <thead>
                          <tr>
                            {/* <th className="table-date table-primary text-capitalize"></th> */}
                            <th colSpan="2" className="table-date table-primary text-capitalize">
                              Date
                            </th>
                            <th className="table-date table-primary text-capitalize">
                              Name
                            </th>
                            <th className="table-date table-primary text-capitalize">
                              Description
                            </th>
                            <th className="table-date table-primary text-capitalize">
                              Reqeusted By
                            </th>
                            <th className="table-date table-primary text-capitalize">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaves.map((leave, idx) => {
                            return (
                              <tr key={leave.id}>
                                <td width="10%" className="right text-center p-1">
                                  <div className="bg-danger p-25 rounded-circle ">
                                    <div className=" pt-50 pb-0 font-small-4 ">
                                      1.5
                                    </div>
                                    <div className="pb-50 font-medium-3 ">
                                      Day
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center ">
                                  <div className="d-flex">
                                    <div className="card w-50 mb-0">
                                      <div className="pt-75 bg_primary rounded-top pb-25">
                                        From
                                      </div>
                                      <div className="p-50 border_primary rounded-bottom">
                                        {moment().format('DD-MM-YYYY')}
                                      </div>
                                    </div>
                                    <div className="align-self-center px-25 font-weight-bolder font-medium-3">
                                      -
                                    </div>
                                    <div className="card w-50   mb-0">
                                      <div className="pt-75 bg_primary rounded-top pb-25">
                                        To
                                      </div>
                                      <div className="p-50 border_primary rounded-bottom">
                                        {moment().format('DD-MM-YYYY')}
                                      </div>
                                    </div>
                                  </div>
                                  {/* {leave.expiry_date} */}
                                </td>
                                <td className="text-center text-capitalize">
                                  {leave.name}{" "}
                                </td>
                                <td className="text-center ">
                                  {leave.description}
                                </td>
                                <td className="text-center ">
                                  {leave.requested_by}
                                </td>

                                <td className="text-center ">
                                  {leave.status == "pending" && (
                                    <>
                                      <div className="btn btn-primary py-75 px-1  m-50 text_theme_primary default_gradient custom_btn">
                                        <span className="text-white">
                                          Approve
                                        </span>
                                      </div>
                                      <div className="btn btn-primary py-75 px-1  m-50 text_theme_primary custom_btn">
                                        Reject
                                      </div>
                                    </>
                                  )}
                                  {leave.status == "approved" && (
                                    <div className="btn btn-primary py-75 px-1  m-50 text_theme_primary custom_btn text-success">
                                      Approved
                                    </div>
                                  )}
                                  {leave.status == "rejected" && (
                                    <div className="btn btn-primary py-75 px-1  m-50 text_theme_primary custom_btn ">
                                      <span className="text-danger">
                                        Rejected
                                      </span>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
