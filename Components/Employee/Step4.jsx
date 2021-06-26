import { useEffect, useState } from "react";
import { Select, Upload } from "antd";
import { useAxios } from "hooks";
import { getMasterByCode } from "services/masters";
import { MASTER_CODES } from "constants/common";
import { useToasts } from "react-toast-notifications";
import { getMediaImageAPI, uploadImageService } from "services/image";
import { useForm } from "react-hook-form";
import { setCookie } from "services";

const Step4 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const { addToast } = useToasts()

  const [stepInput, setStepInput] = useState({});
  const [designation, setDesignation] = useState();
  const [designationList, setDesignationList] = useState();

  const [department, setDepartment] = useState();
  const [departmentList, setDepartmentList] = useState();

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
    setDesignation(currentData?.designation_id)
    setDepartment(currentData?.department_id)
    fetchDesignations()
    fetchsetDepartmentList()
    setProfileImagePreviewData()
  }, []);

  const setProfileImagePreviewData = async () => {
    if (stepInput.profile_image_id) {
      const { response: { data }, statusCode, error } = await useAxios(getMediaImageAPI({ ids: [stepInput.profile_image_id] }))
      if (data) {
        setDefaultFileList([
          {
            uid: data[0].id,
            name: data[0].name,
            status: 'done',
            url: data[0].url,
          }
        ])
      }
      if (statusCode == 200) {
      }
    }
  }

  const fetchDesignations = async () => {
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODES.DESIGNATION))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODES.DESIGNATION];
      setDesignationList(child_masters)
      // setDesignationList([...child_masters.map(cM => {return {  "value": cM.id, "label" : cM.name }})])
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
  }

  const fetchsetDepartmentList = async () => {
    const { response: { data }, statusCode, error } = await useAxios(getMasterByCode(MASTER_CODES.DEPARTMENT))
    if (statusCode == 200) {
      let { child_masters } = data[MASTER_CODES.DEPARTMENT];
      setDepartmentList(child_masters)
    } else {
      addToast(error.message, { appearance: 'error', autoDismiss: false })
    }
  }


  const handleOnChange = ({ fileList }) => {
    setDefaultFileList(fileList);
  };
  const onPreview = async (file) => {
    console.log("Preview Cakk");
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
      department_id: department,
      profile_image_id: profileImageId ? profileImageId : (stepInput?.profile_image_id ? stepInput?.profile_image_id : null)
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
                    {/* defaultFileList={defaultFileList} */}
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
                    defaultValue={stepInput?.about_me}
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
                  </label>
                  <Select
                    className=""
                    placeholder="Select Designation."
                    value={designation}
                    style={{ width: "100%" }}
                    onChange={(id) => setDesignation(id)}
                    name="experience"
                  >
                    {designationList?.map(dL => (
                      <Select.Option key={dL.id} value={dL.id}>{dL.name}</Select.Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="w-100">
                    Department
                  </label>
                  <Select
                    className=""
                    placeholder="Select Department."
                    value={department}
                    style={{ width: "100%" }}
                    onChange={(id) => setDepartment(id)}
                    name="department"
                  >
                    {departmentList?.map(dL => (
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
