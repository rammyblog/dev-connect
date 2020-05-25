import {
  addExperienceApi,
  loadExperienceApi,
  loadUserExperienceApi,
  deleteUserExperienceApi,
} from "../../api/experienceApi"
import * as types from "./experienceTypes"
import Router from "next/router"
import { loadUserProfileEducations } from "../education/educationActions"
import { apiCallError } from "../apiStatus/apiActions"

export function loadExperienceStart() {
  return { type: types.LOAD_EXPERIENCE_START }
}

export function loadExperienceSuccess(experiences) {
  return { type: types.LOAD_EXPERIENCES, payload: experiences }
}

export function loadUserExperiences(experiences) {
  return { type: types.LOAD_USER_EXPERIENCES, payload: experiences }
}

export function loadUserProfileExperiences(id) {
  return { type: types.LOAD_USER_PROFILE_EXPERIENCES, payload: id }
}

export function addExperience(experience) {
  return { type: types.ADD_EXPERIENCE, payload: experience }
}

export function deleteExperienceSuccess(id) {
  return { type: types.DELETE_USER_EXPERIENCE, payload: id }
}

export function addExperienceDispatch(
  company_name,
  job_title,
  location,
  from_date,
  to_date,
  is_current,
  desc
) {
  return function (dispatch) {
    dispatch(loadExperienceStart())
    return addExperienceApi(
      company_name,
      job_title,
      location,
      from_date,
      to_date,
      is_current,
      desc
    )
      .then((experience) => {
        dispatch(addExperience(experience.data))
        Router.push("/dashboard")
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function loadExperiences() {
  return function (dispatch) {
    dispatch(loadExperienceStart())
    return loadExperienceApi()
      .then((experience) => {
        dispatch(loadExperienceSuccess(experience.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function loadUserExperiencesRecords() {
  return function (dispatch) {
    dispatch(loadExperienceStart())
    return loadUserExperienceApi()
      .then((education) => {
        dispatch(loadUserExperiences(education.data))
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}

export function getUserProfileExperiences(id) {
  return function (dispatch) {
    dispatch(loadExperienceStart())
    return dispatch(loadUserProfileExperiences(id))
  }
}

export function deleteUserExperience(id) {
  return function (dispatch) {
    dispatch(deleteExperienceSuccess(id))
    return deleteUserExperienceApi(id)
      .then((res) => {
        return res
      })
      .catch((error) => {
        dispatch(apiCallError(error))
      })
  }
}
