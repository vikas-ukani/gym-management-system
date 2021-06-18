import { useEffect, useState } from "react";
import { Select } from "antd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { setCookie } from "services";

const Step3 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const [input, setInput] = useState({});
  const [stepInput, setStepInput] = useState({});
  const [experience, setExperience] = useState();

  const [specialization, setSpecialization] = useState();
  const [specializationError, setSpecializationError] = useState();
  const [educationsYearError, setEducationsYearError] = useState();

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
      ...currentData
    },
  });
  const educationsFields = useFieldArray({ control, name: "educations" });

  useEffect(() => {
    setStepInput(currentData);
  }, []);

  const updateIndexedExperienceYear = (id, index) => {
    setExperience({ ...experience, [index]: id });
    /** Remove Errors after select */
    setEducationsYearError({ ...educationsYearError, [index]: null });
  };
  const updateSpecialization = (id) => {
    setSpecializationError(null);
    setSpecialization(id);
  };

  const onSubmit = (inputData) => {
    console.log("inputData", experience[0], inputData);
    if (!specialization || specialization.length == 0) {
      setSpecializationError("The select any specialization.!");
      return false;
    }
    let UpdatedData = {
      ...input,
      ...inputData,
    };

    UpdatedData.educations.forEach((education, idx) => {
      education.education_year = experience[idx];
    });
    UpdatedData.specializations = specialization;
    // console.log("Final UpdatedData", UpdatedData);
    setCookie("step3", UpdatedData);
    console.log("Saved", UpdatedData);
    goToNextStep(UpdatedData);
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
                    Passing Year
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
                        <Controller
                          render={({ field }) => (
                            <input
                              type="text"
                              className="form-control form-control-lg mb-25 mt-25"
                              {...field}
                            />
                          )}
                          name={`educations.${index}.education`}
                          defaultValue={stepInput?.educations?.[index]?.education}
                          control={control}
                          {...register(`educations.${index}.education`, {
                            required: "Education is required.",
                          })}
                        />
                        {errors?.educations && errors?.educations[index] && (
                          <p className=" text-danger">
                            {errors?.educations[index].education.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="form-group">
                        <Select
                          className=""
                          placeholder="Select experience."
                          value={stepInput?.educations?.[index]?.education_year}
                          style={{ width: "100%" }}
                          name="education_year"
                          defaultValue={stepInput?.educations?.[index]?.education_year}
                          onChange={(id) =>
                            updateIndexedExperienceYear(id, index)
                          }
                        >
                          <Select.Option value={2001}>2001</Select.Option>
                          <Select.Option value={2002}>2002</Select.Option>
                          <Select.Option value={2003}>2003</Select.Option>
                          <Select.Option value={2004}>2004</Select.Option>
                          <Select.Option value={2005}>2005</Select.Option>
                          <Select.Option value={2006}>2006</Select.Option>
                          <Select.Option value={2007}>2007</Select.Option>
                          <Select.Option value={2008}>2008</Select.Option>
                          <Select.Option value={2009}>2009</Select.Option>
                          <Select.Option value={2010}>2010</Select.Option>
                          <Select.Option value={2011}>2011</Select.Option>
                          <Select.Option value={2012}>2012</Select.Option>
                          <Select.Option value={2013}>2013</Select.Option>
                          <Select.Option value={2014}>2014</Select.Option>
                          <Select.Option value={2015}>2015</Select.Option>
                          <Select.Option value={2016}>2016</Select.Option>
                          <Select.Option value={2017}>2017</Select.Option>
                          <Select.Option value={2018}>2018</Select.Option>
                          <Select.Option value={2019}>2019</Select.Option>
                          <Select.Option value={2020}>2020</Select.Option>
                          {/* );
										})} */}
                        </Select>
                        {educationsYearError?.[index] && (
                          <p className=" text-danger">
                            {educationsYearError[index]}
                          </p>
                        )}
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
              <div className="col-xl-6">
                <div className="form-group">
                  <div className="row">
                    <div className="col-xl-12">
                      <label className="w-100">Specialized</label>
                      <div className="input-group mb-1 mt-1">
                        <Select
                          mode="multiple"
                          placeholder="Select any specializations."
                          value={specialization}
                          style={{ width: "100%" }}
                          defaultValue={stepInput?.specializations}
                          onChange={(id) => updateSpecialization(id)}
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
                        {specializationError && (
                          <p className=" text-danger">{specializationError}</p>
                        )}
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
                  className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary  default_gradient"
                  onClick={handleSubmit(onSubmit)}
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
