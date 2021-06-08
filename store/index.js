import { configureStore } from "@reduxjs/toolkit";
import StaffSliceReducer from "./staff/StaffSlice";
import AuthSliceReducer from "store/auth";

export default configureStore({
  reducer: {
    staff: StaffSliceReducer,
    auth: AuthSliceReducer,
  },
});
