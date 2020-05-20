import React, { useState, useEffect, useCallback } from "react"

import { loadProfiles } from "../redux/profile/profileActions"

import { useStore, useDispatch } from "react-redux"

const ProfilesLoaded = (Component) => {
  return function LoadAllProfiles(props) {
    const [loading, setloading] = useState(false)
    const store = useStore()
    const currentState = store.getState()
    const dispatch = useDispatch()

    const loadProfilesFromDb = useCallback(async () => {
      setloading(false)
      await dispatch(loadProfiles())
      setloading(true)
    }, [dispatch])

    useEffect(() => {
      if (currentState.profiles.length <= 0) {
        loadProfilesFromDb()
      }
    }, [])

    return (
      <>
        {currentState.profiles.length > 0 ? (
          <Component {...props} />
        ) : (
          <p>Loadin</p>
        )}
      </>
    )
  }
}

export default ProfilesLoaded
