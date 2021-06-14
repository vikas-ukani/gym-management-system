import { useEffect, useState } from "react";
import { Select } from "antd";
const Step4 = ({ currentData, goToNextStep, goToPrevStep }) => {
  const [stepInput, setStepInput] = useState({});
  const [designation, setDesignation] = useState();
  const [role, setRole] = useState();

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
              <div className="col-lg-6">
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
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="top-label">About Me</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="form-group">
                  <label className="w-100">
                    Designation
                    {/* <a href="#" className="btn btn-primary add-icon"><i className="fa fa-plus"></i></a> */}
                  </label>
                  <Select
                    className=""
                    placeholder="Select experience."
                    value={designation}
                    style={{ width: "100%" }}
                    onChange={(id) => setDesignation(id)}
                    name="experience"
                  >
                    <Select.Option value={1}>Trainer</Select.Option>
                    <Select.Option value={2}>
                      Relationship Manager
                    </Select.Option>
                    <Select.Option value={3}>Janitor</Select.Option>
                    <Select.Option value={4}>Owner</Select.Option>
                  </Select>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="form-group">
                  <label className="w-100">
                    Role
                    {/* <a href="#" className="btn btn-primary add-icon"><i className="fa fa-plus"></i></a> */}
                  </label>
                  <Select
                    className=""
                    placeholder="Select role."
                    value={role}
                    style={{ width: "100%" }}
                    onChange={(id) => setRole(id)}
                    name="role"
                  >
                    {/* {specializations.map((role) => {
											return ( */}
                    <Select.Option value={1}>Owner </Select.Option>
                    <Select.Option value={2}>Admin</Select.Option>
                    <Select.Option value={3}>Member</Select.Option>
                    {/* );
										})} */}
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

export default Step4;
