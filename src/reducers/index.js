import { combineReducers } from "redux";
import auth from "./auth";
import assessment from "./assessmentResucer";
import bankreducer from "./bankReducers";

export default combineReducers({
  auth,
  assessment,
  bankreducer
  
});