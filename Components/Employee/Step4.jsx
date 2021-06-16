import { useEffect, useState } from "react";
import { Select, Upload } from "antd";
import { useAxios } from "hooks";
import { getMasterByCode } from "services/masters";
import { MASTER_CODES } from "constants/common";
import { useToasts } from "react-toast-notifications";
import { uploadImageService } from "services/image";
import { useForm } from "react-hook-form";
import { setCookie } from "services";



const Step4 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const { addToast } = useToasts()

  const [stepInput, setStepInput] = useState({});
  const [designation, setDesignation] = useState();
  const [designationList, setDesignationList] = useState();


  const [defaultFileList, setDefaultFileList] = useState([]);
  const [profileImageId, setProfileImageId] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();




  useEffect(() => {
    setStepInput(currentData);
    setDesignation(currentData.designation_id)
    fetchDesignations()
  }, []);

  const fetchDesignations = async () => {
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODES.DESIGNATION))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODES.DESIGNATION];

      setDesignationList(child_masters)
      // setDesignationList([...child_masters.map(cM => {return {  "value": cM.id, "label" : cM.name }})])
    } else {

      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
    console.log("response, statusCode, error", data, statusCode, error);
    // fetchDesignations
  }


  const handleOnChange = ({ fileList }) => {
    setDefaultFileList(fileList);
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

  const uploadImage = async (e) => {
    let input = { types: "staff" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setProfileImageId(response.data.ids[0]);
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  const onSubmit = async inputData => {

    let UpdatedData = {
      ...stepInput,
      about_me: inputData.about_me ? inputData.about_me : stepInput.about_me,
      designation_id: designation,
      profile_image_id: profileImageId ? profileImageId : (stepInput?.profile_image_id ? stepInput?.profile_image_id : null  )

    };

    setCookie("step4", UpdatedData);
    console.log("Saved", UpdatedData);
    goToNextStep(UpdatedData);

  }



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
            <div className="row d-flex">
              <div className="col-2">
                <div className="form-group">
                  <label className="top-label">Profile Picture</label>
                  <Upload
                    accept="image/*"
                    customRequest={(e) => uploadImage(e)}
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

              <div className="col-10">
                <div className="form-group">
                  <label className="top-label">About Me</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="5"
                    defaultValue={stepInput.about_me}
                    {...register('about_me')}
                  ></textarea>
                </div>
              </div>

              {/* <div className="col-lg-6">
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="form-control custom-file-input"
                      id="customFile"
                      aria-label="File upload"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Profile Picture
                    </label>
                  </div>
                </div>
              </div> */}

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="w-100">
                    Designation
                    {/* <a href="#" className="btn btn-primary add-icon"><i className="fa fa-plus"></i></a> */}
                  </label>
                  <Select
                    className=""
                    placeholder="Select Designation."
                    value={designation}
                    style={{ width: "100%" }}
                    onChange={(id) => setDesignation(id)}
                    name="experience"
                  >
                    {/* <Select.Option value={null} disabled={true}>Select Designation</Select.Option> */}
                    {designationList?.map(dL => (
                      <Select.Option key={dL.id} value={dL.id}>{dL.name}</Select.Option>
                    ))}
                  </Select>
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

export default Step4;
