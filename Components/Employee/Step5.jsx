import { Upload } from "antd";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { uploadImageService } from "services/image";

const Step5 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const [stepInput, setStepInput] = useState({});
  const [defaultFileList1, setDefaultFileList1] = useState([]);
  const [imageIds1, setImageIds1] = useState([]);
  const [defaultFileList2, setDefaultFileList2] = useState([]);
  const [imageIds2, setImageIds2] = useState([]);

  const { addToast } = useToasts();

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
                <a href="#" className="btn btn-primary add-icon">
                  <i className="fa fa-plus"></i>
                </a>
              </label>
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">Select Document</label>
                  {/* <pre>{JSON.stringify(stepInput?.input?.first_name)}</pre> */}
                  <select className="form-control form-control-lg">
                    <option value="A+">Voter ID</option>
                    <option value="a-">Passport</option>
                    <option value="b+">Driving Licence</option>
                  </select>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="top-label">Document Number</label>
                  <input
                    type="text"
                    name=""
                    className="form-control form-control-lg  "
                    placeholder="Enter Number"
                  />
                  {/* {errors.last_name && (
                    <span className="mt-5 text-danger">
                      {errors.last_name.message}
                    </span>
                  )} */}
                </div>
              </div>

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
                  onClick={() => stepNext()}
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
