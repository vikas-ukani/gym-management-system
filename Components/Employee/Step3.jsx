import { useEffect, useState } from "react";
import { Select, Upload } from "antd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { setCookie } from "services";
import { MASTER_CODES } from "constants/common";
import { useAxios } from "hooks";
import { getMasterByCode } from "services/masters";
import { useToasts } from "react-toast-notifications";
import { uploadImageService } from "services/image";

const Step3 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const { addToast } = useToasts()


  const [input, setInput] = useState({});
  const [stepInput, setStepInput] = useState({});
  const [experience, setExperience] = useState();

  const [specialization, setSpecialization] = useState();
  const [specializations, setSpecializations] = useState([]);
  const [specializationError, setSpecializationError] = useState();
  const [educationsYearError, setEducationsYearError] = useState();

  const [educationLevelList, setEducationLevelList] = useState()
  const [educationLevel, setEducationLevel] = useState()

  const [defaultFileList, setDefaultFileList] = useState([]);
  const [imageIds, setImageIds] = useState([]);


  const EDUCATION_FIELDS = {
    education_level: null,
    school_name: null,
    degree: null,
    education_year: null,
    marksheet_file: null
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // school name, degree, passing year, mark-sheet file (optional)
      educations: [EDUCATION_FIELDS],
      ...currentData
    },
  });
  const educationsFields = useFieldArray({ control, name: "educations" });

  useEffect(() => {
    setStepInput(currentData);
    setSpecialization(currentData?.specializations)
    fetchAllSpecializations()
    fetchAllEducationLevelList()
  }, []);

  const fetchAllSpecializations = async () => {
    const MASTER_CODE_SPECIALIZATIONS = MASTER_CODES.SPECIALIZATION
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODE_SPECIALIZATIONS))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODE_SPECIALIZATIONS];
      setSpecializations(child_masters)
      // setDesignationList([...child_masters.map(cM => {return {  "value": cM.id, "label" : cM.name }})])
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
  }
  const fetchAllEducationLevelList = async () => {
    const MASTER_CODE_GRADUATIONS = MASTER_CODES.GRADUATIONS
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODE_GRADUATIONS))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODE_GRADUATIONS];
      setEducationLevelList(child_masters)
      // setDesignationList([...child_masters.map(cM => {return {  "value": cM.id, "label" : cM.name }})])
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
  }

  const updateIndexedExperienceYear = (id, index) => {
    setExperience({ ...experience, [index]: id });
    /** Remove Errors after select */
    // setEducationsYearError({ ...educationsYearError, [index]: null });
  };
  const updateIndexedEducationLevel = (id, index) => {
    setEducationLevel({ ...educationLevel, [index]: id });
    /** Remove Errors after select */
    // setEducationsYearError({ ...educationsYearError, [index]: null });
  };
  const updateSpecialization = (id) => {
    setSpecializationError(null);
    setSpecialization(id);
  };


  const uploadImage = async (e, index) => {
    let input = { types: "masters" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setImageIds({ ...imageIds, [index]: response.data.ids });
      // setImageIds1(response.data.ids);
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleOnChange = ({ fileList }) => {
    setDefaultFileList(fileList);
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
      console.log("Education Level", educationLevel[idx]);
      education.education_year = experience[idx];
      education.education_level = educationLevel[idx];
      documentL.marksheet_id = imageIds[idx];
    });
    UpdatedData.specializations = specialization;
    console.log("Final UpdatedData", UpdatedData);
    setCookie("step3", UpdatedData);
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
              <div className="col-12 form-group">
                <label className="top-label w-100 text-capitalize">

                  {educationsFields.fields.length < 5 && (
                    <a
                      className="btn btn-primary add-icon custom_btn"
                      onClick={() => {
                        educationsFields.append(EDUCATION_FIELDS);
                      }}
                    >
                      <i className="fa fa-plus"></i>
                    </a>
                  )}
                </label>
              </div>

              {educationsFields.fields.map((item, index) => {
                return (
                  <div key={item.id} className="d-flex col-xl-12 mt-0 ">
                    <div className="col-xl-11 row pl-0">
                      <pre>{JSON.stringify(stepInput?.educations?.[index]?.education_level, null, 1)}</pre> 
                      <div className="col-6 ">
                        <div className="form-group">
                          <label className="top-label">Education Level</label>
                          <Select
                            className=""
                            placeholder="Select education level."
                            style={{ width: "100%" }}
                            name="education_level"
                            defaultValue={stepInput?.educations?.[index]?.education_level}

                            onChange={(id) => updateIndexedEducationLevel(id, index) }
                          >
                            {/*  setEducationLevel(id) */}
                            {educationLevelList?.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>

                      <div className="col-xl-6  ">
                        <div className="form-group">
                          <label className="top-label">Education Title</label>
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
                      <div className="col-xl-6 ">
                        <div className="form-group">
                          <label className="top-label">Degree</label>
                          <Controller
                            render={({ field }) => (
                              <input
                                type="text"
                                className="form-control form-control-lg mb-25 mt-25"
                                {...field}
                              />
                            )}
                            name={`educations.${index}.degree`}
                            defaultValue={stepInput?.educations?.[index]?.degree}
                            control={control}
                            {...register(`educations.${index}.degree`)}
                          />
                          {/* {errors?.educations && errors?.educations[index] && (
                            <p className=" text-danger">
                              {errors?.educations[index].degree.message}
                            </p>
                          )} */}
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label className="top-label">Passing Year</label>
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


                      <div className="col-xl-6">
                        <div className="form-group   mb-1">
                          <label className="w-100  ">
                            Marksheet File.
                          </label>
                          <div className="d-inline-flex ">
                            <Upload
                              accept="image/*"
                              customRequest={(e) => uploadImage(e, index)}
                              defaultFileList={defaultFileList}
                              onChange={handleOnChange}
                              listType="picture-card"
                              onPreview={onPreview}
                            >
                              {defaultFileList.length >= 1 ? null : (
                                <div>Upload Image</div>
                              )}
                            </Upload>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="col-xl-1">
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
