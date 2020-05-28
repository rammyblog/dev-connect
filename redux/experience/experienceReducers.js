import * as types from "./experienceTypes"

// Profile Reducer

const initialEducationState = {
  experiences: [],
  loading: false,
  userExperiences: [],
}

export const experienceReducer = (
  state = initialEducationState,
  { type, payload }
) => {
  switch (type) {
    case types.LOAD_EXPERIENCE_START:
      return { ...state, loading: true }
    case types.LOAD_EXPERIENCES:
      return { ...state, experiences: payload, loading: false }
    case types.ADD_EXPERIENCE:
      return {
        ...state,
        loading: false,
        experiences: [payload, ...state.experiences],
      }

    case types.LOAD_USER_EXPERIENCES:
      return {
        ...state,
        loading: false,
        userExperiences: [payload, ...state.experiences],
      }

    case types.LOAD_USER_PROFILE_EXPERIENCES:
      return {
        ...state,
        userExperiences: state.experiences.filter(
          (experience) => experience.profile_id === Number(payload)
        ),
        loading: false,
      }

    case types.DELETE_USER_EXPERIENCE:
      const newUserExperience = state.userExperiences.filter(
        (experience) => experience.id !== payload
      )

      return {
        ...state,
        userExperiences: newUserExperience,
        loading: false,
      }
    default:
      return state
  }
}
