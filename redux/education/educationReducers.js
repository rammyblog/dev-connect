import * as types from "./educationTypes"

// Profile Reducer

const initialEducationState = {
  educations: [],
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
      return { ...state, educations: payload }
    case types.ADD_EDUCATION:
      return {
        ...state,
        educations: [payload, ...state.educations],
      }

    case types.LOAD_USER_EDUCATIONS:
      return state.filter((education) => education.user === id)
    default:
      return state
  }
}
