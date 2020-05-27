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
      // const finalArray = payload.user.map(function (obj) {
      //   return obj.id
      // })
      // const usersDislikePosts = payload.post.map(function (obj) {
      //   return { post: finalArray }
      // })
      // console.log(usersDislikePosts)

      return { ...state, loading: false, dislikes: payload }

    case types.ADD_DISLIKE:
      return {
        ...state,
        loading: false,
        dislikes: [payload, ...state.dislikes],
      }

    case types.REMOVE_DISLIKE:
      const tempState = state.dislikes.filter(
        (dislike) => dislike.id === payload
      )

      if (tempState[0].dislikes > 0) {
        tempState[0].dislikes -= 1
      }

      return {
        ...state,
        loading: false,
        // Replace obj in arrays
        dislikes: state.dislikes.map(
          (obj) => tempState.find((o) => o.id === obj.id) || obj
        ),
      }

    default:
      return state
  }
}
