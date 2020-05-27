import {
  addCommentApi,
  deleteCommentApi,
  loadCommentsApi,
} from "../../api/postCommentAPI"
import * as types from "./CommentTypes"
import Router from "next/router"
import { apiCallError, apiCallSuccess } from "../apiStatus/apiActions"
import { deletePostSuccess } from "../post/postActions"

export function loadCommentStart() {
  return { type: types.COMMENT_API_START }
}

export function loadCommentsSuccess(comments) {
  return { type: types.LOAD_COMMENTS, payload: comments }
}

export function addCommentSuccess(comment) {
  return { type: types.ADD_COMMENT, payload: comment }
}

export function deleteCommentSuccess(id) {
  return { type: types.DELETE_COMMENT, payload: id }
}

export function addCommentDispatch(content, post_id) {
  return function (dispatch) {
    dispatch(loadCommentStart())

    return addCommentApi(content, post_id)
      .then((comment) => {
        dispatch(addCommentSuccess(comment.data))

        // Router.push("/dashboard")
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function loadCommentsDispatch(post_id) {
  return function (dispatch) {
    dispatch(loadCommentStart())
    return loadCommentsApi(post_id)
      .then((comment) => {
        dispatch(loadCommentsSuccess(comment.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function deleteUserCommentDispatch(id) {
  return function (dispatch) {
    dispatch(deletePostSuccess(id))
    return deleteCommentApi(id)
      .then((res) => {
        // dispatch()
        return res
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}
