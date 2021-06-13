import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "antd";

const Step2 = ({ currentInput, goToNextStep, goToPrevStep }) => {
  const [stepInput, setStepInput] = useState({});
  const [city, setCity] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setStepInput(currentInput);
    reset({ defaultValue: { ...stepInput } });
  }, []);

  const handleChange = (e) => {
    if (updatedCurrentInput?.input && e.target.name) {
      let newUpdates = {
        ...currentInput,
        input: {
          ...currentInput.input,
          [e.target.name]: e.target.value,
        },
      };
      setStepInput(newUpdates);
    }
  };

  const stepNext = () => {
    goToNextStep(stepInput);
  };

  const stepPrev = () => {
    goToPrevStep();
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
                    onChange={handleChange}
                    defaultValue={stepInput?.input?.address}
                  ></textarea>
                </div>
              </div>

              <div className="col-xl-4 col-6">
                <div className="form-group">
                  <label className="top-label">City</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    defaultValue={stepInput?.input?.city}
                    {...register("city", {
                      required: "The city field is required",
                    })}
                  />

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
                  {errors.city && (
                    <p className=" text-danger">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="col-xl-4 col-6">
                <div className="form-group">
                  <label className="top-label">State</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    defaultValue={stepInput?.input?.state}
                    {...register("city", {
                      required: "The state field is required",
                    })}
                  />
                  {/* <select className="form-control form-control-lg">
                    <option value="mr">Gujrat</option>
                    <option value="mrs">Maharashtra</option>
                    <option value="miss">Rajasthan</option>
                  </select> */}
                </div>
              </div>

              <div className="col-xl-4 col-12">
                <div className="form-group">
                  <label className="top-label">Zipcode</label>
                  <input type="text" className="form-control form-control-lg" />
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
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-4">
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
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-4">
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
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">Emergency Contact Name</label>
                  <input type="text" className="form-control form-control-lg" />
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
                  onClick={() => stepNext()}
                  className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
                >
                  NEXT <i className="  fa fa-angle-right"></i>
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
