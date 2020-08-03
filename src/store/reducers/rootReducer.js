import authReducer from "./authReducers";
import projectReducer from "./projectReducer";
import profileReducer from "./profileReducer";
import skillReducer from "./skillReducer";
import workReducer from "./workReducer";
import eduReducer from "./eduReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  profile: profileReducer,
  education: eduReducer,
  skill: skillReducer,
  work: workReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
