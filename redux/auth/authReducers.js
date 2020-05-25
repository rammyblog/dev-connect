import * as types from "./authTypes"

// Auth Reducer

const authInitialState = {
  token: null,
  error: null,
  loading: false,
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
        token: payload,
      }

    case types.AUTH_LOGOUT:
      return {
        error: false,
        response: null,
        loading: false,
        token: null,
      }

    case types.AUTH_RESET:
      return {
        ...state,
        error: false,
        response: null,
        loading: false,
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
