import { useAxios } from "hooks";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { sendEmailCodeAPI, sendMobileCodeAPI } from "services/auth";
import Cookies from "js-cookie";
// import { forgotPasswordProcess } from "services/auth";

const ForgotPassword = () => {
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isEmail, setIsEmail] = useState(true);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);

  const onSubmit = async (input) => {
    // if (isEmail) {
    let { response, error, loading, statusCode } = await useAxios(
      sendEmailCodeAPI(input)
    );
    if (statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode == 200) {
      Cookies.set("forgotPasswordEmail", input.email);
      addToast(response.message, {
        appearance: "success",
        autoDismiss: true,
      });
      router.push("/auth/enter-otp");
    }
    // }
    //  else {
    //   let { response, error, loading } = await useAxios(
    //     sendMobileCodeAPI(mobile)
    //   );
    // }
  };

  const handleRadioChange = (flag) => {
    setEmail("");
    setMobile("");

    setIsEmail(flag);
  };

  return (
    <>
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 login-bg-mobile">
        <div className="container">
          <div className="col-md-6 offset-md-3 justify-content-center">
            <div className="card login-card">
              <div className="row">
                <div className="card-body">
                  <h2 className="login-card-title">Forgot Password!</h2>
                  <form autoComplete="off">
                    <div className="form-group px-2">
                      <label htmlFor="exampleInputIcon3">Your email </label>
                      {/* <span><small>(Use: <i>admin@admin.com</i>, <i>admin@123</i>)</small></span> */}
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
                          {...register("email", {
                            required: "The email is required.",
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Enter a valid e-mail address",
                            },
                          })}
                        />
                      </div>
                      {errors.email && (
                        <p className=" text-danger">{errors.email.message}</p>
                      )}
                    </div>
                    {/* <div className="col-xl-12">
                                            <div className="form-group">
                                                <ul className="list-unstyled mb-0 text-center"> */}
                    {/* <li className="d-inline-block mr-2">
                                                        <fieldset>
                                                            <div className="vs-radio-con">
                                                                <input type="radio" name="forgot-password" defaultValue="true" defaultChecked={isEmail} onChange={() => handleRadioChange(true)} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--border"></span>
                                                                    <span className="vs-radio--circle"></span>
                                                                </span>
                                                                <span className="">Register Email</span>
                                                            </div>
                                                        </fieldset>
                                                    </li>
                                                    <br /> */}
                    {/* <li className="d-inline-block mr-2">
                                                        <fieldset>
                                                            <div className="vs-radio-con">
                                                                <input type="radio" name="forgot-password" defaultValue="false" defaultChecked={!isEmail} onChange={() => handleRadioChange(false)} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--border"></span>
                                                                    <span className="vs-radio--circle"></span>
                                                                </span>
                                                                <span className="">Register Mobile</span>
                                                            </div>
                                                        </fieldset>
                                                    </li>
                                                    <br /> */}
                    {/* <li className="d-inline-block mr-2">
                                                        <fieldset>
                                                            <div className="form-group mt-2 text-left   ">
                                                                <label htmlFor="">Your {isEmail ? "Email" : "Mobile"}</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text">
                                                                            <span className="fa fa-envelope">
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    {isEmail ? (
                                                                        <input className="form-control form-control-lg" type="text" name="email" placeholder="Enter your email"
                                                                            value={email} onChange={e => setEmail(e.target.value)}
                                                                        />
                                                                    ) : (
                                                                        <input className="form-control form-control-lg" type="text" name="mobile" placeholder="Enter Mobile Number"
                                                                            value={mobile} onChange={e => setMobile(e.target.value)}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </li> */}
                    {/* </ul>
                                </div>
                            </div> */}
                    <div className="col-12 text-center">
                      <button
                        className={
                          "  mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                        }
                        onClick={handleSubmit(onSubmit)}
                      >
                        Send Code
                      </button>
                      <br />
                      <br />
                      <Link href="/auth/login" className="text-center mt-5  ">
                        {/* <Link href={goToForgotPassword()}> */}
                        <a>Back to Login</a>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
