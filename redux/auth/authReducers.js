import * as types from "./authTypes"

// Auth Reducer

const authInitialState = {
  token: null,
  error: null,
  loading: false,
  email: null,
  response: null,
}

export const authReducer = (state = authInitialState, { type, payload }) => {
  switch (type) {
    case types.AUTH_START:
      return { ...state, error: null, loading: true }
    case types.AUTH_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        token: payload.token,
        email: payload.email,
      }

    case types.AUTH_FAIL:
      return {
        ...state,
        error: payload.error,
        response: payload.response,
        loading: false,
      }

    default:
      return state
  }
}
