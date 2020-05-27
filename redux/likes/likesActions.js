import {
  addLikesApi,
  getLikesApi,
  removeLikesApi,
} from "../../api/postCommentAPI"
import * as types from "./likesTypes"
import Router from "next/router"
import { apiCallError, apiCallSuccess } from "../apiStatus/apiActions"

export function loadLikesStart() {
  return { type: types.LIKE_API_START }
}

export function loadLikesSuccess(likes) {
  return { type: types.LOAD_LIKES, payload: likes }
}

export function addLikesSuccess(like) {
  return { type: types.ADD_LIKE, payload: like }
}

export function removeLikeSuccess(id) {
  return { type: types.REMOVE_LIKE, payload: id }
}

export function addLikeDispatch(context) {
  return function (dispatch) {
    dispatch(loadLikesStart())

    return addLikesApi(context)
      .then((like) => {
        dispatch(addLikesSuccess(like.data))
        // Router.push("/dashboard")
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function loadLikesDispatch() {
  return function (dispatch) {
    dispatch(loadLikesStart())
    return getLikesApi()
      .then((like) => {
        dispatch(loadLikesSuccess(like.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function removeLikesDispatch(context) {
  return function (dispatch) {
    dispatch(removeLikeSuccess(context.id))
    return removeLikesApi(context)
      .then((res) => {
        // dispatch()
        return res
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}
