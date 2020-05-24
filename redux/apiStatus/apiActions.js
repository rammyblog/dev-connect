import * as types from "./apiTypes"

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL }
}

export function apiCallError() {
  return { type: types.API_CALL_ERROR }
}

export function apiCallSuccess() {
  return { type: types.API_CALL_SUCCESS }
}
