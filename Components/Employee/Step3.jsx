import { useEffect, useState } from "react";
import { DatePicker, Image, Select, Upload } from "antd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { setCookie } from "services";
import { MASTER_CODES } from "constants/common";
import { useAxios } from "hooks";
import moment from 'moment'
import { getMasterByCode } from "services/masters";
import { useToasts } from "react-toast-notifications";
import { getMediaImageAPI, uploadImageService } from "services/image";
import { first } from "underscore";

const Step3 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const { addToast } = useToasts()

  console.log('initial;', currentData);

  const [input, setInput] = useState({});
  const [stepInput, setStepInput] = useState({});
  const [yearsOfExperience, setYearsOfExperience] = useState();
  const [experience, setExperience] = useState();

  const [specialization, setSpecialization] = useState();
  const [specializations, setSpecializations] = useState([]);
  const [specializationError, setSpecializationError] = useState();
  const [educationsYearError, setEducationsYearError] = useState();

  const [educationLevelList, setEducationLevelList] = useState()
  const [educationLevel, setEducationLevel] = useState()

  const [defaultFileList, setDefaultFileList] = useState([]);
  const [imageIds, setImageIds] = useState([]);

  const [defaultCertificateFileList, setDefaultCertificateFileList] = useState([]);
  const [imageCertificateFileIds, setImageCertificateFileIds] = useState([]);

  const [defaultExperienceLetterFileList, setDefaultExperienceLetterFileList] = useState([]);
  const [imageExperienceLetterFileIds, setImageExperienceLetterFileIds] = useState([]);

  const EDUCATION_FIELDS = {
    education_id: null,
    school_name: null,
    degree: null,
    education_year: null,
    mark_sheet_id: null
  }
  const CERTIFICATIONS_FIELDS = {
    title: null,
    certificate_id: null,
    url: null,
    year: null,
    certificate_file_id: null
  }
  const EXPERIENCES_FIELDS = {
    title: null,
    organisation_name: null,
    date_of_joining: null,
    date_of_exit: null,
    experience_letter_id: null,
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      educations: [],
      certifications: [],
      experiences: [],
      ...currentData
    },
  });
  const educationsFields = useFieldArray({ control, name: "educations" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const experiencesFields = useFieldArray({ control, name: "experiences" });

  useEffect(() => {
    setStepInput(currentData);
    setSpecialization(currentData?.specializations)
    fetchAllSpecializations()
    fetchAllEducationLevelList()
  }, []);

  const getImagePreviewById = async (id) => {
    console.log('get id', id);
    if (id) {
      const { response: { data }, statusCode, error } = await useAxios(getMediaImageAPI({ ids: [id] }))
      if (data) {
        console.log('path', data[0].url);
        return data[0].url
        return {
          uid: data[0].id,
          name: data[0].name,
          status: 'done',
          url: data[0].url,
        }
        // return data[0].url
        // setDefaultFileList([
        //   {
        //     uid: data[0].id,
        //     name: data[0].name,
        //     status: 'done',
        //     url: data[0].url,
        //   }
        // ])
      }
    }
  }

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

  const uploadCertificateFile = async (e, index) => {
    let input = { types: "masters" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setImageCertificateFileIds({ ...imageCertificateFileIds, [index]: response.data.ids });
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };
  const uploadExperienceLetterFile = async (e, index) => {
    let input = { types: "masters" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setImageExperienceLetterFileIds({ ...imageExperienceLetterFileIds, [index]: response.data.ids });
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

  const handleOnChangeCertificateFile = ({ fileList }) => {
    setDefaultCertificateFileList(fileList);
  };
  const handleOnChangeExperienceLetterFile = ({ fileList }) => {
    setDefaultExperienceLetterFileList(fileList);
  };

  const onPreviewCertificateFile = async (file) => {
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

  const onPreviewExperienceLetterFile = async (file) => {
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


  const onSubmit = (inputData) => {
    // if (!specialization || specialization.length == 0) {
    // setSpecializationError("The select any specialization.!");
    // return false;
    // }
    let UpdatedData = {
      ...input,
      ...inputData,
    };
    UpdatedData?.educations?.forEach((education, idx) => {
      if (experience && experience[idx]) {
        education.education_year = experience[idx] || 0;
      }
      if (educationLevel && educationLevel[idx]) {
        education.education_id = educationLevel[idx] || 0;
      }
      if (imageIds && imageIds[idx]) {
        education.marksheet_id = first(imageIds[idx]) || 0;
      }
    });
    /** Adding Certificate Files */
    UpdatedData?.certifications?.forEach((certification, idx) => {
      if (imageCertificateFileIds && imageCertificateFileIds[idx]) {
        certification.certificate_file_id = first(imageCertificateFileIds[idx]) || 0;
      }
    });
    /** Adding Experience Letter Files */
    UpdatedData?.experiences?.forEach((experience, idx) => {
      if (imageExperienceLetterFileIds && imageExperienceLetterFileIds[idx]) {
        experience.experience_letter_id = first(imageExperienceLetterFileIds[idx]) || 0;
      }
    });
    UpdatedData.years_of_experience = yearsOfExperience || 0;
    UpdatedData.specializations = specialization || 0;
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
              <div className="col-xl-12">
                <div className="card p-1">
                  <div className="col-12 form-group">
                    <label className="top-label text-capitalize w-100 text-capitalize">
                      <b className="font-medium-5">educations</b>
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
                          <div className="col-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">Education Level</label>
                              <Select
                                className=""
                                placeholder="Select education level."
                                style={{ width: "100%" }}
                                name="education_id"
                                defaultValue={stepInput?.educations?.[index]?.education_id}
                                onChange={(id) => updateIndexedEducationLevel(id, index)}
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
                              <label className="top-label text-capitalize">Education Title</label>
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
                                {...register(`educations.${index}.education`)}
                              />

                            </div>
                          </div>
                          <div className="col-xl-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">Degree</label>
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
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="form-group">
                              <label className="top-label text-capitalize">Passing Year</label>
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
                              {/* {educationsYearError?.[index] && (
                                <p className=" text-danger">
                                  {educationsYearError[index]}
                                </p>
                              )} */}
                            </div>
                          </div>

                          <div className="col-xl-6">
                            <div className="form-group ">
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
                          <hr className="border-2" />
                        </div>
                        <div className="col-xl-1">
                          {/* {educationsFields.fields.length > 1 && ( */}
                          <a
                            onClick={() => educationsFields.remove(index)}
                            className="btn btn-danger custom_btn add-icon mt-50   "
                          >
                            <i className="fa fa-minus "></i>
                          </a>
                          {/* )} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card p-1">
                  <div className="col-12 form-group">
                    <label className="top-label text-capitalize w-100 text-capitalize">
                      <b className="font-medium-5">Certificate</b>
                      {certificationsFields.fields.length < 5 && (
                        <a
                          className="btn btn-primary add-icon custom_btn"
                          onClick={() => {
                            certificationsFields.append(CERTIFICATIONS_FIELDS);
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </a>
                      )}
                    </label>
                  </div>
                  {certificationsFields.fields.map((item, index) => {
                    return (
                      <div key={item.id} className="d-flex col-xl-12 mt-0 ">
                        <div className="col-xl-11 row pl-0">
                          <div className="col-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">title</label>
                              <Controller
                                render={({ field }) => (
                                  <input
                                    type="text"
                                    className="form-control form-control-lg mb-25 mt-25"
                                    {...field}
                                  />
                                )}
                                name={`certifications.${index}.title`}
                                defaultValue={stepInput?.certifications?.[index]?.title}
                                control={control}
                                {...register(`certifications.${index}.title`)}
                              />
                            </div>
                          </div>

                          <div className="col-xl-6  ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">certificate ID/Number</label>
                              <input
                                type="text"
                                className="form-control form-control-lg mb-25 mt-25"
                                name={`certifications.${index}.certificate_id`}
                                defaultValue={stepInput?.certifications?.[index]?.certificate_id}
                                {...register(`certifications.${index}.certificate_id`)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">url</label>
                              <input
                                type="text"
                                className="form-control form-control-lg mb-25 mt-25"
                                name={`certifications.${index}.url`}
                                defaultValue={stepInput?.certifications?.[index]?.url}
                                {...register(`certifications.${index}.url`)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="form-group">
                              <label className="top-label text-capitalize">year</label>
                              <input
                                type="text"
                                className="form-control form-control-lg mb-25 mt-25"
                                name={`certifications.${index}.year`}
                                defaultValue={stepInput?.certifications?.[index]?.year}
                                {...register(`certifications.${index}.year`)}
                              />
                            </div>
                          </div>

                          <div className="col-xl-6">
                            <div className="form-group ">
                              <label className="w-100  ">
                                certificate file.
                              </label>
                              <div className="d-inline-flex ">
                                <Upload
                                  accept="image/*"
                                  customRequest={(e) => uploadCertificateFile(e, index)}
                                  defaultFileList={defaultCertificateFileList}
                                  onChange={handleOnChangeCertificateFile}
                                  listType="picture-card"
                                  onPreview={onPreviewCertificateFile}
                                >
                                  {defaultCertificateFileList.length >= 1 ? null : (
                                    <div>Upload</div>
                                  )}
                                </Upload>
                              </div>
                            </div>
                          </div>
                          <hr className="border-2" />
                        </div>
                        <div className="col-xl-1">
                          {/* {educationsFields.fields.length > 1 && ( */}
                          <a
                            onClick={() => certificationsFields.remove(index)}
                            className="btn btn-danger custom_btn add-icon mt-50 "
                          >
                            <i className="fa fa-minus "></i>
                          </a>
                          {/* )} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card p-1">
                  <div className="col-12 form-group">
                    <label className="top-label text-capitalize w-100 text-capitalize">
                      <b className="font-medium-5">experiences</b>
                      {experiencesFields.fields.length < 5 && (
                        <a
                          className="btn btn-primary add-icon custom_btn"
                          onClick={() => {
                            experiencesFields.append(EXPERIENCES_FIELDS);
                          }}
                        >
                          <i className="fa fa-plus"></i>
                        </a>
                      )}
                    </label>
                  </div>
                  {experiencesFields.fields.map((item, index) => {
                    return (
                      <div key={item.id} className="d-flex col-xl-12 mt-0 ">
                        <div className="col-xl-11 row pl-0">
                          <div className="col-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">title</label>
                              <input
                                type="text"
                                className="form-control form-control-lg mb-25 mt-25"
                                name={`experiences.${index}.title`}
                                defaultValue={stepInput?.experiences?.[index]?.title}
                                {...register(`experiences.${index}.title`)}
                              />
                            </div>
                          </div>

                          <div className="col-xl-6  ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">organisation name</label>
                              <input
                                type="text"
                                className="form-control form-control-lg mb-25 mt-25"
                                name={`experiences.${index}.organisation_name`}
                                defaultValue={stepInput?.experiences?.[index]?.organisation_name}
                                {...register(`experiences.${index}.organisation_name`)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">date of joining</label>
                              {/* <pre>{JSON.stringify(moment(moment(stepInput?.experiences?.[index]?.date_of_joining).format( 'DD-MM-YYYY')), null, 1)}</pre> */}
                              <Controller
                                control={control}
                                name={`experiences.${index}.date_of_joining`}
                                {...register(`experiences.${index}.date_of_joining`)}
                                render={({ field }) => (
                                  <DatePicker
                                    format={"DD-MM-YYYY"}
                                    defaultValue={stepInput?.experiences?.[index]?.date_of_joining}
                                    className="form-control form-control-lg mb-25 mt-25"
                                    placeholder='Select joining date'
                                    onChange={(date) => setValue(`experiences.${index}.date_of_joining`, date, { shouldValidate: true, shouldDirty: true })}
                                  />
                                )}
                              />

                            </div>
                          </div>
                          <div className="col-xl-6 ">
                            <div className="form-group">
                              <label className="top-label text-capitalize">date of exit</label>
                              <Controller
                                control={control}
                                name={`experiences.${index}.date_of_exit`}
                                defaultValue={stepInput?.experiences?.[index]?.date_of_exit}
                                {...register(`experiences.${index}.date_of_exit`)}
                                render={({ field }) => (
                                  <DatePicker
                                    className="form-control form-control-lg mb-25 mt-25"
                                    placeholderText='Select exit date'
                                    onChange={(date) => setValue(`experiences.${index}.date_of_exit`, date, { shouldValidate: true, shouldDirty: true })}
                                    selected={field.value}
                                  />
                                )}
                              />
                            </div>
                          </div>

                          <div className="col-xl-6">
                            <div className="form-group ">
                              <label className="w-100 text-capitalize ">
                                experience letter
                              </label>
                              <div className="d-inline-flex ">
                            
                                <Upload
                                  accept="image/*"
                                  customRequest={(e) => uploadExperienceLetterFile(e, index)}
                                  defaultFileList={defaultExperienceLetterFileList}
                                  onChange={handleOnChangeExperienceLetterFile}
                                  listType="picture-card"
                                  onPreview={onPreview}
                                >
                                  {/* defaultFileList={() => stepInput?.experiences?.[index]?.experience_letter_id ? getImagePreviewById(stepInput?.experiences?.[index]?.experience_letter_id) : onPreviewExperienceLetterFile} */}
                                  {/* onPreview={() => { stepInput?.experiences?.[index]?.experience_letter_id ? getImagePreviewById(stepInput?.experiences?.[index]?.experience_letter_id) :  onPreviewExperienceLetterFile }} */}
                                  {defaultExperienceLetterFileList.length >= 1 ? null : (
                                    <div>Upload</div>
                                  )}
                                </Upload>
                              </div>
                            </div>
                          </div>

                          <hr className="border-2" />
                        </div>
                        <div className="col-xl-1">
                          {/* {educationsFields.fields.length > 1 && ( */}
                          <a
                            onClick={() => experiencesFields.remove(index)}
                            className="btn btn-danger custom_btn add-icon mt-50   "
                          >
                            <i className="fa fa-minus "></i>
                          </a>
                          {/* )} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                        {/* {specializationError && (
                          <p className=" text-danger">{specializationError}</p>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label text-capitalize">Years of experience</label>
                  <Select
                    className=""
                    placeholder="Select years of experience."
                    value={stepInput?.years_of_experience}
                    style={{ width: "100%" }}
                    name="years_of_experience"
                    defaultValue={stepInput?.years_of_experience}
                    onChange={(id) => setYearsOfExperience(id)}
                  >
                    <Select.Option value={1}>1</Select.Option>
                    <Select.Option value={2}>2</Select.Option>
                    <Select.Option value={3}>3</Select.Option>
                    <Select.Option value={4}>4</Select.Option>
                    <Select.Option value={5}>5</Select.Option>
                    <Select.Option value={6}>6</Select.Option>
                    <Select.Option value={7}>7</Select.Option>
                    <Select.Option value={8}>8</Select.Option>
                    <Select.Option value={9}>9</Select.Option>
                    <Select.Option value={10}>10</Select.Option>
                    <Select.Option value={11}>11</Select.Option>
                    <Select.Option value={12}>12</Select.Option>
                    <Select.Option value={13}>13</Select.Option>
                    <Select.Option value={14}>14</Select.Option>
                    <Select.Option value={15}>15</Select.Option>
                    <Select.Option value={16}>16</Select.Option>
                    <Select.Option value={17}>17</Select.Option>
                    <Select.Option value={18}>18</Select.Option>
                    <Select.Option value={19}>19</Select.Option>
                    <Select.Option value={20}>20</Select.Option>
                    {/* );
										})} */}
                  </Select>
                  {/* {educationsYearError?.[index] && (
                    <p className=" text-danger">
                      {educationsYearError[index]}
                    </p>
                  )} */}
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
