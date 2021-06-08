const LeaveManagement = () => {
  const MODULE_NAME = "announcement";
  const offer = {
    name: "announcement Management",
    description: "This is the dummy announcement entry...",
    expiry_date: new Date().toDateString(),
    is_active: "",
  };

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
                  <div className="col-lg-3 col-sm-6 col-12">
                    <h3 className="wizard-title text_theme_primary text-left text-capitalize">
                      {MODULE_NAME}
                      {/* <div className="badge badge-light badge-sm text_theme_primary badge-pill">{offers.length}</div> */}
                    </h3>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-25 offset-lg-6 text-sm-right text-center">
                    {/* <Link href={`${offerS_CREATE_URL}`}>
                                            <a className={"btn btn-pill mb-sm-0 mb-2 waves-effect waves-light text_theme_primary "}
                                                onMouse>
                                                <i className="fa fa-plus"> </i>{" "}
                                            Add New offer
                                        </a>
                                        </Link> */}
                  </div>
                </div>

                <div className="pb-4 mt-1">
                  <div className="table-responsive-sm shadow-soft rounded">
                    {/* {offers.length == 0 && <div className="p-5 font-large-1 text-center">No offers <b>found!</b></div>} */}
                    {/* {offers.length > 0 && */}
                    <table className="table membership-table table-hover table-borderless ">
                      <thead>
                        <tr>
                          <th className="table-date table-primary text-capitalize">
                            Name
                          </th>
                          <th className="table-date table-primary text-capitalize">
                            Description
                          </th>
                          <th className="table-date table-primary text-capitalize">
                            Date
                          </th>
                          <th className="table-date table-primary text-capitalize">
                            Active
                          </th>
                          <th className="table-date table-primary text-capitalize">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {offers.map(offer => {
                                                    return ( */}
                        {/* key={offer.id} */}
                        <tr>
                          <td className="text-center text-capitalize">
                            {offer.name}{" "}
                          </td>
                          <td className="text-center ">{offer.description}</td>
                          <td className="text-center ">{offer.expiry_date}</td>
                          <td className="text-center ">
                            {offer.is_active ? "YES" : "NO"}
                          </td>
                          {/* <td className="text-center edit-delete-member-rate "> */}
                          <td className="text-center ">
                            {/* <Link href={`${offerS_UPDATE_URL}/${offer.id}`}>
                                                                    <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                                                                        <i className="fa fa-edit"></i>
                                                                    </div>
                                                                </Link> */}
                            <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                              <i className="fa fa-trash"></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center text-capitalize">
                            {offer.name}{" "}
                          </td>
                          <td className="text-center ">{offer.description}</td>
                          <td className="text-center ">{offer.expiry_date}</td>
                          <td className="text-center ">
                            {offer.is_active ? "YES" : "NO"}
                          </td>
                          {/* <td className="text-center edit-delete-member-rate "> */}
                          <td className="text-center ">
                            {/* <Link href={`${offerS_UPDATE_URL}/${offer.id}`}>
                                                                    <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                                                                        <i className="fa fa-edit"></i>
                                                                    </div>
                                                                </Link> */}
                            <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                              <i className="fa fa-trash"></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center text-capitalize">
                            {offer.name}{" "}
                          </td>
                          <td className="text-center ">{offer.description}</td>
                          <td className="text-center ">{offer.expiry_date}</td>
                          <td className="text-center ">
                            {offer.is_active ? "YES" : "NO"}
                          </td>
                          {/* <td className="text-center edit-delete-member-rate "> */}
                          <td className="text-center ">
                            {/* <Link href={`${offerS_UPDATE_URL}/${offer.id}`}>
                                                                    <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                                                                        <i className="fa fa-edit"></i>
                                                                    </div>
                                                                </Link> */}
                            <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                              <i className="fa fa-trash"></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center text-capitalize">
                            {offer.name}{" "}
                          </td>
                          <td className="text-center ">{offer.description}</td>
                          <td className="text-center ">{offer.expiry_date}</td>
                          <td className="text-center ">
                            {offer.is_active ? "YES" : "NO"}
                          </td>
                          {/* <td className="text-center edit-delete-member-rate "> */}
                          <td className="text-center ">
                            {/* <Link href={`${offerS_UPDATE_URL}/${offer.id}`}>
                                                                    <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                                                                        <i className="fa fa-edit"></i>
                                                                    </div>
                                                                </Link> */}
                            <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                              <i className="fa fa-trash"></i>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center text-capitalize">
                            {offer.name}{" "}
                          </td>
                          <td className="text-center ">{offer.description}</td>
                          <td className="text-center ">{offer.expiry_date}</td>
                          <td className="text-center ">
                            {offer.is_active ? "YES" : "NO"}
                          </td>
                          {/* <td className="text-center edit-delete-member-rate "> */}
                          <td className="text-center ">
                            {/* <Link href={`${offerS_UPDATE_URL}/${offer.id}`}>
                                                                    <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                                                                        <i className="fa fa-edit"></i>
                                                                    </div>
                                                                </Link> */}
                            <div className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary">
                              <i className="fa fa-trash"></i>
                            </div>
                          </td>
                        </tr>
                        {/* )
                                                })} */}
                      </tbody>
                    </table>
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
