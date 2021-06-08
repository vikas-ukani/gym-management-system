import { createSlice } from "@reduxjs/toolkit";
import add_staff_clone from "data/add_staff_clone.json";
import { findIndex } from "underscore";
import Cookies from "js-cookie";

const initialState = {
  current_step: 1,
  add_staff_clone: add_staff_clone.data,
};

export const StaffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setInitialEmployeeData: (state, action) => {
      if (action.payload) {
        console.log("Initial Data", action.payload);
        let AllData = JSON.stringify(action.payload);
        console.log("AllData", AllData);
        Cookies.set("employee_data", AllData);
      }
    },
    updateInputByStep: (state, action) => {
      if (action.payload) {
        let AllData = JSON.parse(Cookies.get("employee_data"));
        console.log("AllData", AllData);
        console.log("AllData", state.add_staff_clone);
        let data = action.payload;
        console.log("Data", data.UpdatedData.step, state.add_staff_clone);
        let index = findIndex(state.add_staff_clone, {
          step: data.UpdatedData.step,
        });
        console.log("AdS", index, data);
        if (index >= 0) {
          state.add_staff_clone[index] = data.UpdatedData;
          state.current_step = data.NextStep;
        }
      }
    },
  },
});

export const { updateInputByStep, setInitialEmployeeData } = StaffSlice.actions;

export default StaffSlice.reducer;
