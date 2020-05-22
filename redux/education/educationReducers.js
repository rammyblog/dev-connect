import * as types from "./educationTypes"

// Profile Reducer

const initialEducationState = {
  educations: [],
  userEducations: [],
  loading: false,
}

export const educationReducer = (
  state = initialEducationState,
  { type, payload }
) => {
  switch (type) {
    case types.LOAD_EDUCATION_START:
      return { ...state, loading: true }
    case types.LOAD_EDUCATIONS:
      return { ...state, educations: payload, loading: false }
    case types.ADD_EDUCATION:
      return {
        ...state,
        loading: false,
        educations: payload,
        ...state.educations,
      }

    case types.LOAD_USER_EDUCATIONS:
      return {
        ...state,
        loading: false,
        userEducations: payload,
        ...state.userEducations,
      }

    case types.LOAD_USER_PROFILE_EDUCATIONS:
      return {
        ...state,
        userEducations: state.educations.filter(
          (education) => education.profile_id === Number(payload)
        ),
        loading: false,
      }
    default:
      return state
  }
}
