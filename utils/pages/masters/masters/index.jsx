import { useAxios } from "hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { filter, findWhere } from "underscore";
import { Switch } from "antd";
import { useToasts } from "react-toast-notifications";
import {
  deleteMasterByIdAPI,
  listMasterAPI,
  updateActiveDeactiveIdAPI,
} from "services/masters";
import { MASTERS_CREATE_URL, MASTERS_UPDATE_URL } from "constants";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import { SUB_MASTERS_UPDATE_URL } from "constants";

/** Start */
const MODULE_NAME = "Masters";
const Masters = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [lists, setLists] = useState([]);
  const { addToast } = useToasts();
  const [activePage, setActivePage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);

  const callingListData = async (params = {}) => {
    // ?page=1&limit=1&all=true

    let Query = {
      all: true,
      page: params?.page || activePage,
      limit: params?.limit || pageLimit,
    };
    const qs = new URLSearchParams(Query).toString();

    const { response, error, loading, statusCode } = await useAxios(
      listMasterAPI(qs)
    );
    if (statusCode === 200) {
      let { list, count } = response.data;
      setTotalCount(count);
      setLists(list);
    } else {
    }
  };

  useEffect(async () => {
    callingListData();
  }, []);

  const deleteRow = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let oldLists = lists;
        const foundList = findWhere(oldLists, { id });
        if (foundList && foundList.id) {
          const { response, error, loading, statusCode } = await useAxios(
            deleteMasterByIdAPI(id)
          );
          if (statusCode === 200) {
            let newLists = filter(oldLists, (list) => list.id !== foundList.id);
            setLists(newLists);
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
  };

  const onActiveChange = async (checked, id) => {
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

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    callingListData();
  };

  return (
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
                  <h3 className="wizard-title text_theme_primary text-left">
                    {MODULE_NAME}{" "}
                    <div className="badge badge-light badge-sm text_theme_primary badge-pill">
                      {totalCount}
                    </div>
                  </h3>
                </div>
                <div className="col-lg-3 col-sm-6 col-12 mb-lg-0 mt-sm-25 offset-lg-6 text-sm-right text-center">
                  <Link href={`${MASTERS_CREATE_URL}`}>
                    <button
                      className={
                        "btn btn-pill mb-sm-0 mb-2 waves-effect waves-light text_theme_primary custom_btn"
                      }
                    >
                      <i className="fa fa-plus"> </i> Create {MODULE_NAME}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="pb-4 mt-1">
                <div className="table-responsive-sm shadow-soft rounded">
                  {totalCount == 0 && (
                    <div className="p-5 font-large-1 text-center">
                      {" "}
                      Loading...
                    </div>
                  )}
                  {totalCount > 0 && (
                    <table className="table membership-table table-hover table-borderless ">
                      <thead>
                        <tr>
                          <th className="table-date table-primary text-capitalize">
                            Image
                          </th>
                          <th className="table-date table-primary text-capitalize">
                            name
                          </th>
                          <th className="table-date table-primary text-capitalize">
                            code
                          </th>
                          <th className="table-date table-primary">Active</th>
                          <th className="table-date table-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((list, idx) => {
                          let is_activeted =
                            list.is_active == 1 ||
                            list.is_active == "true" ||
                            list.is_active == true;
                          return (
                            <tr key={idx}>
                              <td className="text-center ">
                                <img
                                  onError={(e) =>
                                    (e.target.src = "/images/user-default.png")
                                  }
                                  src={
                                    list?.image?.url ??
                                    "/images/user-default.png"
                                  }
                                  className="mx-auto d-block rounded-circle img-sm"
                                  alt={list.name}
                                />
                              </td>
                              <td className="text-center text-capitalize">
                                {list.name}
                              </td>
                              <td className="text-center text-capitalize">
                                {list.code}
                              </td>

                              <td className="text-center ">
                                <Switch
                                  defaultChecked={is_activeted}
                                  onChange={(e) => onActiveChange(e, list.id)}
                                />
                              </td>
                              {/* <td className="text-center edit-delete-member-rate "> */}
                              <td className="text-center ">
                                <Link href={`${MASTERS_UPDATE_URL}/${list.id}`}>
                                  <a className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary custom_btn">
                                    <i className="fa fa-edit"></i>
                                  </a>
                                </Link>

                                <Link
                                  href={`${SUB_MASTERS_UPDATE_URL}?parent_id=${list.id}`}
                                >
                                  <a className="btn btn-primary p-50 round m-50 waves-effect waves-light text_theme_primary custom_btn">
                                    <i className="fa fa-sliders"></i>
                                  </a>
                                </Link>

                                <div
                                  onClick={() => deleteRow(list.id)}
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
                <div className="row mt-2">
                  <div className="col-12">
                    <nav aria-label="page navigation">
                      <Pagination
                        innerClass={"pagination justify-content-center mt-2"}
                        activeClass={"active"}
                        itemClass={"page-item"}
                        activeLinkClass={"page-link"}
                        activePage={activePage}
                        itemsCountPerPage={pageLimit}
                        totalItemsCount={totalCount}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                      />{" "}
                    </nav>
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

export default Masters;
