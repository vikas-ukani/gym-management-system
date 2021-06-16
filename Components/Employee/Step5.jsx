import { Select, Upload } from "antd";
import { MASTER_CODES } from "constants/common";
import { useAxios } from "hooks";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { uploadImageService } from "services/image";
import { getMasterByCode } from "services/masters";

const Step5 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const [stepInput, setStepInput] = useState({});

  const [defaultFileList1, setDefaultFileList1] = useState([]);
  const [imageIds1, setImageIds1] = useState([]);
  const [defaultFileList2, setDefaultFileList2] = useState([]);
  const [imageIds2, setImageIds2] = useState([]);

  const [documentTypeList, setDocumentTypeList] = useState();


  const [documents, setDocuments] = useState();
  const [documentYearError, setDocumentYearError] = useState();


  const { addToast } = useToasts();
  const documentFieldClone = { document_id: null, document_number: null, front_image_id: null, back_image_id: null }


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      documents: [documentFieldClone],
      ...currentData
    },
  });
  const documentsFields = useFieldArray({ control, name: "documents" });

  useEffect(() => {
    setStepInput(currentData);
    fetchDocumentsTypes()
  }, []);

  const updateIndexedDocument = (id, index) => {
    setDocuments({ ...documents, [index]: id });
    /** Remove Errors after select */
    setDocumentYearError({ ...documentYearError, [index]: null });
  };

  const fetchDocumentsTypes = async () => {
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODES.DOCUMENT))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODES.DOCUMENT];
      setDocumentTypeList(child_masters)
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
    console.log("response, statusCode, error", data, statusCode, error);
  }

  const uploadImage1 = async (e) => {
    let input = { types: "masters" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setImageIds1(response.data.ids);
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };
  const uploadImage2 = async (e) => {
    let input = { types: "masters" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setImageIds2(response.data.ids);
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  const onPreview1 = async (file) => {
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
  const onPreview2 = async (file) => {
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
  const handleOnChange1 = ({ fileList }) => {
    setDefaultFileList1(fileList);
  };
  const handleOnChange2 = ({ fileList }) => {
    setDefaultFileList2(fileList);
  };



  /** Final Save */
  const onSubmit = (inputData) => {
    console.log("inputData", documents[0], inputData);
    // if (!specialization || specialization.length == 0) {
    //   setSpecializationError("The select any specialization.!");
    //   return false;
    // }
    let UpdatedData = {
      ...input,
      ...inputData,
    };

    UpdatedData.documents.forEach((documentL, idx) => {
      documentL.document = documents[idx];
    });
    // console.log("Final UpdatedData", UpdatedData);
    // setCookie("step5", UpdatedData);
    console.log("Saved step5", UpdatedData);
    // goToNextStep(UpdatedData);
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
              <label className="top-label w-100 mb-0 mt-1">
                {documentsFields.fields.length < 5 && (
                  <a
                    className="btn btn-primary add-icon custom_btn"
                    onClick={() => {
                      documentsFields.append(documentFieldClone);
                    }}
                  >
                    <i className="fa fa-plus"></i>
                  </a>
                )}
              </label>
              {documentsFields.fields.map((item, index) => {
                return (
                  <>
                    <div className="col-xl-6">
                      <div className="form-group">
                        <label className="top-label">Select Document</label>
                        <Select
                          className=""
                          placeholder="Select document type."
                          style={{ width: "100%" }}
                          name={`document_id`}
                          value={stepInput?.documents?.[index]?.document_id}
                        >
                          {/*   onChange={(id) =>
                            updateIndexedDocument(id, index)
                          } */}
                          {/* value={stepInput?.documents?.[index]?.document_id} */}
                          {/* defaultValue={stepInput?.documents?.[index]?.document_id} */}
                          {documentTypeList?.map(dL => (
                            <Select.Option key={dL.id} value={dL.id}>
                              {dL.name}
                            </Select.Option>
                          ))}
                        </Select>
                        {/* {errors?.documents && errors?.documents[index] && (
                          <p className=" text-danger">
                            {errors?.documents[index].document_id.message}
                          </p>
                        )} */}
                        {documentYearError?.[index] && (
                          <p className=" text-danger">
                            {documentYearError[index]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-5">
                      <div className="form-group">
                        <label className="top-label">Document Number</label>
                        <Controller
                          render={({ field }) => (
                            <input
                              type="text"
                              className="form-control form-control-lg mb-25 mt-25"
                              {...field}
                            />
                          )}
                          placeholder="Enter Document Number"
                          name={`documents.${index}.document_number`}
                          defaultValue={stepInput?.documents?.[index]?.document_number}
                          control={control}
                          {...register(`documents.${index}.document_number`, {
                            required: "Document number is required.",
                          })}
                        />
                        {errors?.documents && errors?.documents[index] && (
                          <p className=" text-danger">
                            {errors?.documents[index].document_number.message}
                          </p>
                        )}{/* {errors.last_name && (
                    <span className="mt-5 text-danger">
                      {errors.last_name.message}
                    </span>
                  )} */}
                      </div>
                    </div>
                    <div className=" pt-2 ">
                      {documentsFields.fields.length > 1 && (
                        <a
                          onClick={() => documentsFields.remove(index)}
                          className="btn btn-danger custom_btn add-icon mt-50   "
                        >
                          <i className="fa fa-minus "></i>
                        </a>
                      )}
                    </div>
                  </>
                );
              })}
              <div className="col-lg-6">
                <div className="form-group mt-1 mb-3">
                  <label className="w-100 mb-1">
                    Upload Document
                    {/* <a href="#" className="btn btn-primary add-icon">
                      <i className="fa fa-plus"></i>
                    </a> */}
                  </label>
                  <div className="d-inline-flex ">
                    <Upload
                      accept="image/*"
                      customRequest={(e) => uploadImage1(e)}
                      defaultFileList={defaultFileList1}
                      onChange={handleOnChange1}
                      listType="picture-card"
                      onPreview={onPreview1}
                    >
                      {defaultFileList1.length >= 1 ? null : (
                        <div>Front Image</div>
                      )}
                    </Upload>
                    <Upload
                      accept="image/*"
                      customRequest={(e) => uploadImage2(e)}
                      defaultFileList={defaultFileList2}
                      onChange={handleOnChange2}
                      listType="picture-card"
                      onPreview={onPreview2}
                    >
                      {defaultFileList2.length >= 1 ? null : (
                        <div>Back Image</div>
                      )}
                    </Upload>
                  </div>
                  {/* <div className="custom-file">
                    <input
                      type="file"
                      className="form-control custom-file-input"
                      id="customFile"
                      aria-label="File upload"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Upload
                    </label>
                  </div> */}
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

export default Step5;
