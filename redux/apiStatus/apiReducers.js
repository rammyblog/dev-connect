import * as types from "./apiTypes"

const initialState = {
  apiCallsInProgress: 0,
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1
  } else if (action.type === types.API_CALL_SUCCESS) {
    return state - 1
  } else if (action.type === types.API_CALL_ERROR) {
    return (state = -1)
  }

  return state
}
