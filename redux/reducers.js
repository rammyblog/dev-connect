import { combineReducers } from "redux"
import { authReducer } from "./auth/authReducers"
import { profileReducer } from "./profile/profileReducers"
import { apiCallStatusReducer } from "./apiStatus/apiReducers"

// COMBINED REDUCERS
const reducers = {
  profiles: profileReducer,
  auth: authReducer,
  api: apiCallStatusReducer,
}

export default combineReducers(reducers)
