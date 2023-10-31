import { configureStore } from "@reduxjs/toolkit";
// reducers
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import typeReducer from "./typeSelectedSlice";
import popUpOportunityReducer from "./popUpOportunity";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    typesSelected: typeReducer,
    popUpOportunity: popUpOportunityReducer,
  },
});
