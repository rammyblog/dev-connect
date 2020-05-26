import {
  addPostApi,
  deletePostApi,
  loadPostsApi,
} from "../../api/postCommentAPI"
import * as types from "./postTypes"
import Router from "next/router"
import { apiCallError, apiCallSuccess } from "../apiStatus/apiActions"

export function loadPostStart() {
  return { type: types.POST_API_START }
}

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS, payload: posts }
}

export function addPostSuccess(post) {
  return { type: types.ADD_POST, payload: post }
}

export function deletePostSuccess(id) {
  return { type: types.DELETE_POST, payload: id }
}

export function addPostDispatch(content) {
  return function (dispatch) {
    dispatch(loadPostStart())

    return addPostApi(content)
      .then((post) => {
        dispatch(addPostSuccess(post.data))
        // Router.push("/dashboard")
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function loadPostsDispatch() {
  return function (dispatch) {
    dispatch(loadPostStart())
    return loadPostsApi()
      .then((post) => {
        dispatch(loadPostsSuccess(post.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

// export function loadUserEducationsRecords() {
//   return function (dispatch) {
//     dispatch(loadEducationStart())
//     return loadUserEducationApi()
//       .then((education) => {
//         dispatch(loadUserEducations(education.data))
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error))
//       })
//   }
// }

// export function getUserProfileEducations(id) {
//   return function (dispatch) {
//     dispatch(loadEducationStart())
//     return dispatch(loadUserProfileEducations(id))
//   }
// }

export function deleteUserPostDispatch(id) {
  return function (dispatch) {
    dispatch(deletePostSuccess(id))
    return deletePostApi(id)
      .then((res) => {
        // dispatch()
        return res
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}
