import React, { useState, useEffect, useCallback } from "react"

import { useStore, useDispatch } from "react-redux"
import ErrorPage from "../pages/_error"

const ErrorState = (Component) => {
  return function DetermineError(props) {
    const [error, setError] = useState(false)
    const errorText =
      "Please check your internet connection and reload this page"

    const store = useStore()
    const currentState = store.getState()

    useEffect(() => {
      console.log(currentState.api)
    }, [currentState.api])

    return (
      <>
        {currentState.api >= 0 ? (
          <Component {...props} />
        ) : (
          <ErrorPage text={errorText} />
        )}
      </>
    )
  }
}

export default ErrorState
