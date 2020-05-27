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
      return {
        ...state,
        loading: false,
        likes: payload.data,
        userPostsLiked: payload.user_likes,
      }

    case types.ADD_LIKE:
      const newLikeState = state.likes.filter(
        (like) => like.id === payload.data.id
      )

      newLikeState[0].likes += 1

      return {
        ...state,
        loading: false,
        likes: state.likes.map(
          (obj) => newLikeState.find((o) => o.id === obj.id) || obj
        ),
        userPostsLiked: payload.user_likes,
      }

    case types.REMOVE_LIKE:
      const tempState = state.likes.filter((like) => like.id === payload)
      if (tempState[0].likes > 0) {
        tempState[0].likes -= 1
      }
      const post = tempState[0].post
      const tempUserLike = state.userPostsLiked.filter((id) => id !== post)

      return {
        ...state,
        loading: false,
        // Replace obj in arrays
        likes: state.likes.map(
          (obj) => tempState.find((o) => o.id === obj.id) || obj
        ),
        userPostsLiked: tempUserLike,
      }

    default:
      return state
  }
}
