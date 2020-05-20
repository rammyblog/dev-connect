import { combineReducers } from "redux"
import { authReducer } from "./auth/authReducers"
import { profileReducer } from "./profile/profileReducers"
import { apiCallStatusReducer } from "./apiStatus/apiReducers"
import { educationReducer } from "./education/educationReducers"

// COMBINED REDUCERS
const reducers = {
  profiles: profileReducer,
  auth: authReducer,
  api: apiCallStatusReducer,
  education: educationReducer,
}

export default combineReducers(reducers)
