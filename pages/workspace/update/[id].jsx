import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAxios } from "hooks";
import { useToasts } from "react-toast-notifications";
import router from "next/router";
import Link from "next/link";

import { getWorkspaceAPI, updateWorkspaceAPI } from "services/workspace";
import { WORKSPACE_LIST_URL } from "constants";
import { getTokenType } from "services";
import getAxios from "hooks/getAxios";
import { MOBILE_VALID_PATTERN } from "constants/common";

export const getServerSideProps = async (ctx) => {
  //   let token = await ctx.req?.cookies.token;
  let id = ctx.query.id || null;
  // let newRequest = getWorkspaceAPI(id);
  //   newRequest.headers.Authorization = getTokenType() + token;
  //   let {
  //     response: { statusCode, data: workspace },
  //   } = await getAxios(newRequest);

  //   console.log('workspace', newRequest, workspace);
  //   if (!workspace || statusCode == 422 || statusCode == 400) {
  //     return { props: { workspace } };
  //   }

  //   if (workspace && workspace.is_default) {
  //     workspace.is_default = workspace?.is_default == 1 || workspace?.is_default == "true";
  //   }
  return {
    props: { id },
  };
};

//const UpdateWorkspace = ({ workspace }) => {
const UpdateWorkspace = ({ id }) => {
  const MODULE_NAME = " Update Workspace";
  const { addToast } = useToasts();
  const [workspace, setWorkspace] = useState({
    emails: [{}],
    phones: [{}],
  })
  // let { id } = router.query

  useEffect(async () => {
    let {
      response: { statusCode, data: { data } },
    } = await getAxios(getWorkspaceAPI(id));
    console.log('data', data);
    setWorkspace(data)
  }, [])
  // const id = workspace?.id;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emails: [{ email: null }],
      phones: [{ phone: null }],
      ...workspace,
    },
  });
  const emailsFields = useFieldArray({ control, name: "emails" });
  const mobileFields = useFieldArray({ control, name: "phones" });

  const onSubmit = async (input) => {
    input.is_default = input.is_default === "true" || input.is_default == 1;
    const { response, error, statusCode } = await useAxios(
      updateWorkspaceAPI(id, input)
    );
    if (statusCode == 400 || statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 200 || statusCode === 201) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
      router.push(await WORKSPACE_LIST_URL);
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
                          required: "The name is required.",
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
                          <>
                            <div key={item.id} className="d-flex">
                              <Controller
                                render={({ field }) => (
                                  <input
                                    type="text"
                                    className="form-control form-control-lg mb-1 w-90"
                                    {...register(`emails.${index}.email`)}
                                    {...field}
                                  />
                                )}
                                name={`emails.${index}.email`}
                                control={control}
                                defaultValue={workspace?.emails[index].email}
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
                            </div>
                            {errors?.emails && errors?.emails[index] && (
                              <p className=" text-danger">
                                {errors?.emails[index].email.message}
                              </p>
                            )}
                          </>
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
                          <>
                            <div key={item.id} className="d-flex">
                              <Controller
                                render={({ field }) => (
                                  <input
                                    type="text"
                                    className="form-control form-control-lg mb-1 w-90"
                                    {...field}
                                  />
                                )}
                                name={`phones.${index}.phone`}
                                defaultValue={workspace?.phones[index].phone}
                                control={control}
                                {...register(`phones.${index}.phone`, {
                                  required: "Phone is required.",
                                  pattern: {
                                    value: MOBILE_VALID_PATTERN,
                                    message: "Enter a valid phone number",
                                  },
                                  minLength: {
                                    value: 8,
                                    message:
                                      "Min length should be 8 digit long",
                                  },
                                  maxLength: {
                                    value: 10,
                                    message:
                                      "Max length should be 12 digit long",
                                  },
                                })}
                              />
                              {mobileFields.fields.length > 1 && (
                                <a
                                  onClick={() => mobileFields.remove(index)}
                                  className="btn btn-danger custom_btn add-icon mt-1 ml-1 "
                                >
                                  <i className="fa fa-minus "></i>
                                </a>
                              )}
                            </div>
                            {errors?.phones && errors?.phones[index] && (
                              <p className=" text-danger">
                                {errors?.phones[index].phone.message}
                              </p>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="col-xl-12 pl-0">
                      <div className="form-group">
                        <label className="text-capitalize">
                          {" "}
                          Do you want to set it as default?
                        </label>
                        <ul className="list-unstyled mb-0">
                          <li className="d-inline-block mr-2">
                            <fieldset>
                              <div className="vs-radio-con">
                                <input
                                  type="radio"
                                  name="is_default"
                                  defaultChecked={
                                    workspace?.is_default === true ||
                                    workspace?.is_default === 1
                                  }
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
                                  defaultChecked={
                                    workspace?.is_default === false ||
                                    workspace?.is_default === 0
                                  }
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

export default UpdateWorkspace;
