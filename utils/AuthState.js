import React, { useState, useEffect, useCallback } from "react"
import { useStore, useDispatch } from "react-redux"
import { authCheckState } from "../redux/auth/authActions"

const CheckUserState = (Component) => {
  return function LoadAllProfiles(props) {
    const [loading, setloading] = useState(false)
    const store = useStore()
    const currentState = store.getState()
    const dispatch = useDispatch()

    const checkState = useCallback(() => {
      dispatch(authCheckState())
    }, [dispatch])

    useEffect(() => {
      checkState()
    }, [])

    return (
      <>
        <Component {...props} />
      </>
    )
  }
}

export default CheckUserState
