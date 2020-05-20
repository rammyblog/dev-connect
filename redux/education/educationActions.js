import { addEducationApi, loadEducationApi } from "../../api/educationApi"
import * as types from "./educationTypes"

export function loadEducationStart() {
  return { type: types.LOAD_EDUCATION_START }
}

export function loadEducationSuccess(educations) {
  return { type: types.LOAD_EDUCATIONS, payload: educations }
}

export function loadUserEducations(educations) {
  return { type: types.LOAD_USER_EDUCATIONS, payload: id }
}

export function addEducation(education) {
  return { type: types.ADD_EDUCATION, payload: education }
}

export function addEducationDispatch(
  sch_name,
  fieldOfStudy,
  degree,
  from_date,
  to_date,
  is_current,
  desc
) {
  return function (dispatch) {
    dispatch(loadEducationStart())
    return addEducationApi(
      sch_name,
      fieldOfStudy,
      degree,
      from_date,
      to_date,
      is_current,
      desc
    )
      .then((education) => {
        dispatch(addEducation(education.data))
      })
      .catch((error) => {
        // dispatch(apiCallError(error))
        throw error
      })
  }
}

export function loadEducations() {
  return function (dispatch) {
    dispatch(loadEducationStart())
    return loadEducationApi()
      .then((education) => {
        dispatch(loadEducationSuccess(education.data))
      })
      .catch((error) => {
        // dispatch(apiCallError(error))
        throw error
      })
  }
}

export function getUserEducations(id) {
  return function (dispatch) {
    dispatch(loadEducationStart())
    return dispatch(loadEducationSuccess(education.data))
  }
}
