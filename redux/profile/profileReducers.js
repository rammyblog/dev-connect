import * as types from "./profileTypes"

// Profile Reducer

const initialProfileState = {
  profiles: [],
  loading: false,
  userProfile: [],
}

export const profileReducer = (
  state = initialProfileState,
  { type, payload }
) => {
  switch (type) {
    case types.LOAD_PROFILE_START:
      return { ...state, loading: true }
    case types.LOAD_PROFILES:
      return { ...state, loading: false, profiles: payload }
    case types.GET_USER_PROFILE:
      return {
        ...state,
        loading: false,
        userProfile: payload,
        ...state.userProfile,
      }

    case types.EDIT_PROFILE:
      const tempState = state.slice()
      const profileState = tempState.map(
        (state) => state.find((profile) => profile.id == payload.id) || profile
      )
      return { ...state, loading: false, profiles: profileState }
    default:
      return state
  }
}
