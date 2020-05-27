import * as types from "./CommentTypes"

const initialCommentState = {
  comments: [],
  loading: false,
}

export const commentReducer = (
  state = initialCommentState,
  { type, payload }
) => {
  switch (type) {
    case types.COMMENT_API_START:
      return { ...state, loading: true }
    case types.LOAD_COMMENTS:
      return { ...state, loading: false, comments: payload }
    case types.ADD_COMMENT:
      return {
        ...state,
        loading: false,
        comments: [payload, ...state.comments],
      }

    case types.DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter((comment) => comment.id !== payload),
      }

    default:
      return state
  }
}
