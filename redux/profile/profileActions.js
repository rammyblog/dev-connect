import { getProfile } from "../../api/profileApi"
import * as types from "./profileTypes"

export function loadProfileStart() {
  return { type: types.LOAD_PROFILE_START }
}

export function loadProfileSuccess(profiles) {
  return { type: types.LOAD_PROFILES, payload: profiles }
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
