import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alert";

const store = configureStore({
  reducer: {
    alert: alertReducer
  }
});

export default store;
