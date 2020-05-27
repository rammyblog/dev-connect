import { getDislikesApi, addRemoveDislikesApi } from "../../api/postCommentAPI"
import * as types from "./dislikesTypes"
import Router from "next/router"
import { apiCallError, apiCallSuccess } from "../apiStatus/apiActions"

export function loadDislikeStart() {
  return { type: types.DISLIKE_API_START }
}

export function loadDislikeSuccess(dislikes) {
  return { type: types.LOAD_DISLIKES, payload: dislikes }
}

export function addDislikeSuccess(dislike) {
  return { type: types.ADD_DISLIKE, payload: dislike }
}

export function removeDislikeSuccess(id) {
  return { type: types.REMOVE_DISLIKE, payload: id }
}

export function addDislikeDispatch(context) {
  context.action = "add"
  return function (dispatch) {
    dispatch(loadDislikeStart())

    return addRemoveDislikesApi(context)
      .then((dislike) => {
        dispatch(addDislikeSuccess(dislike.data))
        // Router.push("/dashboard")
      })
      .catch((error) => {
        console.log(error, "here")

        dispatch(apiCallError(error))
      })
  }
}

export function removeDislikeDispatch(context) {
  context.action = "remove"
  return function (dispatch) {
    dispatch(removeDislikeSuccess(context.id))
    return addRemoveDislikesApi(context)
      .then((res) => {
        // dispatch()
        return res
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function loadDislikeDispatch() {
  return function (dispatch) {
    dispatch(loadDislikeStart())
    return getDislikesApi()
      .then((dislike) => {
        dispatch(loadDislikeSuccess(dislike.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}
