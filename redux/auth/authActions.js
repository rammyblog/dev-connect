import { loginUser, registerUser } from "../../api/authApi"
import * as types from "./authTypes"
import { apiCallError } from "../apiStatus/apiActions"
import Router from "next/router"

export const authStart = () => {
  return { type: types.AUTH_START }
}

export const authSuccess = (token, email) => {
  return { type: types.AUTH_SUCCESS, payload: { token, email } }
}

export const authFail = (error, response) => {
  return {
    type: types.AUTH_FAIL,
    payload: { error, response },
  }
}

export const authLogin = (email, password) => {
  return function (dispatch) {
    dispatch(authStart())
    return loginUser(email, password)
      .then((res) => {
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
        localStorage.setItem("token", token)
        localStorage.setItem("expirationDate", expirationDate)
        localStorage.setItem("email", email)
        dispatch(authSuccess(token, email))
        Router.push("/profiles")
      })
      .catch((error) => {
        const error_msg = error.error_msg || error.message

        dispatch(apiCallError(error))
        dispatch(authFail(true, error_msg))
        // throw error
      })
  }
}

export const authRegister = (
  first_name,
  last_name,
  email,
  password1,
  password2
) => {
  return function (dispatch) {
    dispatch(authStart())
    console.log({ first_name, last_name, email, password1, password2 })

    return registerUser(first_name, last_name, email, password1, password2)
      .then((res) => {
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
        localStorage.setItem("token", token)
        localStorage.setItem("expirationDate", expirationDate)
        localStorage.setItem("email", email)
        dispatch(authSuccess(token, email))
        Router.push("/edit-profile")
      })
      .catch((error) => {
        console.log(error)
        dispatch(apiCallError(error))
        dispatch(authFail(true, error.error_msg))
        // throw error
      })
  }
}
