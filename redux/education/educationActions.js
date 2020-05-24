import {
  addEducationApi,
  loadEducationApi,
  loadUserEducationApi,
} from "../../api/educationApi"
import * as types from "./educationTypes"
import Router from "next/router"
import { apiCallError } from "../apiStatus/apiActions"

export function loadEducationStart() {
  return { type: types.LOAD_EDUCATION_START }
}

export function loadEducationSuccess(educations) {
  return { type: types.LOAD_EDUCATIONS, payload: educations }
}

export function loadUserEducations(educations) {
  return { type: types.LOAD_USER_EDUCATIONS, payload: educations }
}

export function loadUserProfileEducations(id) {
  return { type: types.LOAD_USER_PROFILE_EDUCATIONS, payload: id }
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
        Router.push("/dashboard")
      })
      .catch((error) => {
        dispatch(apiCallError(error))
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
        dispatch(apiCallError(error))
      })
  }
}

export function loadUserEducationsRecords() {
  return function (dispatch) {
    dispatch(loadEducationStart())
    return loadUserEducationApi()
      .then((education) => {
        dispatch(loadUserEducations(education.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function getUserProfileEducations(id) {
  return function (dispatch) {
    dispatch(loadEducationStart())
    return dispatch(loadUserProfileEducations(id))
  }
}
