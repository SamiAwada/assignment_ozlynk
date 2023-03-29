import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visiblity: false,
  type: "",
  msg: ""
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    handleAlert: (state, { payload }) => {
      state.type = payload.type;
      state.msg = payload.msg;
    }
  }
});

// Action creators are generated for each case reducer function
export const { handleAlert } = alertSlice.actions;

export default alertSlice.reducer;
