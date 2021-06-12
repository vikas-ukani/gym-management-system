import { useAxios } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { USERS_CREATE_URL } from "constants";
import { useToasts } from "react-toast-notifications";
import {
  createMastersAPI,
  deleteMasterByIdAPI,
  listMasterAPI,
  subMasterByMasterId,
  updateActiveDeactiveIdAPI,
  updateMastersByIdAPI,
} from "services/masters";
import SubMasterTable from "Components/Masters/Submasters/SubMasterTable";
import AddSubMasterForm from "Components/Masters/Submasters/AddSubMasterForm";
import EditSubMasterForm from "Components/Masters/Submasters/EditSubMasterForm";
import Swal from "sweetalert2";
import { filter, findWhere } from "underscore";
import {
  MODEL_CANCEL_CLASSES,
  MODEL_CONFIRM_CLASSES,
} from "utils/button-classes";

const SubMaster = () => {
  let router = useRouter();
  const { addToast } = useToasts();

  const [masters, setMasters] = useState([]);
  const [mastersCount, setMastersCount] = useState(0);
  const [activeMaster, setActiveMaster] = useState(
    parseInt(router?.query?.parent_id)
  );
  const [subMasters, setSubMasters] = useState([]);
  const [subMastersCount, setSubMastersCount] = useState(0);

  const [activePage, setActivePage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const [isAddForm, setIsAddForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editRow, setEditRow] = useState({});

  /** MASTERS */
  const callingMastersData = async (params = {}) => {
    let Query = {
      all: true,
      page: params?.page || 1,
      limit: params?.limit || 100,
    };
    const qs = new URLSearchParams(Query).toString();

    const { response, error, loading, statusCode } = await useAxios(
      listMasterAPI(qs)
    );
    if (statusCode === 200) {
      let { list, count } = response.data;
      setMastersCount(count);
      setMasters(list);
      if (!activeMaster) {
        setActiveMaster(list[0].id);
      }
    } else {
    }
  };

  useEffect(async () => {
    await callingMastersData();
  }, []);

  useEffect(() => {
    getSubMasterByFilter();
  }, [activeMaster]);

  /** SUB_MASTERS */
  const getSubMasterByFilter = async (params) => {
    let Query = {
      parent_id: params?.parent_id || activeMaster,
      page: params?.page || activePage,
      limit: params?.limit || pageLimit,
    };
    if (!Query.parent_id) return false;
    const qs = new URLSearchParams(Query).toString();
    const { response, error, loading, statusCode } = await useAxios(
      subMasterByMasterId(qs)
    );

    if (statusCode === 200) {
      let { list, count } = response.data;
      setSubMastersCount(count);
      setSubMasters(list);
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  const deleteRow = (id) => {
    console.log("id", id);
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
      customClass: {
        cancelButton: MODEL_CANCEL_CLASSES,
        confirmButton: MODEL_CONFIRM_CLASSES,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        let oldLists = subMasters;
        const foundList = findWhere(oldLists, { id });
        if (foundList && foundList.id) {
          const { response, error, loading, statusCode } = await useAxios(
            deleteMasterByIdAPI(id)
          );
          if (statusCode === 200) {
            let newLists = filter(oldLists, (list) => list.id !== foundList.id);
            setSubMasters(newLists);
            setSubMastersCount(subMastersCount - 1);
            addToast(response.message, {
              appearance: "success",
              autoDismiss: true,
            });
            Swal.fire("Deleted!", "", "success");
          } else {
            addToast(error.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      }
    });
  };

  const onActiveChange = async (checked, id) => {
    let params = { is_active: checked };
    const { response, error, loading, statusCode } = await useAxios(
      updateActiveDeactiveIdAPI(params, id)
    );
    if (statusCode === 200) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  const getSubMasterById = async (id) => {
    setIsAddForm(false);
    setIsEditForm(false);
    // let params = { parent_id: id, page: 1, limit: 20 };
    // const qs = new URLSearchParams(params).toString();
    setIsAddForm(false);
    setActiveMaster(id);
  };

  const onAddSubmit = async (input) => {
    // input.image_id = imageIds[0];
    input.parent_id = activeMaster;
    input.is_active = input.is_active === "true" || input.is_active == 1;

    const { response, error, loading, statusCode } = await useAxios(
      createMastersAPI(input)
    );
    if (statusCode == 400 || statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 201) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
      setIsAddForm(false);
      await getSubMasterByFilter({ parent_id: activeMaster });
    }
  };

  const onEditSubmit = async (input) => {
    // input.image_id = imageIds[0];
    input.parent_id = editRow.parent_id;
    input.is_active = input.is_active === "true" || input.is_active === 1;

    let id = editRow.id;
    const { response, error, loading, statusCode } = await useAxios(
      updateMastersByIdAPI(input, id)
    );
    if (statusCode == 400 || statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 200) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
      setIsEditForm(false);
      setActiveMaster(editRow.parent_id);
      // router.push(MASTERS_LIST_URL);
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
                    Sub Masters{" "}
                    {/* <div className="badge badge-light badge-sm text_theme_primary badge-pill">
                      50
                    </div> */}
                  </h3>
                </div>
                <div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-25 offset-lg-6 text-sm-right text-center">
                  {/* <Link href={`${USERS_CREATE_URL}`}> */}
                  {!isAddForm && !isEditForm && (
                    <button
                      className={
                        "btn btn-pill mb-sm-0 mb-2 waves-effect waves-light text_theme_primary custom_btn"
                      }
                      onClick={() => setIsAddForm(true)}
                    >
                      <i className="fa fa-plus"> </i> Add New
                    </button>
                  )}
                  {/* </Link> */}
                </div>
              </div>
              <div className="row  ">
                <div className="col-md-3 pl-0 pr-0 bg_theme_primary">
                  <div className="card border-2">
                    <div
                      className=" border-right min-vh-100"
                      id="sidebar-wrapper"
                    >
                      <div className="sidebar-heading  pl-1   border-bottom-2 text-bold-600 font-medium-5 py-75">
                        Masters{" "}
                      </div>
                      <div className="main-menu-content overflow-auto vh-100 bg_theme_primary">
                        <ul className="navigation pl-0">
                          {mastersCount == 0 && (
                            <li className={"nav-item   "}>No Masters.</li>
                          )}
                          {mastersCount > 0 &&
                            masters.length > 0 &&
                            masters.map((mlist, idx) => {
                              return (
                                <li key={idx} className={"nav-item "}>
                                  <a
                                    key={idx}
                                    className={`bg_theme_primary py-1 pl-2 text-bold-500 ${
                                      activeMaster === mlist.id &&
                                      "sidebar_active_button_in text-bold-700 text_theme_primary"
                                    }`}
                                    onClick={() => getSubMasterById(mlist.id)}
                                  >
                                    {mlist.name}
                                  </a>
                                </li>
                              );
                            })}
                        </ul>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 pl-0 pr-0">
                  <div className="pb-4 mt-1">
                    {isAddForm && (
                      <AddSubMasterForm
                        onAddSubmit={onAddSubmit}
                        setIsAddForm={setIsAddForm}
                      />
                    )}

                    {isEditForm && (
                      <EditSubMasterForm
                        editRow={editRow}
                        onEditSubmit={onEditSubmit}
                        setIsEditForm={setIsEditForm}
                      />
                    )}

                    {!isAddForm && !isEditForm && (
                      <SubMasterTable
                        subMastersCount={subMastersCount}
                        subMasters={subMasters}
                        onActiveChange={onActiveChange}
                        setIsEditForm={setIsEditForm}
                        setEditRow={setEditRow}
                        deleteRow={deleteRow}
                      />
                    )}
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

export default SubMaster;
