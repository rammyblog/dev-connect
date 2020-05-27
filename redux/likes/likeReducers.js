import * as types from "./likesTypes"

const initialLikeState = {
  likes: [],
  loading: false,
  userPostsLiked: [],
}

export const likesReducer = (state = initialLikeState, { type, payload }) => {
  switch (type) {
    case types.LIKE_API_START:
      return { ...state, loading: true }
    case types.LOAD_LIKES:
      return { ...state, loading: false, likes: payload }

    case types.ADD_LIKE:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.likes],
      }

    case types.REMOVE_LIKE:
      return {
        ...state,
        loading: false,
        likes: state.likes.filter((like) => like.id !== payload),
      }

    default:
      return state
  }
}
