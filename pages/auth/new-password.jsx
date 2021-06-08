import { useAxios } from "hooks";
import router from "next/router";
import { useRef, useState } from "react";
import { resetPasswordAPI } from "services/auth";
import { DASHBOARD_URL } from "constants";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import { LOGIN_URL } from "constants";
import Cookies from "js-cookie";

const NewPassword = () => {
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (input) => {
    input.email = Cookies.get("forgotPasswordEmail");
    input.otp = Cookies.get("forgotPasswordOTP");

    const { response, error, loading, statusCode } = await useAxios(
      resetPasswordAPI(input)
    );
    if (statusCode === 400 || statusCode === 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 200) {
      Cookies.remove("forgotPasswordOTP");
      Cookies.remove("forgotPasswordEmail");

      addToast(response.message, { appearance: "success", autoDismiss: true });
      router.push(LOGIN_URL);
    }
  };

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 login-bg-mobile">
      <div className="container">
        <div className="col-md-6 offset-md-3 justify-content-center">
          <div className="card login-card">
            <div className="row">
              <div className="card-body">
                <h2 className="login-card-title">Create Password</h2>
                <form>
                  <div className="col-xl-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputIcon3">New Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <span className="fa fa-lock"></span>
                          </span>
                        </div>
                        <input
                          className="form-control form-control-lg"
                          placeholder="New Password"
                          type="password"
                          name="password"
                          {...register("password", {
                            required: "The password is required.",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be grater them 8 characters.",
                            },
                          })}
                        />
                      </div>
                      {errors.password && (
                        <span className="mt-2 text-danger">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputIcon3">
                        Confirmed Password
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <span className="fa fa-lock"></span>
                          </span>
                        </div>
                        <input
                          className="form-control form-control-lg"
                          placeholder="Confirmed Password"
                          type="password"
                          name="password_confirmation"
                          {...register("password_confirmation", {
                            required: "The confirmation password is required.",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be grater them 8 characters.",
                            },
                            validate: (value) =>
                              value === password.current ||
                              "The confirm passwords do not match",
                          })}
                        />
                      </div>
                      {errors.password_confirmation && (
                        <span className="mt-2 text-danger">
                          {errors.password_confirmation.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    {/* "step-2.html" */}
                    <a
                      className={
                        "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                      }
                      onClick={handleSubmit(onSubmit)}
                    >
                      Update Password <i className="fa fa-angle-right"> </i>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewPassword;
