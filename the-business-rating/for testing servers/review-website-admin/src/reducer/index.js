import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

const rootReducers = combineReducers({
  auth: authReducer,
});

export default rootReducers;
