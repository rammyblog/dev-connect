import React, { useState, useEffect, useCallback } from "react"

import { loadProfiles } from "../redux/profile/profileActions"
import {
  loadEducations,
  getUserProfileEducations,
} from "../redux/education/educationActions"
import {
  loadExperiences,
  getUserProfileExperiences,
} from "../redux/experience/experienceActions"

import { useStore, useDispatch } from "react-redux"
import LoadingPage from "../components/presentational/LoadingPage"

const ProfilesLoaded = (Component) => {
  return function LoadAllProfiles(props) {
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)
    const { id } = props

    const store = useStore()
    const currentState = store.getState()
    console.log(currentState)

    const dispatch = useDispatch()

    const loadProfilesFromDb = useCallback(async () => {
      setloading(true)
      await dispatch(loadProfiles())
      await dispatch(loadEducations())
      await dispatch(loadExperiences())
      setloading(false)
    }, [dispatch])

    const loadExperienceEducations = useCallback(() => {
      setloading(true)
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

    // useEffect(() => {
    //   if (currentState.experience.userExperiences.length <= 0) {
    //     loadExperienceEducations()
    //     dispatch(getUserProfileExperiences(id))
    //     dispatch(getUserProfileEducations(id))
    //   }
    // }, [currentState.experience.experiences])

    return <>{!loading ? <Component {...props} /> : <LoadingPage />}</>
  }
}

export default ProfilesLoaded
