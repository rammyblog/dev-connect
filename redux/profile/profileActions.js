import {
  getProfile,
  editProfileAPI,
  getUserProfileAPI,
} from "../../api/profileApi"
import * as types from "./profileTypes"
import Router from "next/router"

export function loadProfileStart() {
  return { type: types.LOAD_PROFILE_START }
}

export function loadProfileSuccess(profiles) {
  return { type: types.LOAD_PROFILES, payload: profiles }
}

export function editProfileSuccess(profile) {
  return { type: types.EDIT_PROFILE, payload: profile }
}

export function loadUserProfileSucccess(profile) {
  return { type: types.GET_USER_PROFILE, payload: profile }
}

export function loadProfiles() {
  return function (dispatch) {
    console.log("calling")

    dispatch(loadProfileStart())
    return getProfile()
      .then((profiles) => {
        console.log(profiles.data)

        dispatch(loadProfileSuccess(profiles.data))
      })
      .catch((error) => {
        // dispatch(apiCallError(error))
        throw error
      })
  }
}

export function loadUserProfile() {
  return function (dispatch) {
    dispatch(loadProfileStart())
    return getUserProfileAPI()
      .then((profile) => {
        dispatch(loadUserProfileSucccess(profile.data))
      })
      .catch((error) => {
        // dispatch(apiCallError(error))
        throw error
      })
  }
}

export function editProfileDispatch(values) {
  return function (dispatch) {
    return editProfileAPI(values)
      .then((profile) => {
        console.log(profile.data)

        dispatch(editProfileSuccess(profile.data))
        Router.push("/dashboard")
      })
      .catch((error) => {
        // dispatch(apiCallError(error))
        throw error
      })
  }
}
