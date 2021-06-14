import { getCookie, setCookie } from "services";
import { findIndex } from "underscore";

export const saveStepData = (step, UpdatedData) => {
  let StepData = JSON.parse(getCookie("step_data"));
  let index = findIndex(StepData, {
    step: step,
  });
  if (index >= 0) {
    StepData[index] = UpdatedData;
  }
  setCookie("step_data", StepData);
  console.log("UpdatedData", UpdatedData, StepData);
};
