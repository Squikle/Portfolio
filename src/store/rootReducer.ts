import { combineReducers } from "redux";
import stateReducer from "./userState";

export default combineReducers({ userState: stateReducer });
