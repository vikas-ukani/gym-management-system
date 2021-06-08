import { useEffect, useState } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { useForm, Controller } from "react-hook-form";
import { Select, DatePicker } from "antd";
import moment, { utc } from "moment";
import { getNumericalObject, getRangeByStep } from "utils/objects";
import { getAge } from "utils/date_filters";

const Step1 = ({ currentInput, goToNextStep }) => {
  const [stepInput, setStepInput] = useState({});
  const [dob, setDob] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState();

  const languages = [
    {
      id: 1,
      name: "English",
    },
    {
      id: 2,
      name: "French",
    },
  ];

  const CreateSliderWithTooltip = createSliderWithTooltip(Slider);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm();

  /** Custom Validation Not Working now */
  useEffect(() => {
    setError("language", {
      types: {
        required: "The language is required",
      },
    });
  }, [setError]);

  useEffect(() => {
    setStepInput(currentInput);
    reset({ defaultValue: { ...stepInput } });
  }, []);

  const heightFitOptionsConfig = { min: 3, max: 12, step: 0.1 };
  const heightFitOptions = {
    ...heightFitOptionsConfig,
    marks: getNumericalObject(
      heightFitOptionsConfig.min,
      heightFitOptionsConfig.max
    ),
  };

  const weightOptionsConfig = { min: 40, max: 150, step: 0.1 };
  const weightOptions = {
    ...weightOptionsConfig,
    marks: getRangeByStep(weightOptionsConfig.min, weightOptionsConfig.max, 5),
  };

  const changeDOB = (date) => {
    const currentAge = getAge(date);
    setStepInput({
      ...stepInput,
      input: { ...stepInput.input, age: currentAge, date_of_birth: date },
    });
  };

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

  const getDefaultDOB = (date) => {
    return moment(moment(date), "DD-MM-YYYY");
  };

  const onSubmit = (input) => {
    let UpdatedData = {
      ...stepInput,
      input: {
        ...stepInput.input,
        ...input,
        // date_of_birth: dob,
        language: selectedLanguage,
        blood_group: selectedBloodGroup,
      },
      NextStep: 2,
    };
    goToNextStep(UpdatedData);
  };

  const getHeightPoints = (height) => {
    let returnHight = 5;
    if (height) {
      returnHight = parseFloat(
        (height?.fit || returnHight) + "." + (height?.inch || 0)
      );
    }
    return returnHight;
  };

  return (
    <div>
      <form role="form">
        <div className="tab-content" id="main_form">
          {/* <!-- step-1-start --> */}
          <div className="tab-pane active" role="tabpanel" id="step1">
            <div className="row">
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">First Name</label>
                  {/* <pre>{JSON.stringify(stepInput?.input?.first_name)}</pre> */}
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="first_name"
                    defaultValue={stepInput?.input?.first_name}
                    onChange={handleChange}
                    {...register("first_name", {
                      required: "The first name field is required",
                    })}
                  />
                  {errors.first_name && (
                    <span className="mt-5 text-danger">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="last_name"
                    defaultValue={stepInput?.input?.last_name}
                    onChange={handleChange}
                    {...register("last_name", {
                      required: "The last name field is required",
                    })}
                  />
                  {errors.last_name && (
                    <span className="mt-5 text-danger">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-xl-12">
                <div className="form-group">
                  <label className="">Gender</label>
                  <ul className="list-unstyled mb-0">
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="gender"
                            checked
                            value="MALE"
                            defaultChecked={stepInput?.input?.gender}
                            onChange={handleChange}
                          />
                          {/*  */}
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">Male</span>
                        </div>
                      </fieldset>
                    </li>
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="gender"
                            value="FEMALE"
                            defaultChecked={stepInput?.input?.gender}
                            onChange={handleChange}
                          />
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">Female</span>
                        </div>
                      </fieldset>
                    </li>
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="gender"
                            value="OTHER"
                            defaultChecked={stepInput?.input?.gender}
                            onChange={handleChange}
                          />
                          {/* onChange={handleChange} */}
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">Other</span>
                        </div>
                      </fieldset>
                    </li>
                    {errors.gender && (
                      <span className="mt-5 text-danger">
                        {errors.gender.message}
                      </span>
                    )}
                  </ul>
                </div>
              </div>

              <div className="col-xl-4 col-9">
                <div className="form-group date-birth">
                  <label className="h6" htmlFor="exampleInputDate1">
                    Date of Birth
                  </label>
                  <div className="input-group">
                    <DatePicker
                      className="w-100"
                      format="DD-MM-YYYY"
                      defaultChecked={getDefaultDOB(
                        stepInput?.input?.date_of_birth
                      )}
                      onChange={(date) => changeDOB(date)}
                    />
                    {/* {...register('date_of_birth', {
												required: 'The date of birth required.',
											})} */}
                    {/* <Controller
											control={control}
											rules={{ required: true }}
											name="date_of_birth"
											render={({ field }) => (
												<DatePicker
													{...field}
													className="w-100"
													format="DD-MM-YYYY"
													defaultChecked={getDefaultDOB(stepInput?.input?.date_of_birth)}
													onChange={(date) => changeDOB(date)}
												/>
											)}
										/> */}
                    {/* getDefaultDOB(stepInput?.input?.date_of_birth) */}
                    {/* onChange={([selected]) => ({ value: selected })} */}
                    {errors.date_of_birth && (
                      <p className=" text-danger">
                        {errors.date_of_birth.message}
                      </p>
                    )}
                  </div>
                  {/* <span className="year-count">32 Year</span> */}
                </div>
              </div>

              <div className="col-xl-4 col-3 age-field">
                <div className="form-group date-birth">
                  <label className="h6" htmlFor="exampleInputDate1">
                    Age
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    name="age"
                    readOnly={true}
                    defaultValue={stepInput?.input?.age}
                  />
                </div>
              </div>

              <div className="col-5 col-xl-4">
                <div className="form-group">
                  <label className="h6">Blood Group</label>
                  <div className="input-group">
                    {/* <div className="input-group-prepend">
											<span className="input-group-text">
												<span className="fa fa-tint blood-group-text text-danger"></span>
											</span>
										</div> */}
                    <Select
                      placeholder="Select blood group type."
                      value={selectedBloodGroup}
                      style={{ width: "100%" }}
                      onChange={(id) => setSelectedBloodGroup(id)}
                      name="blood_group"
                    >
                      {/* {...register('blood_group', {
												required: 'The blood group required.',
											})} */}
                      <Select.Option value="A+">A+</Select.Option>
                      <Select.Option value="a-">A-</Select.Option>
                      <Select.Option value="b+">B+</Select.Option>
                      <Select.Option value="b-">B-</Select.Option>
                      <Select.Option value="o+">O+</Select.Option>
                      <Select.Option value="o-">O-</Select.Option>
                      <Select.Option value="ab+">AB+</Select.Option>
                      <Select.Option value="ab-">AB-</Select.Option>
                    </Select>
                    {errors.blood_group && (
                      <p className=" text-danger">
                        {errors.blood_group.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xl-8 ">
                <div className="form-group pl-25">
                  <label className="h6">Height</label>
                  <div>
                    <div className="float-left font-small-2 pl-lg-25">
                      Fit {heightFitOptions.min}
                    </div>
                    <div className="float-right font-small-2">
                      Fit {heightFitOptions.max}
                    </div>
                  </div>
                  <div className="input-group ml-25">
                    <br />
                    <CreateSliderWithTooltip
                      className="js-range-slider "
                      data-type="single"
                      id="height-fit"
                      defaultValue={getHeightPoints(stepInput?.input?.height)}
                      onChange={(val) => console.log(val)}
                      dots={false}
                      {...heightFitOptions}
                      activeDotStyle
                      dots={false}
                      dotStyle={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="form-group pl-25">
                  <label className="h6">Weight</label>
                  <div className="">
                    <div className="float-left font-small-2 pl-lg-25">
                      {" "}
                      {weightOptions.min} Kg.
                    </div>
                    <div className="float-right font-small-2">
                      {" "}
                      {weightOptions.max} Kg.
                    </div>
                  </div>
                  <div className="input-group ml-50">
                    <br />
                    <CreateSliderWithTooltip
                      className="js-range-slider "
                      data-type="single"
                      id="weight"
                      defaultValue={stepInput?.input?.weight}
                      onChange={(val) => console.log(val)}
                      dots={false}
                      {...weightOptions}
                      activeDotStyle
                      dots={false}
                      dotStyle={{ display: "none" }}
                    />
                    {/* <div className="form-group">
                                        <input type="text" className="js-range-slider" value="" data-type="single" id="weight"
                                            name="weight" defaultValue={stepInput?.input?.weight} onChange={handleChange} />
                                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="form-group">
                  <label className="top-label">Language </label>
                  <div className="form-group">
                    <Select
                      mode="multiple"
                      placeholder="Select an language."
                      value={selectedLanguage}
                      style={{ width: "100%" }}
                      onChange={(id) => setSelectedLanguage(id)}
                      name="language"
                    >
                      {/* {...register('language')} */}
                      {languages.map((list) => {
                        return (
                          <Select.Option key={list.id} value={list.id}>
                            {list.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    {/* <Controller
											name="language"
											defaultValue={selectedLanguage}
											control={control}
											render={({ onChange, value }) => (
												
											)}
										/> */}
                    {/* {...register('language', {
												required: 'The language is required.',
											})} */}
                    {errors.language && errors.language.types && (
                      <p className=" text-danger">
                        {errors.language.types.required}
                      </p>
                    )}
                    {errors.language && (
                      <p className=" text-danger">{errors.language.message}</p>
                    )}
                    {/* <select className="select2 form-control" multiple={true}>
											<option value="English">English</option>
											<option value="Hindi">Hindi</option>
											<option value="Gujarati">Gujarati</option>
										</select> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                {/* <a href="step-1.html" className="btn btn-outline-light round btn-lg mr-1 mb-1 ">
                                    <i className="fa fa-angle-left">
                                    </i> BACK
                                </a> */}
                <a
                  onClick={handleSubmit(onSubmit)}
                  className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn default_gradient"
                >
                  NEXT <i className="fa fa-angle-right"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1;
