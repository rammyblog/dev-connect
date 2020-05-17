import { getProfile } from "../../api/profileApi"

export function loadProfileSuccess(profiles) {
  return { type: types.LOAD_PROFILE, profiles }
}

export function loadProfiles() {
  return function (dispatch) {
    return getProfile()
      .then((profiles) => {
        dispatch(loadProfileSuccess(profiles))
      })
      .catch((error) => {
        console.log("helloe")

        dispatch(apiCallError(error))
        throw error
      })
  }
}
