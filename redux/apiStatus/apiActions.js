import * as types from "./apiTypes"

export function apiCallError(error) {
  return { type: types.API_LOAD_ERROR, error }
}
