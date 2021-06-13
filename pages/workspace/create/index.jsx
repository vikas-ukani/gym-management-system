import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAxios } from "hooks";
import { useToasts } from "react-toast-notifications";

import Link from "next/link";
import { createWorkspaceAPI } from "services/workspace";
import { WORKSPACE_LIST_URL } from "constants";
import { getUserId } from "services";
import { EMAIL_VALID_PATTERN, MOBILE_VALID_PATTERN } from "constants/common";
import router from "next/router";

const CreateWorkspace = () => {
  const MODULE_NAME = "Workspace";
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emails: [{ email: null }],
      phones: [{ phone: null }],
    },
  });
  const emailsFields = useFieldArray({ control, name: "emails" });
  const mobileFields = useFieldArray({ control, name: "phones" });

  const onSubmit = async (input) => {
    input.is_default = input.is_default === "true" || input.is_default == 1;
    input.owner_id = getUserId();
    const { response, error, loading, statusCode } = await useAxios(
      createWorkspaceAPI(input)
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
                Create {MODULE_NAME}
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
                        address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="location_address"
                        {...register("location_address", {
                          required: "The  address is required.",
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
                                    className="form-control form-control-lg mb-25 mt-25"
                                    {...field}
                                  />
                                )}
                                name={`emails.${index}.email`}
                                control={control}
                                defaultValue={item.email}
                                {...register(`emails.${index}.email`, {
                                  required: "Email is required.",
                                  pattern: {
                                    value: EMAIL_VALID_PATTERN,
                                    message: "Enter a valid e-mail address",
                                  },
                                })}
                              />
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
                                    className="form-control form-control-lg mb-1 mt-25"
                                    {...field}
                                  />
                                )}
                                name={`phones.${index}.phone`}
                                defaultValue={item.phone}
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
                          Do you want to set it as default?
                        </label>
                        <ul className="list-unstyled mb-0">
                          <li className="d-inline-block mr-2">
                            <fieldset>
                              <div className="vs-radio-con">
                                <input
                                  type="radio"
                                  name="is_default"
                                  defaultChecked={false}
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
                                  defaultChecked={true}
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
                        "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary default_gradient"
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

export default CreateWorkspace;
