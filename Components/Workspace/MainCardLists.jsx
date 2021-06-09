import { WORKSPACE_CREATE_URL } from "constants";
import Link from "next/link";
import EmptyWorkspaceCard from "./EmptyWorkspaceCard";

const MainCardLists = ({ workspaces = [] }) => {
  return (
    <>
      <div className="row">
        <div className="col-xl-12 mb-3 p-2  bg_theme_primary   bg-primary shadow-soft border-light    ">
          <h2 className="text-capitalize title">
            workspace
            <Link
            href={`${WORKSPACE_CREATE_URL}`}
            >

            <a className="float-right mx-1 btn btn-pill mb-sm-0 text_theme_primary custom_btn active">
              + Add New
            </a>
            </Link>
          </h2>
          <div className="row mt-2">
            {workspaces.length == 0 && <EmptyWorkspaceCard />}
            {workspaces &&
              workspaces.map((list, idx) => {
                return (
                  <div className="col-xl-4 col-md-6" key={idx}>
                    <div
                      className={`card p-1 bg-primary shadow-soft border-light not-interested-box ${
                        idx == 0 && "default_gradient shadow-soft-in"
                      }`}
                    >
                      <div className="card-body">
                        {/* title */}
                        <div className="text-default d-flex align-items-center font-medium-5 pb-1 font-weight-bold">
                          {list.location_address}
                        </div>
                        <div className="lead-contact">
                          <i className="fa fa-map-marker"></i>{"  "}
                          {list.location_address}
                        </div>
                        <div className="lead-contact">
                          <i className="fa fa-phone"></i>{" "}
                          {list?.phones[0]?.phone}
                        </div>
                        <div className="lead-contact">
                          <i className="fa fa-mail-forward"></i>{" "}
                          {list?.emails[0]?.email}
                        </div>
                        {/* // <div className="lead-date-time">
                        //   <span>
                        //     <i className="fa fa-clock-o"></i> 10:00 PM
                        //   </span>
                        //   <span>
                        //     <i className="fa fa-calendar"></i> 14 Feb 2021
                        //   </span>
                        // </div> */}
                        <div className="bottom-btn text-center">
                          {/* <a className="float-right mx-1 btn btn-pill mb-sm-0 text_theme_primary custom_btn active">
                              + Add New
                            </a> */}
                          <button className="btn btn-primary custom_btn_card mr-1">
                            <i className="fa fa-edit"></i> Edit
                          </button>
                          <button
                            href="#"
                            className="btn btn-primary custom_btn_card"
                          >
                            <i className="fa fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* <div className="col-12 mb-5">
          <a
            href="#"
            className="float-left mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
          >
            <i className="fa fa-angle-left"></i> BACK
          </a>
          <a
            href="#"
            className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
          >
            Home Page <i className="fa fa-angle-right"></i>
          </a>
        </div>
       */}
      </div>
    </>
  );
};

export default MainCardLists;
