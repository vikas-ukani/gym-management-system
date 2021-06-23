import { useEffect, useRef, useState } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { useForm, Controller } from "react-hook-form";
import { Select, DatePicker } from "antd";
import moment, { utc } from "moment";
import { getNumericalObject, getRangeByStep } from "utils/objects";
import { getAge } from "utils/date_filters";
import { getCookie, setCookie } from "services";
import { MASTER_CODES } from "constants/common";
import { useAxios } from "hooks";
import { getMasterByCode } from "services/masters";
import { useToasts } from "react-toast-notifications";

const Step1 = ({ currentData, goToNextStep }) => {
  /** Input */
  const [input, setInput] = useState({});
  const [stepInput, setStepInput] = useState({});
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState();
  const [selectedRegionId, setSelectedRegionId] = useState();

  const [weightPoints, setWeightPoints] = useState();
  const [heightPoints, setHeightPoints] = useState();

  const [regionList, setRegionList] = useState();
  const [languagesList, setLanguagesList] = useState();

  const { addToast } = useToasts()

  const CreateSliderWithTooltip = createSliderWithTooltip(Slider);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    validateCriteriaMode: "all",
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const password = useRef({});
  password.current = watch("password", "");

  useEffect(async () => {
    setStepInput({
      ...currentData,
      gender: currentData?.gender ? currentData.gender : "MALE"
    });
    setSelectedRegionId(currentData?.region_id)
    setAge(currentData?.age)
    setSelectedLanguage(currentData?.language_ids)
    reset({ ...currentData });
    fetchLanguagesList()

    await fetchRegionList()
  }, []);

  const fetchLanguagesList = async () => {
    const MASTER_CODES_LANGUAGE = MASTER_CODES.LANGUAGE
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODES_LANGUAGE))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODES_LANGUAGE];
      setLanguagesList(child_masters)
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
  }

  const fetchRegionList = async () => {
    const MASTER_CODE = MASTER_CODES.REGIONS
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODE))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODE];
      setRegionList(child_masters)
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
  }

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
    setAge(currentAge)
    setStepInput({
      ...stepInput,
      date_of_birth: date,
    });
    setDob(date);
    clearErrors("date_of_birth");
  };
  const changeDOJ = (date) => {
    setStepInput({
      ...stepInput,
      date_of_join: date,
    });
  };
  const changeDOE = (date) => {
    setStepInput({
      ...stepInput,
      date_of_expire: date,
    });
  };

  const handleChange = (e) => {
    setStepInput({
      ...stepInput,
      [e.target.name]: e.target.value,
    });
  };

  const stepNext = () => {
    goToNextStep(stepInput);
  };

  const getDefaultFormatedDate = (date) => {
    return moment(moment(date), "DD-MM-YYYY");
  };

  const onSubmit = (inputData) => {
    if (!dob && !currentData?.date_of_birth) {
      setError("date_of_birth", {
        type: "manual",
        message: "The date of birth field is required.!",
      });
      return false;
    }
    let UpdatedData = {
      ...input,
      ...inputData,
      age,
      height: heightPoints,
      weight: weightPoints,
      region_id: selectedRegionId,
      date_of_birth: dob
        ? dob
        : currentData?.date_of_birth
          ? currentData?.date_of_birth
          : null,
      language_ids: selectedLanguage,
      blood_group: selectedBloodGroup,
    };

    console.log("Final UpdatedData", input, UpdatedData);
    setCookie("step1", UpdatedData);
    goToNextStep(UpdatedData);
  };

  const getHeightPoints = (height) => {
    let returnHight = (height || 8);
    // let returnHight = heightPoints || (height || 8);
    // if (height) {
    //   returnHight = parseFloat(
    //     (height?.fit || returnHight) + "." + (height?.inch || 0)
    //   );
    // }
    return returnHight;
  };

  const handleHeightChange = (h) => {
    console.log("Chamges", h);
    // setHeightPoints(h)
  }


  const getWeightPoints = (weight) => {
    let returnWeight = weight || 60.6;
    return returnWeight;
  };

  const date_of_birth = register("date_of_birth");

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
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="first_name"
                    defaultValue={stepInput?.first_name}
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
                    defaultValue={stepInput?.last_name}
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

              <div className="col-xl-4 col-9">
                <div className="form-group date-birth">
                  <label className="h6" htmlFor="exampleInputDate1">
                    Date of Birth
                  </label>
                  <div className="input-group">
                    <DatePicker
                      className="w-100"
                      format="DD-MM-YYYY"
                      name="date_of_birth"
                      defaultValue={getDefaultFormatedDate(currentData?.date_of_birth)}
                      onChange={(date) => {
                        changeDOB(date);
                      }}
                    />

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
                    readOnly={true}
                    defaultValue={age}
                  />
                </div>
              </div>

              <div className="col-5 col-xl-4">
                <div className="form-group">
                  <label className="h6">Blood Group</label>
                  <div className="input-group">
                    <Select
                      placeholder="Select blood group type."
                      defaultValue={selectedBloodGroup}
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
                      defaultValue={getHeightPoints(stepInput?.height)}
                      onChange={handleHeightChange}
                      dots={false}
                      {...heightFitOptions}
                      activeDotStyle
                      dots={false}
                      dotStyle={{ display: "none" }}
                    />
                    {/* onChange={(val) => {setHeightPoints(val)}} */}
                      {/* // defaultValue={getHeightPoints(stepInput?.height)} */}
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div className="form-group pl-25 mt-75">
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
                      defaultValue={getWeightPoints(stepInput?.weight)}
                      onChange={(val) => console.log(val)}
                      dots={false}
                      {...weightOptions}
                      activeDotStyle
                      dots={false}
                      dotStyle={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group mt-75">
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
                      {languagesList?.map((list) => {
                        return (
                          <Select.Option key={list.id} value={list.id}>
                            {list.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    {errors.language && errors.language && (
                      <p className=" text-danger">
                        {errors.language.types.required}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group mt-75">
                  <label className="">Gender</label>
                  <ul className="list-unstyled mb-0">
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="gender"
                            value="MALE"
                            defaultValue={stepInput?.gender == "MALE"}
                            onChange={handleChange}
                            {...register('gender')}
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
                            defaultValue={stepInput?.gender === "FEMALE"}
                            onChange={handleChange}
                            {...register('gender')}
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
                            defaultValue={stepInput?.gender == "OTHER"}
                            onChange={handleChange}
                            {...register('gender')}
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
              <div className="col-xl-6">
                <div className="form-group pl-0">
                  <label className="top-label text-capitalize">password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="password"
                    {...register("password", {
                      required: "The password is required.",
                    })}
                  />
                  {errors.password && (
                    <p className=" text-danger">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label text-capitalize">
                    password confirmation
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="password_confirmation"
                    {...register("password_confirmation", {
                      required: "The password confirmation is required.",
                      validate: (value) =>
                        value === password.current ||
                        "The confirm passwords do not match",
                    })}
                  />
                  {errors.password_confirmation && (
                    <p className=" text-danger">
                      {errors.password_confirmation.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label text-capitalize">
                    Employee ID:
                  </label>
                  <input type="text" className="form-control form-control-lg"
                    name="employee_id"
                    {...register("employee_id")}
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group mt-75">
                  <label className="">Is Activate?</label>
                  <ul className="list-unstyled mb-0">
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="is_active"
                            value={true}
                            defaultValue={stepInput?.is_active == true}
                            onChange={handleChange}
                            {...register('is_active')}
                          />
                          {/*  */}
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">Active</span>
                        </div>
                      </fieldset>
                    </li>
                    <li className="d-inline-block mr-2">
                      <fieldset>
                        <div className="vs-radio-con">
                          <input
                            type="radio"
                            name="is_active"
                            value={false}
                            defaultValue={stepInput?.is_active === false}
                            onChange={handleChange}
                            {...register('is_active')}
                          />
                          <span className="vs-radio">
                            <span className="vs-radio--border"></span>
                            <span className="vs-radio--circle"></span>
                          </span>
                          <span className="">Deactive</span>
                        </div>
                      </fieldset>
                    </li>
                    {errors.is_active && (
                      <span className="mt-5 text-danger">
                        {errors.is_active.message}
                      </span>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group date-birth">
                  <label className="h6  text-capitalize" htmlFor="exampleInputDate1">
                    date of join
                  </label>
                  <div className="input-group">
                    <DatePicker
                      className="w-100"
                      format="DD-MM-YYYY"
                      name="date_of_join"
                      defaultValue={getDefaultFormatedDate(currentData?.date_of_join)}
                      onChange={(date) => {
                        changeDOJ(date);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group date-birth">
                  <label className="h6  text-capitalize" htmlFor="exampleInputDate1">
                    date of expire
                  </label>
                  <div className="input-group">
                    <DatePicker
                      className="w-100"
                      format="DD-MM-YYYY"
                      name="date_of_expire"
                      defaultValue={getDefaultFormatedDate(currentData?.date_of_expire)}
                      onChange={(date) => {
                        changeDOE(date);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group date-birth">
                  <label className="h6  text-capitalize" htmlFor="exampleInputDate1">
                    Region
                  </label>
                  <div className="input-group">
                    <Select
                      placeholder="Select any region."
                      value={selectedRegionId}
                      style={{ width: "100%" }}
                      name="region_id"
                      onChange={(id) => setSelectedRegionId(id)}
                      
                    >
                      {/* {...register('region_id', { required: "Select any one," })} */}
                      {/* onChange={(id) => setSelectedBloodGroup(id)} */}
                      {/* {...register('blood_group', {
												required: 'The blood group required.',
											})} */}
                      {regionList?.map((list, idx) =>
                        (<Select.Option key={idx} value={list.id}>{list.name}</Select.Option>)
                      )}
                    </Select>
                  </div>
                  {errors.region_id && <p className="text-danger">
                    {errors.region_id.message}
                  </p>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                <a
                  onClick={handleSubmit(onSubmit)}
                  className="float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
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
