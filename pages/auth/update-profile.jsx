import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changeUserProfileAPI } from "services/auth";
import { useAxios } from "hooks";
import { useToasts } from "react-toast-notifications";
import router from "next/router";
import { USERS_LIST_URL } from "constants";
import Link from "next/link";
import { getUserId, userDetail } from "services";

const UpdateProfile = () => {
  const [user, setUser] = useState({});
  const [id, setId] = useState(null);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let userD = userDetail();
    setUser(userD);
    setId(getUserId());
    reset({ defaultValue: { ...user } });
  }, []);

  const onSubmit = async (input) => {
    const { response, error, loading, statusCode } = await useAxios(
      changeUserProfileAPI(input, id)
    );

    if (statusCode == 400 || statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 200) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
      router.push(USERS_LIST_URL);
    }
  };

  return (
    <div>
      <div>
        <div className="app-content content">
          <div className="content-overlay"></div>
          <div className="header-navbar-shadow"></div>
          <div className="content-wrapper">
            <section>
              <h3 className="wizard-title text_theme_primary text-left">
                Update Profile
              </h3>

              <form className="row ">
                <div className="col-xl-6">
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputIcon3"
                      className="text-capitalize"
                    >
                      first name
                    </label>
                    <div className="input-group">
                      {/* <div className="input-group-prepend">
												<span className="input-group-text">
													<span className="fa fa-lock"></span>
												</span>
											</div> */}
                      <input
                        className="form-control form-control-lg"
                        placeholder="Enter first name"
                        type="text"
                        defaultValue={user?.first_name}
                        {...register("first_name", {
                          required: "The first name field is required",
                        })}
                      />
                    </div>
                    {errors.first_name && (
                      <span className="mt-5 text-danger">
                        {errors.first_name.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputIcon3"
                      className="text-capitalize"
                    >
                      last name
                    </label>
                    <div className="input-group">
                      {/* <div className="input-group-prepend">
												<span className="input-group-text">
													<span className="fa fa-lock"></span>
												</span>
											</div> */}
                      <input
                        className="form-control form-control-lg"
                        placeholder="Enter last name"
                        type="text"
                        defaultValue={user?.last_name}
                        {...register("last_name", {
                          required: "The last name field is required",
                        })}
                      />
                    </div>
                    {errors.last_name && (
                      <span className="mt-5 text-danger">
                        {errors.last_name.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputIcon3"
                      className="text-capitalize"
                    >
                      email
                    </label>
                    <div className="input-group">
                      {/* <div className="input-group-prepend">
												<span className="input-group-text">
													<span className="fa fa-lock"></span>
												</span>
											</div> */}
                      <input
                        className="form-control form-control-lg"
                        placeholder="Enter last name"
                        type="text"
                        defaultValue={user?.email}
                        {...register("email", {
                          required: "The email field is required",
                        })}
                      />
                    </div>
                    {errors.email && (
                      <span className="mt-5 text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputIcon3"
                      className="text-capitalize"
                    >
                      mobile
                    </label>
                    <div className="input-group">
                      {/* <div className="input-group-prepend">
												<span className="input-group-text">
													<span className="fa fa-lock"></span>
												</span>
											</div> */}
                      <input
                        className="form-control form-control-lg"
                        placeholder="Enter last name"
                        defaultValue={user?.mobile}
                        type="text"
                        {...register("mobile", {
                          required: "The mobile field is required",
                        })}
                      />
                    </div>
                    {errors.mobile && (
                      <span className="mt-5 text-danger">
                        {errors.mobile.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-xl-12 mb-2">
                  {/* "step-2.html" */}
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className={
                      "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn default_gradient"
                    }
                  >
                    Save{" "}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
