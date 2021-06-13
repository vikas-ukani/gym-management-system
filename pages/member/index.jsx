import AddMemberProfileStep1 from "Components/MemberProfile/AddMemberProfileStep1";
import AddMemberProfileStep2 from "Components/MemberProfile/AddMemberProfileStep2";
import AddMemberProfileStep3 from "Components/MemberProfile/AddMemberProfileStep3";
import member_profile from "data/member_profile.json";
import { useEffect, useState } from "react";
import _, { findIndex, findWhere } from "underscore";

const Member = () => {
  const data = member_profile.data;
  let memberProfileClone = data;

  const [currentStep, setCurrentStep] = useState(1);
  const [currentStepInput, setCurrentStepInput] = useState({});

  useEffect(() => {
    setCurrentStepInputClone();
  }, [currentStep]);

  const goToNextStep = () => {
    let nextStep = currentStep + 1;

    if (nextStep > memberProfileClone.length) {
    } else {
      // TODO - UPDATE CURRENT STEP VALUE TO MAIN OBJECT
      // setCurrentStep(nextStep)
    }
  };

  const setCurrentStepInputClone = () => {
    let currentProfileCloneNew = findWhere(memberProfileClone, {
      step: currentStep,
    });
    setCurrentStepInput(currentProfileCloneNew);
  };

  return (
    <div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>

          <div className="content-body">
            <section>
              <h3 className="wizard-title">Basic Information</h3>

              <div className="wizard">
                <div className="wizard-inner">
                  <div className="connecting-line"></div>

                  <ul className="d-flex justify-content-center">
                    {memberProfileClone.map((profileClone) => {
                      // || profileClone.is_completed
                      return (
                        <li
                          className={
                            currentStep == profileClone.step && "active"
                          }
                          key={profileClone.step}
                        >
                          <a onClick={() => setCurrentStep(profileClone.step)}>
                            {profileClone.step}
                          </a>
                        </li>
                      );
                    })}
                    {/* <li className="active">
                                            <a href="member-basic-info.html">1</a>
                                        </li>
                                        <li>
                                            <a href="member-contact-information.html">2</a>
                                        </li>
                                        <li>
                                            <a href="member-plan-detail.html">3</a>
                                        </li> */}
                  </ul>
                </div>
              </div>
              {/* <AddMemberProfileStep1 /> */}
              {currentStepInput.step}
              {currentStep == 2 && (
                <AddMemberProfileStep2
                  currentStepInput={currentStepInput}
                  goToNextStep={goToNextStep}
                />
              )}
              {currentStep == 3 && <AddMemberProfileStep3 />}
            </section>
            {/* <!-- // Apex charts section end --> */}
            {/* <!-- Dashboard Analytics end --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
