import { Upload } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EditSubMasterForm = ({ editRow, onEditSubmit, setIsEditForm }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  }  = useForm({
    reValidateMode: "onSubmit"
  });
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  const [defaultData, setDefaultData] = useState(null);

  const [defaultFileList, setDefaultFileList] = useState([]);
  const [imageIds, setImageIds] = useState([]);

  useState(() => {
    reset({ defaultValue: { ...editRow } });
    setDefaultData(editRow);
  }, []);

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
    <div className="content-body pl-2">
      <section>
        <div className="card p-2">
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
                        defaultValue={defaultData?.name}
                        {...register("name", {
                          required: "The name is required.",
                        })}
                      />
                      {errors.name && (
                        <p className=" text-danger">{errors.name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="form-group">
                      <label className="top-label">Code</label>
                      <input
                        type="text"
                        readOnly={true}
                        className="form-control form-control-lg"
                        name="code"
                        defaultValue={watchAllFields?.name
                          ?.replace(/ /g, "_")
                          .toUpperCase()
                          ?
                          watchAllFields?.name
                            ?.replace(/ /g, "_")
                            .toUpperCase()
                          : defaultData?.code?.replace(/ /g, "_").toUpperCase()}
                        value={watchAllFields?.name
                          ?.replace(/ /g, "_")
                          .toUpperCase()}
                        {...register("code", {
                          required: "The code is required.",
                        })}
                      />
                      {/* readOnly={true} */}
                      {errors.code && (
                        <p className=" text-danger">{errors.code.message}</p>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-xl-6">
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
                  </div> */}

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
                                  defaultChecked={
                                    defaultData?.is_active == true
                                  }
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
                                  defaultChecked={
                                    defaultData?.is_active == false
                                  }
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
                      onClick={handleSubmit(onEditSubmit)}
                      className={
                        "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary   default_gradient"
                      }
                    >
                      Create{" "}
                    </button>
                    {/* <Link href={`${MASTERS_LIST_URL}`}> */}
                    <a
                      onClick={() => setIsEditForm(false)}
                      className={
                        "float-right mx-1 btn btn-pill mb-sm-0 mb-2 text_theme_primary custom_btn"
                      }
                    >
                      Cancel
                    </a>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditSubMasterForm;
