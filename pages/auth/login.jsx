import { useEffect, useState } from "react";
import Link from "next/link";
import { FORGOT_PASSWORD_URL } from "constants";
import router from "next/router";
import { DASHBOARD_URL } from "constants";
import { useForm } from "react-hook-form";
import { loginProcess } from "services/auth";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { getToken } from "services";

const initialLogin = {
  email: "subadmin@mailinator.com",
  password: "subadmin@123",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  useEffect(() => {
    /** validate Token if exist then redirect to DASHBOARD_URL */
    if (getToken()) {
      router.push(DASHBOARD_URL);
    }
  }, []);

  const [login, setLogin] = useState(initialLogin);

  const onSubmit = async (input) => {
    const { data, status } = await loginProcess(input);
    if (status === 200) {
      addToast(data?.message, { appearance: "success", autoDismiss: true });
      router.push(DASHBOARD_URL);
    } else if (status === 422) {
      addToast(data?.message, { appearance: "error", autoDismiss: true });
    }
  };

  const goToForgotPassword = () => {
    return FORGOT_PASSWORD_URL;
  };

  return (
    <div>
      <div className="d-flex align-items-center min-vh-100 py-3 py-md-0 login-bg-mobile">
        <div className="container">
          <div className="col-md-6 offset-md-3 justify-content-center">
            <div className="card login-card">
              <div className="card-body">
                <div className="text-center mb-2">
                  <img
                    className="card-image"
                    src="/logos/vapuhu.svg"
                    alt="Logo"
                    height={100}
                    width={400}
                  />
                </div>
                <h2 className="login-card-title">Login</h2>
                <form autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="exampleInputIcon3">Your email </label>
                    <br />
                    <span>
                      <small>
                        (Use: <i>{initialLogin.email}</i>,{" "}
                        <i>{initialLogin.password}</i>)
                      </small>
                    </span>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <span className="fa fa-envelope"></span>
                        </span>
                      </div>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter your email "
                        onChange={(e) =>
                          setLogin({ ...login, email: e.target.value })
                        }
                        autoComplete="off"
                        {...register("email", {
                          required: "The email is required.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Enter a valid e-mail address",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className=" text-danger">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputIcon3">Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <span className="fa fa-lock"></span>
                        </span>
                      </div>
                      <input
                        className="form-control form-control-lg"
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                          setLogin({ ...login, password: e.target.value })
                        }
                        autoComplete="off"
                        {...register("password", {
                          required: "The password is required.",
                          minLength: 3,
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className=" text-danger">{errors.password.message}</p>
                    )}
                  </div>
                </form>

                <div className="col-12 ">
                  <button
                    className={
                      "float-left btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                    }
                    onClick={handleSubmit(onSubmit)}
                  >
                    Login
                  </button>
                  <br />
                  <br />
                  <br />
                  <Link
                    href="/auth/forgot-password"
                    className="text-left mt-5   "
                  >
                    <a>Forgot password</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
