import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState: {
    workspaces: [],
  },
  reducers: {
    initializeWorkspace: (state, action) => {
      console.log("initializeWorkspace", action.payload);
      state.workspaces = action.payload;
    },
    addWorkspace: (state, action) => {
      state.workspaces = [...state.workspaces, action.payload];
    },
  },
});

export const { initializeWorkspace, addWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
