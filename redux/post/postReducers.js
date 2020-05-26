import * as types from "./postTypes"

const initialPostState = {
  posts: [],
  loading: false,
  userPosts: [],
}

export const postReducer = (state = initialPostState, { type, payload }) => {
  switch (type) {
    case types.POST_API_START:
      return { ...state, loading: true }
    case types.LOAD_POSTS:
      return { ...state, loading: false, posts: payload }

    case types.ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      }

    case types.DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== payload),
      }

    default:
      return state
  }
}
