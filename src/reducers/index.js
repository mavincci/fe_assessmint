import { combineReducers } from "redux";
import auth from "./auth";
import assessment from "./assessmentResucer";
import bankreducer from "./bankReducers";

const rootReducer = combineReducers({
  auth,
  assessment,
  bankreducer
});

export default rootReducer;