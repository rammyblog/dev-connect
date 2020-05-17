import * as types from "./apiTypes"

//import * as types from "../actions/actionTypes"

function actionTypeEndInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS"
}

const apiInititalState = {
  apiCallsInProgress: 0,
}

export function apiCallStatusReducer(
  state = apiInititalState.apiCallsInProgress,
  action
) {
  if (
    action.type === types.API_LOAD_ERROR ||
    actionTypeEndInSuccess(action.type)
  ) {
    return state - 1
  }

  return state
}
