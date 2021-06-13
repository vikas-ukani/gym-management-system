import { Step1, Step2, Step3, Step4, Step5, Step6 } from "Components/Employee";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInputByStep } from "store/staff/StaffSlice";
import { findIndex, findWhere, max, min } from "underscore";
import Cookies from "js-cookie";
import router from "next/router";

const Steps = () => {
  const add_staff_clone = useSelector((state) => state.staff.add_staff_clone);
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [currentInput, setCurrentInput] = useState({});

  const MIN_STEP = min(add_staff_clone, "step")?.step || 1;
  const MAX_STEP = max(add_staff_clone, "step")?.step || 6;

  useState(() => {
    // function getEmpCurrentStep() {
    // ;
    // 	const item = Cookies.get("emp_current_step");
    //	// const item = localStorage.getItem('emp_current_step');
    // 	if (item) {
    // 		setCurrentStep(item);
    // 	}
    // }
    // window.addEventListener('storage', getEmpCurrentStep);
    // return () => {
    // 	window.removeEventListener('storage', getEmpCurrentStep);
    // };
    // dispatch(setInitialEmployeeData(add_staff_clone));
  }, []);

  useEffect(() => {
    setCurrentInputClone();
  }, [currentStep]);

  const setCurrentInputClone = () => {
    let currentInputData = findWhere(add_staff_clone, { step: currentStep });
    setCurrentInput(currentInputData);
  };

  const goToNextStep = (UpdatedData) => {
    console.log("Next Update", UpdatedData);
    // dispatch(updateInputByStep({ add_staff_clone, UpdatedData }));
    console.log("Next Update", UpdatedData);
    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    } else {
      /** Saving Data After Completing all Steps. */
      router.push('/add-employee')
      console.log("Final Step");
    }
  };

  const goToPrevStep = (UpdatedData) => {
    setCurrentStep(currentStep - 1);
    // dispatch(updateInputByStep({ add_staff_clone, UpdatedData }))
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
                    {add_staff_clone.map((staffClone) => {
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
