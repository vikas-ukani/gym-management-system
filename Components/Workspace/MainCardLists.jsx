import { WORKSPACE_CREATE_URL } from "constants";
import { useAxios } from "hooks";
import Link from "next/link";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { setDefaultWorkspaceAPI } from "services/workspace";
import Swal from "sweetalert2";
import { findWhere } from "underscore";
import {
  MODEL_CANCEL_CLASSES,
  MODEL_CONFIRM_CLASSES,
} from "utils/button-classes";
import EmptyWorkspaceCard from "./EmptyWorkspaceCard";

const MainCardLists = ({ workspaces = [] }) => {
  const [activeRecordId, setActiveRecordId] = useState();
  const activeClass = "default_gradient shadow-soft-in";

  const { addToast } = useToasts();

  const setDetafaultCard = (id) => {
    console.log("ID", id);
    return false;
    Swal.fire({
      title: "Are you sure you want to set it default workspace?",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      customClass: {
        cancelButton: MODEL_CANCEL_CLASSES,
        confirmButton: MODEL_CONFIRM_CLASSES,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        let oldLists = workspaces;
        const foundList = findWhere(oldLists, { id });
        if (foundList && foundList.id) {
          let params = { is_default: 1 };
          const { response, error, loading, statusCode } = await useAxios(
            setDefaultWorkspaceAPI(id, params)
          );
          if (statusCode === 200) {
            setActiveRecordId(id);
            let newLists = oldLists.map((list) => {
              if (list.id === foundList.id) {
                list.is_default = true;
              } else {
                list.is_default = false;
              }
            });
            // setUsers(newLists);
            workspaces = newLists;
            // setTotalCount(totalCount - 1);
            addToast(response.message, {
              appearance: "success",
              autoDismiss: true,
            });
            Swal.fire("Deleted!", "", "success");
          } else {
            console.log("response", error);
            addToast(error?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 mb-3 p-2  bg_theme_primary   bg-primary shadow-soft border-light    ">
          <h2 className="text-capitalize title">
            workspace
            <Link href={`${WORKSPACE_CREATE_URL}`}>
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
                  <div
                    className="col-xl-4 col-md-6"
                    key={idx}
                    onClick={() => setDetafaultCard(list.id)}
                  >
                    <div
                      className={`card pl-25 bg-primary shadow-soft border-light not-interested-box ${
                        activeRecordId == list.id && activeClass
                      }`}
                    >
                      {/* <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="specialized"
                            value="false"
                          />
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                        </div>
                      </fieldset> */}

                      <div className="card-body">
                        <div className="text-default d-flex align-items-center font-medium-4 pb-50 font-weight-bold text-capitalize">
                          {list.location_address}
                        </div>{" "}
                        <div className="lead-contact font-medium-3">
                          <i className="fa fa-map-marker "></i>{" "}
                          {list.location_address}
                        </div>
                        <div className="lead-contact font-medium-3">
                          <i className="fa fa-phone"></i>{" "}
                          {list?.phones[0]?.phone}
                        </div>
                        <div className="lead-contact font-medium-3">
                          <i className="fa fa-mail-forward"></i>{" "}
                          {list?.emails[0]?.email}
                        </div>
                        <div className="bottom-btn text-center pt-50">
                          <button className="btn btn-primary custom_btn_card mr-1 px-1">
                            <i className="fa fa-edit"></i> Edit
                          </button>
                          <button className="btn btn-primary custom_btn_card px-1">
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
