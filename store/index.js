import { configureStore } from "@reduxjs/toolkit";
import StaffSliceReducer from "./staff/StaffSlice";
import AuthSliceReducer from "store/auth";
import workspaceReducer from "store/WorkspaceSlice";

export default configureStore({
  reducer: {
    staff: StaffSliceReducer,
    auth: AuthSliceReducer,
    workspace: workspaceReducer,
  },
});
