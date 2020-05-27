import * as types from "./dislikesTypes"

const initialDislikeState = {
  dislikes: [],
  loading: false,
  userPostsDislikes: [],
}

export const dislikesReducer = (
  state = initialDislikeState,
  { type, payload }
) => {
  switch (type) {
    case types.DISLIKE_API_START:
      return { ...state, loading: true }
    case types.LOAD_DISLIKES:
      return {
        ...state,
        loading: false,
        dislikes: payload.data,
        userPostsDislikes: payload.user_dislikes,
      }

    case types.ADD_DISLIKE:
      const newDislikeState = state.dislikes.filter(
        (dislike) => dislike.id === payload.data.id
      )

      newDislikeState[0].dislikes += 1
      return {
        ...state,
        loading: false,
        dislikes: state.dislikes.map(
          (obj) => newDislikeState.find((o) => o.id === obj.id) || obj
        ),
        userPostsDislikes: payload.user_dislikes,
      }

    case types.REMOVE_DISLIKE:
      const tempState = state.dislikes.filter(
        (dislike) => dislike.id === payload
      )

      if (tempState[0].dislikes > 0) {
        tempState[0].dislikes -= 1
      }
      const post = tempState[0].post
      const tempUserDisike = state.userPostsDislikes.filter((id) => id !== post)

      return {
        ...state,
        loading: false,
        // Replace obj in arrays
        dislikes: state.dislikes.map(
          (obj) => tempState.find((o) => o.id === obj.id) || obj
        ),
        userPostsDislikes: tempUserDisike,
      }

    default:
      return state
  }
}
