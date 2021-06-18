import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "hooks";
import { useToasts } from "react-toast-notifications";
import { MASTERS_LIST_URL } from "constants";
import Link from "next/link";
import { Upload } from "antd";
import { uploadImageService } from "services/image";
import { createMastersAPI } from "services/masters";
import router from "next/router";

const CreateMaster = () => {
  const MODULE_NAME = "Masters";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  const [defaultFileList, setDefaultFileList] = useState([]);
  const [code, setCode] = useState();
  const [imageIds, setImageIds] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const { addToast } = useToasts();

  let nameCode = watch("name", "");
  // useState(() => {
  //   setCode(nameCode.replace(/ /g, "_").toUpperCase());
  // }, [nameCode]);

  const onSubmit = async (input) => {
    input.image_id = imageIds[0];
    input.parent_id = null;
    input.is_active = input.is_active === "true" || input.is_active == 1;

    const { response, error, loading, statusCode } = await useAxios(
      createMastersAPI(input)
    );
    if (statusCode == 400 || statusCode == 422) {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    } else if (statusCode === 201) {
      addToast(response.message, { appearance: "success", autoDismiss: true });
      router.push(MASTERS_LIST_URL);
    }
  };

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
    let input = { types: "masters" };
    const { response, error, loading, statusCode } = await uploadImageService(
      e,
      input
    );
    if (statusCode == 201) {
      setImageIds(response.data.ids);
      addToast(response.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"> </div>
        <div className="header-navbar-shadow"> </div>
        <div className="content-wrapper">
          <div className="content-header row"> </div>

          <div className="content-body">
            <section>
              <h3 className="wizard-title text-capitalize text-left mb-3 text_theme_primary">
                Create {MODULE_NAME}
              </h3>
              <form role="form">
                <div className="tab-content">
                  <div className="tab-pane active" role="tabpanel" id="step1">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="form-group">
                          <label className="top-label">Name</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="name"
                            {...register("name", {
                              required: "The name is required.",
                            })}
                          />
                          {errors.name && (
                            <p className=" text-danger">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="form-group">
                          <label className="top-label">Code</label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="code"
                            value={watchAllFields?.code
                              ?.replace(/ /g, "_")
                              .toUpperCase()} 
                            {...register("code")}
                          />
                          {/*  defaultValue={watchAllFields?.name
                              ?.replace(/ /g, "_")
                              .toUpperCase()}
                            value={watchAllFields?.name
                              ?.replace(/ /g, "_")
                              .toUpperCase()} */}
                          {/* readOnly={true} */}
                          {errors.code && (
                            <p className=" text-danger">
                              {errors.code.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="form-group">
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

                      <div className="col-xl-6">
                        <div className="col-xl-12">
                          <div className="form-group">
                            <label className="text-capitalize"> active</label>
                            <ul className="list-unstyled mb-0">
                              <li className="d-inline-block mr-2">
                                <fieldset>
                                  <div className="vs-radio-con">
                                    <input
                                      type="radio"
                                      name="is_active"
                                      defaultChecked={true}
                                      value={true}
                                      {...register("is_active", {
                                        required: "The active is required.",
                                      })}
                                    />
                                    <span className="vs-radio">
                                      <span className="vs-radio--border"></span>
                                      <span className="vs-radio--circle"></span>
                                    </span>
                                    <span className=""> Active </span>
                                  </div>
                                </fieldset>
                              </li>
                              <li className="d-inline-block mr-2">
                                <fieldset>
                                  <div className="vs-radio-con">
                                    <input
                                      type="radio"
                                      name="is_active"
                                      defaultChecked={false}
                                      value={false}
                                      {...register("is_active")}
                                    />
                                    <span className="vs-radio">
                                      <span className="vs-radio--border"></span>
                                      <span className="vs-radio--circle"></span>
                                    </span>
                                    <span className="">Inactive</span>
                                  </div>
                                </fieldset>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-6 "></div>
                      <div className="col-6  ">
                        <button
                          onClick={handleSubmit(onSubmit)}
                          className={
                            "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
                          }
                        >
                          Create{" "}
                        </button>
                        <Link href={`${MASTERS_LIST_URL}`}>
                          <a
                            className={
                              "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                            }
                          >
                            Cancel
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMaster;
