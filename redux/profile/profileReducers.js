import * as types from "./profileTypes"

// Profile Reducer

const initialProfileState = []

export const profileReducer = (
  state = initialProfileState,
  { type, payload }
) => {
  switch (type) {
    case types.LOAD_PROFILE_START:
      return { ...state, loading: true }
    case types.LOAD_PROFILES:
      return payload
    default:
      return state
  }
}
