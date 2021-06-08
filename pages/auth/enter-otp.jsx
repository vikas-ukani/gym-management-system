import { useAxios } from "hooks";
import router from "next/router";
import Link from "next/link";
import { useState } from "react";
import { verifyOTPAPI } from "services/auth";
import { NEW_PASSWORD_URL } from "constants";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

const EnterOTP = () => {
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [otp, setOtp] = useState("");

  const onSubmit = async (input) => {
    input.email = Cookies.get("forgotPasswordEmail");
    const { response, error, loading, statusCode } = await useAxios(
      verifyOTPAPI(input)
    );
    if (statusCode == 400) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 200) {
      Cookies.set("forgotPasswordOTP", input.otp);
      addToast(response.message, { appearance: "success", autoDismiss: true });
      router.push(NEW_PASSWORD_URL);
    }
  };

  return (
    <div>
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
                        <label htmlFor="exampleInputIcon3">Enter OTP</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <span className="fa fa-lock"></span>
                            </span>
                          </div>
                          <input
                            className="form-control form-control-lg"
                            placeholder="Enter OTP"
                            type="text"
                            name={otp}
                            defaultValue={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            {...register("otp", {
                              required: "The email is required.",
                              minLength: {
                                value: 4,
                                message: "OTP should more than 4 digits",
                              },
                              maxLength: {
                                value: 6,
                                message: "OTP should no longer than 6 digits",
                              },
                            })}
                          />
                        </div>
                        {errors.otp && (
                          <p className=" text-danger">{errors.otp.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      {/* href="member-contact-information.html" */}
                      <Link href="/auth/forgot-password">
                        <a
                          className={
                            "float-left  btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                          }
                        >
                          <i className="fa fa-angle-left"> </i> Resend OTP
                        </a>
                      </Link>
                      {/* "step-2.html" */}

                      <button
                        className={
                          "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                        }
                        onClick={handleSubmit(onSubmit)}
                      >
                        Verify <i className="fa fa-angle-right"> </i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnterOTP;
