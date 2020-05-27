import { combineReducers } from "redux"
import { authReducer } from "./auth/authReducers"
import { profileReducer } from "./profile/profileReducers"
import apiCallStatusReducer from "./apiStatus/apiReducers"
import { educationReducer } from "./education/educationReducers"
import { experienceReducer } from "./experience/experienceReducers"
import { postReducer } from "./post/postReducers"
import { likesReducer } from "./likes/likeReducers"
import { commentReducer } from "./comments/CommentReducer"
import { dislikesReducer } from "./dislikes/dislikeReducers"

// COMBINED REDUCERS
const reducers = {
  profiles: profileReducer,
  auth: authReducer,
  api: apiCallStatusReducer,
  education: educationReducer,
  experience: experienceReducer,
  posts: postReducer,
  likes: likesReducer,
  dislikes: dislikesReducer,
  comments: commentReducer,
}

export default combineReducers(reducers)
