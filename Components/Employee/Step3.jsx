import { useEffect, useState } from "react";
import { Select } from "antd";
import { useFieldArray, useForm } from "react-hook-form";

const Step3 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const [stepInput, setStepInput] = useState({});
  const [specialization, setSpecialization] = useState();
  const [experience, setExperience] = useState();

  const specializations = [
    {
      id: 1,
      name: "Aerobic",
    },
    {
      id: 2,
      name: "Cross Fit",
    },
    {
      id: 3,
      name: "Cycling",
    },
    {
      id: 4,
      name: "Kick Boxing",
    },
    {
      id: 5,
      name: "Pilates",
    },
  ];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      educations: [{ education: null, education_year: null }],
    },
  });
  const educationsFields = useFieldArray({ control, name: "educations" });

  useEffect(() => {
    setStepInput(currentData);
  }, []);

  const handleChange = (e) => {
    if (updatedcurrentData?.input && e.target.name) {
      let newUpdates = {
        ...currentData,
        input: {
          ...currentData.input,
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
            <div className="row mt-3">
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">Education</label>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label w-100 text-capitalize">
                    Years of experience
                    {educationsFields.fields.length < 5 && (
                      <a
                        className="btn btn-primary add-icon custom_btn"
                        onClick={() => {
                          educationsFields.append({
                            education: "",
                            education_year: "",
                          });
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </a>
                    )}
                  </label>
                </div>
              </div>
              {educationsFields.fields.map((item, index) => {
                return (
                  <div key={item.id} className="d-flex col-12 mt-0 ">
                    <div className="col-xl-6 pl-0">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="form-group">
                        <Select
                          className=""
                          placeholder="Select experience."
                          value={3}
                          style={{ width: "100%" }}
                          onChange={(id) => setExperience(id)}
                          name="experience"
                        >
                          {/* {specializations.map((role) => {
											return ( */}
                          <Select.Option value={1}>1 Year</Select.Option>
                          <Select.Option value={2}>2 Year</Select.Option>
                          <Select.Option value={3}>3 Year</Select.Option>
                          <Select.Option value={4}>4 Year</Select.Option>
                          <Select.Option value={5}>5 Year</Select.Option>
                          {/* );
										})} */}
                        </Select>
                      </div>
                    </div>
                    <div className="  ">
                      {educationsFields.fields.length > 1 && (
                        <a
                          onClick={() => educationsFields.remove(index)}
                          className="btn btn-danger custom_btn add-icon mt-50   "
                        >
                          <i className="fa fa-minus "></i>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="col-xl-12">
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl-12">
                      <label className="w-100">
                        Specialized
                        {/* <a href="#" className="btn btn-primary add-icon">
													<i className="fa fa-plus"></i>
												</a> */}
                      </label>
                      {/* specializations */}
                      <div className="input-group mb-1 mt-1">
                        <Select
                          mode="multiple"
                          placeholder="Select any specializations."
                          value={specialization}
                          style={{ width: "100%" }}
                          onChange={(id) => setSpecialization(id)}
                          name="specializations"
                        >
                          {specializations.map((role) => {
                            return (
                              <Select.Option key={role.id} value={role.id}>
                                {role.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                        {/* <div className="input-group-prepend">
													<span className="input-group-text">
														<div className="vs-radio-con">
															<input type="radio" name="specialized" value="false" />
															<span className="vs-radio">
																<span className="vs-radio--border"></span>
																<span className="vs-radio--circle"></span>
															</span>
														</div>
													</span>
												</div>
												<input
													className="form-control form-control-lg datepicker"
													type="text"
												/> */}
                      </div>
                    </div>
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
                  className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary  default_gradient"
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

export default Step3;
