// Send a message on whatsapp if you can see this
// Alright then, Let me complete this mumu code I'm writing

import {
  getProfile,
  editProfileAPI,
  getUserProfileAPI,
} from "../../api/profileApi"
import * as types from "./profileTypes"

export function loadProfileStart() {
  return { type: types.LOAD_PROFILE_START }
}

export function loadProfileSuccess(profiles) {
  return { type: types.LOAD_PROFILES, payload: profiles }
}

export function editProfileSuccess(profile) {
  return { typr: types.EDIT_PROFILE, payload: profile }
}

export function loadUserProfileSucccess(profile) {
  return { type: types.GET_USER_PROFILE, payload: profile }
}

export function loadProfiles() {
  return function (dispatch) {
    // dispatch(loadProfileStart())
    console.log("calliing")

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

export function editProfile(values) {
  return function (dispatch) {
    // dispatch(loadProfileStart())
    console.log("calliing")
    // const value = {
    //   professionalStatus,
    //   companyName,
    //   website,
    //   location,
    //   skills,
    //   githubUsername,
    //   bio,
    //   twitterLink,
    //   facebookLink,
    //   instagramLink,
    //   linkedinLink,
    // }

    return editProfileAPI(values)
      .then((profiles) => {
        dispatch(loadProfileSuccess(profiles.data))
      })
      .catch((error) => {
        // dispatch(apiCallError(error))
        throw error
      })
  }
}
