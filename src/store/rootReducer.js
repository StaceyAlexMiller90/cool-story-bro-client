import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import homepage from './homepage/reducer'
import homepageDetails from './homepagedetails/reducer'

export default combineReducers({
  appState,
  user,
  homepage,
  homepageDetails
});
