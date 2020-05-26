import { combineReducers } from "redux"
import { authReducer } from "./auth/authReducers"
import { profileReducer } from "./profile/profileReducers"
import apiCallStatusReducer from "./apiStatus/apiReducers"
import { educationReducer } from "./education/educationReducers"
import { experienceReducer } from "./experience/experienceReducers"
import { postReducer } from "./post/postReducers"

// COMBINED REDUCERS
const reducers = {
  profiles: profileReducer,
  auth: authReducer,
  api: apiCallStatusReducer,
  education: educationReducer,
  experience: experienceReducer,
  posts: postReducer,
}

export default combineReducers(reducers)
