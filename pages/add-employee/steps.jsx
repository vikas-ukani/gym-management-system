import { Step1, Step2, Step3, Step4, Step5, Step6 } from "Components/Employee";
import { useState, useEffect } from "react";
import { findIndex, findWhere, max, min } from "underscore";
import router from "next/router";
import { getCookie, setCookie } from "services";
import addStaffCloneData from "data/add_staff_clone.json";
import { data as addStaffs } from "data/add_staff.json";

const Steps = () => {
  const [addStaffClone, setAddStaffClone] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [stepInput, setStepInput] = useState({});
  const MIN_STEP = min(addStaffClone, "step")?.step || 1;
  const MAX_STEP = max(addStaffClone, "step")?.step || 6;

  useEffect(() => {
    setCurrentDataClone();
  }, [currentStep]);

  const setCurrentDataClone = () => {
    let currentDataData = findWhere(addStaffs, { step: currentStep });
    setCurrentData(currentDataData);

    /** Get Step wise Data from Cookies */
    let data = JSON.parse(getCookie(`step${currentStep}`)) || null;
    setStepInput(data);
  };

  const goToNextStep = () => {
    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Call API");
      /** Saving Data After Completing all Steps. */
      // router.push("/add-employee");
    }
  };

  const goToPrevStep = (UpdatedData) => {
    setCurrentStep(currentStep - 1);
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
                {currentData?.title?.toLowerCase()}
              </h3>
              <div className="wizard">
                <div className="wizard-inner">
                  <div className="connecting-line"></div>
                  <ul className="d-flex justify-content-center">
                    {addStaffs.map((staffClone) => {
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

              {/* <pre>{JSON.stringify(currentData)}</pre> */}
              {currentStep == 1 && currentData.step == 1 && (
                <Step1 currentData={stepInput} goToNextStep={goToNextStep} />
              )}
              {currentStep == 2 && currentData.step == 2 && (
                <Step2
                  currentData={stepInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 3 && currentData.step == 3 && (
                <Step3
                  currentData={stepInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 4 && currentData.step == 4 && (
                <Step4
                  currentData={stepInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 5 && currentData.step == 5 && (
                <Step5
                  currentData={stepInput}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
              )}
              {currentStep == 6 && currentData.step == 6 && (
                <Step6
                  currentData={stepInput}
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
