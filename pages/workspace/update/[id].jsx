import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAxios } from "hooks";
import { useToasts } from "react-toast-notifications";
import router from "next/router";
import Link from "next/link";

import { getWorkspaceAPI } from "services/workspace";
import { WORKSPACE_LIST_URL } from "constants";
import { getUserId } from "services";
import getAxios from "hooks/getAxios";

const UpdateWorkspacePage = ({ id }) => {
  const MODULE_NAME = " Update Workspace";
  const { addToast } = useToasts();
  const [workspace, setWorkspace] = useState({});

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emails: [{ email: null }],
      phones: [{ phone: null }],
    },
  });
  const emailsFields = useFieldArray({ control, name: "emails" });
  const mobileFields = useFieldArray({ control, name: "phones" });

  useEffect(async () => {
    console.log("Effect", id);
    if (id) {
      const {
        response: { data },
        statusCode,
      } = await useAxios(getWorkspaceAPI(id));
      console.log("data", data);
      if (statusCode == 200) {
        setWorkspace(data);
        reset({ defaultValue: { ...workspace } });
      }
    }
  }, []);

  const onSubmit = async (input) => {
    input.is_default = input.is_default === "true" || input.is_default == 1;
    input.owner_id = getUserId();
    const { response, error, loading, statusCode } = await useAxios(
      updateWorkspaceAPI(id, input)
    );
    if (statusCode == 400 || statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 200 || statusCode === 201) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
      router.push(WORKSPACE_LIST_URL);
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
              <h3 className="wizard-title text-capitalize text-left mb-3 text_theme_primary">
                {MODULE_NAME}
              </h3>
              <form role="form">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label className="top-label text-capitalize">name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="location_name"
                        defaultValue={workspace?.location_name}
                        {...register("location_name", {
                          required: "The   name is required.",
                        })}
                      />
                      {errors.location_name && (
                        <p className=" text-danger">
                          {errors.location_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="form-group">
                      <label className="top-label text-capitalize">
                        location address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="location_address"
                        defaultValue={workspace?.location_address}
                        {...register("location_address", {
                          required: "The location address is required.",
                        })}
                      />
                      {errors.location_address && (
                        <p className=" text-danger">
                          {errors.location_address.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label className="w-100 text-capitalize">
                        emails
                        <a
                          className="btn btn-primary add-icon custom_btn"
                          onClick={() => {
                            emailsFields.append({
                              email: "",
                            });
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </a>
                      </label>
                      {emailsFields.fields.map((item, index) => {
                        return (
                          <div key={item.id} className="d-flex">
                            <Controller
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control form-control-lg mb-1 w-90"
                                  {...register(`emails.${index}.email`)}
                                />
                              )}
                              name={`emails.${index}.email`}
                              control={control}
                              defaultValue={item.email}
                            />
                            {/* , {
                                    required: "The email is required.",
                                  } */}
                            {/* defaultValue={item.email} // make sure to set up defaultValue */}
                            {emailsFields.fields.length > 1 && (
                              <a
                                onClick={() => emailsFields.remove(index)}
                                className="btn btn-danger custom_btn add-icon mt-1 ml-1 "
                              >
                                <i className="fa fa-minus "></i>
                              </a>
                            )}
                            {/* {errors.emails[index] && (
                              <p className=" text-danger">
                                <pre>
                                  {JSON.stringify(errors.emails[index].email)}
                                </pre>
                              </p>
                            )} */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label className="w-100 text-capitalize">
                        phones
                        <a
                          className="btn btn-primary add-icon custom_btn"
                          onClick={() => {
                            mobileFields.append({
                              email: "",
                            });
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </a>
                      </label>
                      {mobileFields.fields.map((item, index) => {
                        return (
                          <div key={item.id} className="d-flex">
                            <Controller
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control form-control-lg mb-1 w-90"
                                  {...register(`phones.${index}.phone`)}
                                />
                              )}
                              name={`phones.${index}.phone`}
                              defaultValue={item.phone}
                              control={control}
                            />
                            {/* , {
                                    required: "The phone is required.",
                                  } */}
                            {/* defaultValue={item.phone} // make sure to set up defaultValue */}
                            {mobileFields.fields.length > 1 && (
                              <a
                                onClick={() => mobileFields.remove(index)}
                                className="btn btn-danger custom_btn add-icon mt-1 ml-1 "
                              >
                                <i className="fa fa-minus "></i>
                              </a>
                            )}
                            {/* {errors.phones[index] && (
                              <p className=" text-danger">
                                <pre>
                                  {JSON.stringify(errors.phones[index].phone)}
                                </pre>
                              </p>
                            )} */}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="col-xl-12 pl-0">
                      <div className="form-group">
                        <label className="text-capitalize">
                          {" "}
                          Set it default?
                        </label>
                        <ul className="list-unstyled mb-0">
                          <li className="d-inline-block mr-2">
                            <fieldset>
                              <div className="vs-radio-con">
                                <input
                                  type="radio"
                                  name="is_default"
                                  defaultChecked={true}
                                  value={true}
                                  {...register("is_default", {
                                    required: "The active is required.",
                                  })}
                                />
                                <span className="vs-radio">
                                  <span className="vs-radio--border"></span>
                                  <span className="vs-radio--circle"></span>
                                </span>
                                <span className=""> Yes </span>
                              </div>
                            </fieldset>
                          </li>
                          <li className="d-inline-block mr-2">
                            <fieldset>
                              <div className="vs-radio-con">
                                <input
                                  type="radio"
                                  name="is_default"
                                  defaultChecked={false}
                                  value={false}
                                  {...register("is_default")}
                                />
                                <span className="vs-radio">
                                  <span className="vs-radio--border"></span>
                                  <span className="vs-radio--circle"></span>
                                </span>
                                <span className="">No</span>
                              </div>
                            </fieldset>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-1">
                  <div className="col-6 "></div>
                  <div className="col-6  ">
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className={
                        "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
                      }
                    >
                      Create{" "}
                    </button>
                    <Link href={`${WORKSPACE_LIST_URL}`}>
                      <a
                        className={
                          "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                        }
                      >
                        Cancel
                      </a>
                    </Link>
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
UpdateWorkspacePage.getInitialProps = async (ctx) => {
  let token = ctx.req.cookies.token;
  let id = ctx.query.id || null;
  console.log('data"response" ', id);

  // let data = getAxios(getWorkspaceAPI(id));

  return {
    data: null,
  };
};
export default UpdateWorkspacePage;
