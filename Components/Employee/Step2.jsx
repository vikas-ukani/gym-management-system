import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setCookie } from "services";

const Step2 = ({ currentData, goToNextStep, goToPrevStep }) => {
  /** Input */
  const [input, setInput] = useState({});
  const [stepInput, setStepInput] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setStepInput(currentData);
    reset({ ...currentData });
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const stepNext = () => {
    goToNextStep(stepInput);
  };

  const stepPrev = () => {
    goToPrevStep();
  };

  /** SUBMITTING FORM */
  const onSubmit = (inputData) => {
    console.log("inputData", inputData);

    let UpdatedData = {
      ...input,
      ...inputData,
    };

    console.log("Final UpdatedData", input, UpdatedData);
    setCookie("step2", UpdatedData);
    goToNextStep(UpdatedData);
  };

  return (
    <div>
      <form role="form" action="index.html" className="login-box">
        <div className="tab-content" id="main_form">
          <div className="tab-pane active" role="tabpanel" id="step1">
            <div className="row">
              <div className="col-xl-12">
                <div className="form-group">
                  <label className="top-label">Address</label>
                  <textarea
                    className="form-control form-control-lg"
                    name="address"
                    defaultValue={input?.address}
                    onChange={handleChange}
                    {...register("address", {
                      required: "The address field is required",
                    })}
                  ></textarea>
                  {errors.address && (
                    <span className="mt-5 text-danger">
                      {errors.address.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-xl-4 col-6">
                <div className="form-group">
                  <label className="top-label">City</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    defaultValue={input?.city}
                    onChange={handleChange}
                    {...register("city", {
                      required: "The city field is required",
                    })}
                  />
                  {errors.city && (
                    <p className=" text-danger">{errors.city.message}</p>
                  )}
                  {/* <Select
                    placeholder="Select city."
                    value={city}
                    style={{ width: "100%" }}
                    onChange={(id) => setCity(id)}
                    name="city"
                  >
                    <Select.Option value="A+">A+</Select.Option>
                    <Select.Option value="mr">Rajkot</Select.Option>
                    <Select.Option value="mrs">Baroda</Select.Option>
                    <Select.Option value="miss">Mumbai</Select.Option>
                  </Select> */}
                </div>
              </div>

              <div className="col-xl-4 col-6">
                <div className="form-group">
                  <label className="top-label">State</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    defaultValue={input?.state}
                    {...register("state", {
                      required: "The state field is required",
                    })}
                  />
                  {errors.state && (
                    <span className="mt-5 text-danger">
                      {errors.state.message}
                    </span>
                  )}
                  {/* <select className="form-control form-control-lg">
                    <option value="mr">Gujrat</option>
                    <option value="mrs">Maharashtra</option>
                    <option value="miss">Rajasthan</option>
                  </select> */}
                </div>
              </div>

              <div className="col-xl-4 col-12">
                <div className="form-group">
                  <label className="top-label">Pincode</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    {...register("zip_code")}
                  />
                </div>
              </div>

              <div className="col-xl-4">
                <div className="form-group">
                  <label className="top-label">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-envelope"></span>
                      </span>
                    </div>
                    <input
                      className="form-control form-control-lg datepicker"
                      type="text"
                      defaultValue={input?.email}
                      onChange={handleChange}
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

              <div className="col-xl-3">
                <div className="form-group">
                  <label className="h6" htmlFor="exampleInputDate1">
                    Mobile Number
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-mobile fa-2x"></span>
                      </span>
                    </div>
                    <input
                      className="form-control form-control-lg datepicker"
                      type="text"
                      defaultValue={input?.mobile}
                      onChange={handleChange}
                      {...register("mobile", {
                        required: "The mobile field is required",
                      })}
                    />
                  </div>
                  {errors.mobile && (
                    <span className="mt-5 text-danger">
                      {errors.mobile.message}
                    </span>
                  )}{" "}
                </div>
              </div>


              <div className="col-xl-2">
                <div className="form-group mt-75">
                  <label className="">Is it WhatsApp number or not?</label>
                  <ul className="list-unstyled mb-0">
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="is_whatsapp"
                            value={true}
                            defaultValue={stepInput?.is_whatsapp == "true" || stepInput?.is_whatsapp == 1}
                            onChange={handleChange}
                            {...register('is_whatsapp')}
                          />
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">Yes</span>
                        </div>
                      </fieldset>
                    </li>
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="is_whatsapp"
                            value={false}
                            defaultValue={stepInput?.is_whatsapp == "false" || stepInput?.is_whatsapp == 0}
                            onChange={handleChange}
                            {...register('is_whatsapp')}
                          />
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">No</span>
                        </div>
                      </fieldset>
                    </li>

                    {errors.is_whatsapp && (
                      <span className="mt-5 text-danger">
                        {errors.is_whatsapp.message}
                      </span>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="form-group">
                  <label className="h6" htmlFor="exampleInputDate1">
                    Alternate Phone
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-mobile fa-2x"></span>
                      </span>
                    </div>
                    <input
                      className="form-control form-control-lg datepicker"
                      type="text"
                      {...register("alternative_mobile")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">Emergency Contact Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    {...register("emergency_contact_name")}
                  />
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="h6" htmlFor="exampleInputDate1">
                    Emergency Contact Number
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-mobile fa-2x"></span>
                      </span>
                    </div>
                    <input
                      className="form-control form-control-lg datepicker"
                      type="text"
                      {...register("emergency_contact_mobile")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-5">
                <a
                  onClick={() => stepPrev()}
                  className="float-left mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                >
                  <i className="fa fa-angle-left"></i> BACK
                </a>
                <a
                  onClick={handleSubmit(onSubmit)}
                  className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
                >
                  NEXT <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
