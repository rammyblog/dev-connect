import React, { useState, useEffect, useCallback } from "react"

import { loadProfiles } from "../redux/profile/profileActions"
import { loadEducations } from "../redux/education/educationActions"
import { loadExperiences } from "../redux/experience/experienceActions"

import { useStore, useDispatch } from "react-redux"
import LoadingPage from "../components/presentational/LoadingPage"

const ProfilesLoaded = (Component) => {
  return function LoadAllProfiles(props) {
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)

    const store = useStore()
    const currentState = store.getState()
    const dispatch = useDispatch()

    const loadProfilesFromDb = useCallback(async () => {
      setloading(true)
      dispatch(loadProfiles())
      dispatch(loadEducations())
      dispatch(loadExperiences())

      setloading(false)
    }, [dispatch])

    useEffect(() => {
      if (
        currentState.profiles.profiles &&
        currentState.profiles.profiles.length <= 0
      ) {
        loadProfilesFromDb()
      }
    }, [])

    return <>{!loading ? <Component {...props} /> : <LoadingPage />}</>
  }
}

export default ProfilesLoaded
