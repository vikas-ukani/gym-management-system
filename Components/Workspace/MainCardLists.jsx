import { WORKSPACE_UPDATE_URL } from "constants";
import { WORKSPACE_CREATE_URL } from "constants";
import { useAxios } from "hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { setCookie } from "services";
import { deleteWorkspaceAPI, setDefaultWorkspaceAPI } from "services/workspace";
import Swal from "sweetalert2";
import { filter, findWhere } from "underscore";
import {
  MODEL_CANCEL_CLASSES,
  MODEL_CONFIRM_CLASSES,
} from "utils/button-classes";
import EmptyWorkspaceCard from "./EmptyWorkspaceCard";

const MainCardLists = ({ workspaces = [] }) => {
  const [activeRecordId, setActiveRecordId] = useState();
  const activeClass = "default_gradient shadow-soft-in";

  const { addToast } = useToasts();

  useEffect(() => {
    let found = findWhere(workspaces, { is_default: 1 });
    if (found?.id) {
      setCookie('workspace_id', found?.id)
      setActiveRecordId(found?.id);
    }
  }, [workspaces]);

  const setDetafaultCard = (id) => {
    if (id == activeRecordId) return false;
    Swal.fire({
      title: "Are you sure you want to set it default workspace?",
      showCancelButton: true,
      confirmButtonText: `Confirm`,
      customClass: {
        cancelButton: MODEL_CANCEL_CLASSES,
        confirmButton: MODEL_CONFIRM_CLASSES,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        var oldLists = workspaces;
        const foundList = findWhere(oldLists, { id });
        if (foundList && foundList.id) {
          let params = { is_default: 1 };
          const { response, error, loading, statusCode } = await useAxios(
            setDefaultWorkspaceAPI(id, params)
          );
          if (statusCode === 200) {
            setCookie('workspace_id', id)
            setActiveRecordId(id);
            let newLists = workspaces.forEach((list) => {
              let newData = {
                ...list,
              };
              if (list.id === foundList.id) {
                newData.is_default = true;
              }
              list = newData;
            });

            workspaces = newLists;
            addToast(response.message, {
              appearance: "success",
              autoDismiss: true,
            });
            // Swal.fire("Saved!", "", "success");
          } else {
            addToast(error?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      }
    });
  };

  const deleteRow = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this workspace?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
      customClass: {
        cancelButton: MODEL_CANCEL_CLASSES,
        confirmButton: MODEL_CONFIRM_CLASSES,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        let oldLists = workspaces;
        const foundList = findWhere(oldLists, { id });
        if (foundList && foundList.id) {
          const { response, error, loading, statusCode } = await useAxios(
            deleteWorkspaceAPI(id)
          );
          if (statusCode === 200) {
            let newLists = filter(oldLists, (list) => list.id !== foundList.id);
            workspaces = newLists;
            addToast(response.message, {
              appearance: "success",
              autoDismiss: true,
            });
          } else {
            addToast(error.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 mb-3 p-2  bg_theme_primary   bg-primary shadow-soft border-light    ">
          <h2 className="text-capitalize title">
            workspace
            <Link href={`${WORKSPACE_CREATE_URL} `}>
              {/* <Link href={`${WORKSPACE_CREATE_URL}`}> */}
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
                  <div className="col-xl-3 col-md-4  h-100" key={idx}>
                    <div
                      className={`card pl-25 bg-primary shadow-soft border-light not-interested-box ${activeRecordId == list.id && activeClass
                        }`}
                    >
                      <div className="card-body p-75">
                        <div
                          className="cursor-pointer"
                          onClick={() => setDetafaultCard(list.id)}
                        >
                          <div className="text-default d-flex align-items-center font-medium-1 pb-50 font-weight-bold text-capitalize">
                            {list.location_address}
                          </div>{" "}
                          <div className="lead-contact font-medium-1">
                            <i className="fa fa-map-marker "></i>{" "}
                            {list.location_address}
                          </div>
                          {/* <div className="lead-contact font-medium-3">
                            <i className="fa fa-phone"></i>{" "}
                            {list?.phones[0]?.phone}
                          </div> */}
                          {/* <div className="lead-contact font-medium-3">
                            <i className="fa fa-mail-forward"></i>{" "}
                            {list?.emails[0]?.email}
                          </div> */}
                        </div>
                        <div className="bottom-btn text-center ">
                          <Link href={`${WORKSPACE_UPDATE_URL}/${list.id}`}>
                            <a className="btn btn-primary custom_btn_card px-50 py-75 mr-50 ">
                              <i className="fa fa-edit"></i> Edit
                            </a>
                          </Link>
                          <button
                            className="btn btn-primary custom_btn_card px-50 py-75"
                            onClick={() => deleteRow(list.id)}
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
