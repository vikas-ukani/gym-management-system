import { Step1, Step2, Step3, Step4, Step5, Step6 } from "Components/Employee";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInputByStep } from "store/staff/StaffSlice";
import { findIndex, findWhere, max, min } from "underscore";
import router from "next/router";
import { getCookie, setCookie } from "services";
import addStaffCloneData from "data/add_staff_clone.json";

const Steps = () => {
  // const addStaffClone = JSON.parse(getCookie("step_data"));
  const [addStaffClone, setAddStaffClone] = useState([]);
  // const addStaffClone = useSelector((state) => state.staff.addStaffClone);
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [currentInput, setCurrentInput] = useState({});
  const MIN_STEP = min(addStaffClone, "step")?.step || 1;
  const MAX_STEP = max(addStaffClone, "step")?.step || 6;

  useEffect(async () => {
    console.log("Fetching", addStaffClone);
    /** Check if data stored in cookie or not. */
    if (getCookie("step_data") && JSON.parse(getCookie("step_data"))) {
      let dataClone = JSON.parse(getCookie("step_data"));
      console.log("TRUE", dataClone);
      setAddStaffClone(dataClone);
    } else {
      console.log("FALSE", addStaffCloneData);
      setAddStaffClone(addStaffCloneData.data);
      setCookie("step_data", addStaffCloneData.data);
    }
    console.log("Fetch ", addStaffClone);
  }, []);

  useEffect(() => {
    setCurrentInputClone();
  }, [currentStep]);

  const setCurrentInputClone = () => {
    console.log("Data", addStaffClone);
    let currentInputData = findWhere(addStaffClone, { step: currentStep });
    console.log("currentInputData", addStaffClone, currentInputData);
    setCurrentInput(currentInputData);
  };

  const goToNextStep = (UpdatedData) => {
    // dispatch(updateInputByStep({ addStaffClone, UpdatedData }));
    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    } else {
      /** Saving Data After Completing all Steps. */
      router.push("/add-employee");
      console.log("Final Step");
    }
  };

  const goToPrevStep = (UpdatedData) => {
    setCurrentStep(currentStep - 1);
    // dispatch(updateInputByStep({ addStaffClone, UpdatedData }))
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
              <h3 className="wizard-title text-capitalize">
                {currentInput?.title?.toLowerCase()}
              </h3>
              {/* <pre>{JSON.stringify(currentInput)}</pre> */}
              <div className="wizard">
                <div className="wizard-inner">
                  <div className="connecting-line"></div>
                  <ul className="d-flex justify-content-center">
                    {addStaffClone.map((staffClone) => {
                      return (
                        <li key={staffClone.step}>
                          <a
                            onClick={() => setCurrentStep(staffClone.step)}
                            className={
                              currentStep >= staffClone.step
                                ? " default_gradient"
                                : ""
                            }
                          >
                            {staffClone.step}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* <pre>{JSON.stringify(currentStep)}</pre> */}
              {currentStep == 1 && currentInput.step == 1 && (
                <Step1
                  currentInput={currentInput}
                  goToNextStep={goToNextStep}
                />
              )}
              {currentStep == 2 && currentInput.step == 2 && (
                <Step2
                  currentInput={currentInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 3 && currentInput.step == 3 && (
                <Step3
                  currentInput={currentInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 4 && currentInput.step == 4 && (
                <Step4
                  currentInput={currentInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 5 && currentInput.step == 5 && (
                <Step5
                  currentInput={currentInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 6 && currentInput.step == 6 && (
                <Step6
                  currentInput={currentInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
